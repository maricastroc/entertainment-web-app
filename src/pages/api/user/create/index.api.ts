/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IncomingForm } from 'formidable'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import bcrypt from 'bcrypt'

let fs: any, path: any

try {
  if (typeof process !== 'undefined' && process.versions?.node) {
    fs = require('fs')
    path = require('path')
  }
} catch (e) {
  console.warn('File system operations not available in this environment:', e)
}

export const config = {
  api: {
    bodyParser: false,
    runtime: 'nodejs',
  },
}

const getSingleString = (value: string | string[] | undefined): string => {
  if (Array.isArray(value)) {
    return value[0]
  }
  if (typeof value === 'string') {
    return value
  }
  throw new Error('Field is required')
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const form = new IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error processing form' })
    }

    try {
      const name = getSingleString(fields.name)
      const email = getSingleString(fields.email)
      const password = getSingleString(fields.password)
      const avatarFile = files.avatarUrl?.[0]

      const createUserSchema = z.object({
        email: z
          .string()
          .email('Invalid email')
          .nonempty('Email is required')
          .refine(
            async (email) => {
              const existingUser = await prisma.user.findUnique({
                where: { email },
              })
              return !existingUser
            },
            { message: 'This email address is already in use.' },
          ),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
          .regex(/[0-9]/, 'Password must contain at least one number'),
      })

      await createUserSchema.parseAsync({ email, password })

      const hashedPassword = await bcrypt.hash(password, 10)

      let avatarUrl: string | null = null

      if (avatarFile) {
        // Em ambientes serverless, não podemos salvar arquivos localmente
        // Então vamos converter a imagem para base64 e armazenar no banco de dados
        const fileContent = await fs.promises.readFile(avatarFile.filepath)
        const base64Image = fileContent.toString('base64')
        const dataURI = `data:${avatarFile.mimetype};base64,${base64Image}`

        avatarUrl = dataURI

        // Limpa o arquivo temporário
        await fs.promises.unlink(avatarFile.filepath)
      }

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatarUrl,
        },
      })

      return res.status(201).json(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors[0].message })
      } else if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
      }
      return res.status(500).json({ message: 'Internal server error' })
    }
  })
}
