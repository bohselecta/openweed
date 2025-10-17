import { PrismaClient } from '@prisma/client'
import { databaseConfig, isDevelopment } from './config'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: databaseConfig.url,
    },
  },
})

if (isDevelopment) globalForPrisma.prisma = prisma
