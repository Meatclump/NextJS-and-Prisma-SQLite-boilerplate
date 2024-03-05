# NextJS-and-Prisma-SQLite-boilerplate
Boilerplate NextJS app using Prisma, SQLite and some minor tailwind cleanup

## General process

1. Install Next JS in current dir with `npx create-next-app@latest .`
2. Install Prisma as a dev dependency `npm i -D prisma`
2. Install prisma client with `npm i @prisma/client`
3. Initialize prisma with sqlite to generate .env and schema file with `npx prisma init --datasource-provider sqlite`
4. Add desired db models to schema.prisma
5. Migrate models to database via `npx prisma migrate dev --name init`
6. Refresh type definitions on build by adding Prisma Generate to build script in package.json `prisma generate && next build`
7. Install ts-node as dev dependency `npm i -D ts-node`
8. Add escaped prisma seed command to package.json:
```JSON
      "prisma": {
	    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
      },
```
9. Create seed file to prisma directory and add to package.json - [Official Docs](https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding#seeding-your-database-with-typescript-or-javascript)
10. Seed db with `npx prisma db seed`
11. Create prisma singleton setup by creating lib/prisma.ts - [Official Docs](https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prevent-hot-reloading-from-creating-new-instances-of-prismaclient)
12. Visualize db with `npx prisma studio`