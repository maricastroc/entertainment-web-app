import { IncomingForm } from 'formidable'
import { prisma } from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
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

      if (!avatarFile) {
        return res.status(400).json({ message: 'Avatar file is required.' })
      }

      const createUserSchema = z.object({
        name: z.string().min(1, 'Name is required'),
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

      await createUserSchema.parseAsync({ name, email, password })

      const hashedPassword = await bcrypt.hash(password, 10)

      const avatarPath = path.join(
        process.cwd(),
        'public',
        'users',
        'images',
        avatarFile.originalFilename ?? '',
      )
      fs.renameSync(avatarFile.filepath, avatarPath)

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          avatarUrl: `/users/images/${avatarFile.originalFilename}`,
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
