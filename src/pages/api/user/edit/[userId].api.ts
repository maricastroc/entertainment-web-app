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

const getSingleString = (
  value: string | string[] | undefined,
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0]
  }
  return value
}

const updateUserSchema = z
  .object({
    userId: z.string().nonempty('User ID is required'),
    name: z.string().min(3, 'Name must be at least 3 characters').optional(),
    email: z.string().email('Invalid email').optional(),
    oldPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .optional(),
  })
  .superRefine(async (data, ctx) => {
    if (data.newPassword && !data.oldPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Current password is required to change password',
        path: ['oldPassword'],
      })
    }

    if (data.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: {
            id: data.userId,
          },
        },
      })
      if (existingUser) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'This email is already in use by another account',
          path: ['email'],
        })
      }
    }
  })

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const form = new IncomingForm()

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error processing form' })
    }

    try {
      const userId = getSingleString(fields.userId)
      const name = getSingleString(fields.name)
      const email = getSingleString(fields.email)
      const oldPassword = getSingleString(fields.oldPassword)
      const newPassword = getSingleString(fields.newPassword)
      const avatarFile = files.avatarUrl?.[0]

      const inputData = {
        userId,
        name,
        email,
        oldPassword,
        newPassword,
      }

      const validatedData = await updateUserSchema.parseAsync(inputData)

      const user = await prisma.user.findUnique({
        where: { id: validatedData.userId },
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      if (validatedData.newPassword) {
        if (!validatedData.oldPassword) {
          return res
            .status(400)
            .json({ message: 'Current password is required' })
        }

        const isPasswordValid = await bcrypt.compare(
          validatedData.oldPassword,
          user.password as string,
        )

        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: 'Current password is incorrect' })
        }
      }

      let avatarUrl = user.avatarUrl

      if (avatarFile) {
        const MAX_SIZE = 2 * 1024 * 1024
        const fileContent = await fs.promises.readFile(avatarFile.filepath)

        if (fileContent.length > MAX_SIZE) {
          throw new Error('Image must be a maximum of 2MB!')
        }

        const base64Image = fileContent.toString('base64')
        const dataURI = `data:${avatarFile.mimetype};base64,${base64Image}`

        avatarUrl = dataURI

        await fs.promises.unlink(avatarFile.filepath)
      }

      const updatedUser = await prisma.user.update({
        where: { id: validatedData.userId },
        data: {
          name: validatedData.name ?? user.name,
          email: validatedData.email ?? user.email,
          password: validatedData.newPassword
            ? await bcrypt.hash(validatedData.newPassword, 10)
            : user.password,
          avatarUrl,
        },
      })

      const { password: _, ...userWithoutPassword } = updatedUser

      return res.status(200).json(userWithoutPassword)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation error',
          errors: error.errors,
        })
      }
      console.error('Error updating user:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  })
}
