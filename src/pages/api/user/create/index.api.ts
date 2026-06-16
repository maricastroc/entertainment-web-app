import { IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { createUser } from '@/services/user.service'
import { handleServiceError } from '@/lib/api-error'

export const config = {
  api: {
    bodyParser: false,
    runtime: 'nodejs',
  },
}

const createUserSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .nonempty('Email is required'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

function getSingleString(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0]
  if (typeof value === 'string') return value
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

      const validation = createUserSchema.safeParse({ email, password })
      if (!validation.success) {
        return res.status(400).json({ message: validation.error.errors[0].message })
      }

      const user = await createUser({
        name,
        email,
        password,
        avatarFilepath: avatarFile?.filepath,
        avatarMimetype: avatarFile?.mimetype ?? undefined,
      })

      return res.status(201).json(user)
    } catch (error) {
      return handleServiceError(error, res)
    }
  })
}
