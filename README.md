# Definitions

- Prisma: ORM
- Apollo Server: Graphql Server

# Define the database

- In prisma/schema.prisma file, define the data model
- Use the prisma migration command to create the migration script
`npx prisma migrate dev --name init`
- Use `npx prisma generate` to update the prisma client with the new data model
- Run the server `npx ts-node src/server.ts`



resources: https://github.com/prisma/awesome-links
https://www.howtographql.com/typescript-apollo/6-authentication/
