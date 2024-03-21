import NextAuth, { DefaultSession } from "next-auth"
import { UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "@/lib/prisma"
import authConfig from "@/auth.config"
import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"

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
	pages: {
		signIn: "/auth/login",
		error: "/auth/error",
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() }
			})
		}
	},
	callbacks: {
		async signIn({ user, account }) {
			console.log({user, account})
			// Allow OAuth without email verification
			if (account?.provider !== "credentials") return true
			
			if (user.id) {
				const existingUser = await getUserById(user.id)
	
				// Prevent sign in without email verification
				if (!existingUser?.emailVerified) return false

				if (existingUser.isTwoFactorEnabled) {
					const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

					console.log({twoFactorConfirmation})

					if (!twoFactorConfirmation) return false

					// Delete 2fa confirmation for next sign in
					await prisma.twoFactorConfirmation.delete({
						where: {id: twoFactorConfirmation.id}
					})
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