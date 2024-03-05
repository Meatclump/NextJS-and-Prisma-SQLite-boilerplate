import { PrismaClient } from "@prisma/client";

// https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript

const prisma = new PrismaClient()

async function main() {
	const user = await prisma.user.upsert({
		where: { email: 'test@test.com' },
		update: {},
		create: {
			email: 'test@test.com',
			password: `123456`
		},
	})
	console.log("USER:",{ user })
}

main()
	.then(() => prisma.$disconnect())
	.catch(async (e) => {
		console.error("ERROR:",e)
		await prisma.$disconnect()
		process.exit(1)
	})
