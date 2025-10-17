import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from './prisma'
import { authConfig, emailConfig } from './config'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: emailConfig.host,
        port: emailConfig.port,
        auth: {
          user: emailConfig.user,
          pass: emailConfig.password,
        },
      },
      from: emailConfig.from,
    }),
  ],
  pages: {
    signIn: '/onboard/register',
    verifyRequest: '/onboard/verify-request',
  },
  session: {
    strategy: 'jwt' as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
  secret: authConfig.secret,
}

export default NextAuth(authOptions)
