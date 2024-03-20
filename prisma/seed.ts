import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
	const testUser = await prisma.user.upsert({
		where: { email: 'testuser@email.com' },
		update: {},
		create: {
			email: 'testuser@email.com',
			name: 'Test User',
		},
	})
}
main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
