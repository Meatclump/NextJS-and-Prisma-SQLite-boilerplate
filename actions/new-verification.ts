"use server"

import { Prisma } from "@prisma/client"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { prisma } from "@/lib/prisma"

export const newVerification = async (token: string) => {
	console.log("token:",token)
	const existingtoken = await getVerificationTokenByToken(token)

	if (!existingtoken) {
		return { error: "Token does not exist!" }
	}

	const hasExpired = new Date(existingtoken.expires) < new Date()

	if (hasExpired) return { error: "Token is expired!" }

	const existingUser = await getUserByEmail(existingtoken.email)

	if (!existingUser) {
		return {
			error: "Email does not exist!"
		}
	}

	await prisma.user.update({
		where: { id: existingUser.id },
		data: {
			emailVerified: new Date(),
			email: existingtoken.email
		}
	})

	await prisma.verificationToken.delete({
		where: {id: existingtoken.id}
	})

	return { success: "Email verified!" }
}