import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import fs from 'fs'

interface CreateUserParams {
  name: string
  email: string
  password: string
  avatarFilepath?: string
  avatarMimetype?: string
}

const MAX_AVATAR_SIZE = 2 * 1024 * 1024

export async function createUser({
  name,
  email,
  password,
  avatarFilepath,
  avatarMimetype,
}: CreateUserParams) {
  const existingUser = await prisma.user.findUnique({ where: { email } })

  if (existingUser) {
    const error = new Error('This email address is already in use.')
    ;(error as any).statusCode = 409
    throw error
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  let avatarUrl: string | null = null

  if (avatarFilepath && avatarMimetype) {
    const fileContent = await fs.promises.readFile(avatarFilepath)

    if (fileContent.length > MAX_AVATAR_SIZE) {
      const error = new Error('Image must be a maximum of 2MB!')
      ;(error as any).statusCode = 400
      throw error
    }

    const base64Image = fileContent.toString('base64')
    avatarUrl = `data:${avatarMimetype};base64,${base64Image}`

    await fs.promises.unlink(avatarFilepath)
  }

  return prisma.user.create({
    data: { name, email, password: hashedPassword, avatarUrl },
  })
}
