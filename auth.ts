import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "@/auth.config"

import { getUserById } from "@/data/user"
import { prisma } from "@/lib/prisma"

type ExtendedUser = DefaultSession["user"] & {
	id: string
	role: "ADMIN" | "USER"
}

declare module "next-auth" {
	interface Session {
		user: ExtendedUser
	}
}

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut
} = NextAuth({
	callbacks: {
		async signIn({ user }) {
			if (user.id) {
				const existingUser = await getUserById(user.id)
	
				if (!existingUser || !existingUser.emailVerified) {
					//return false
				}

				return true
			}

			return false
		},
		async session({ token, session }) {
			console.log({
				sessionToken: token,
				session,
			})

			if (token.sub && session.user) {
				session.user.id = token.sub
			}
			
			if (token.role && session.user) {
				session.user.role = token.role as UserRole
			}
			return session
		},
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			token.role = existingUser.role

			return token
		}
	},
	adapter: PrismaAdapter(prisma),
	session: { strategy: "jwt" },
	...authConfig,
})