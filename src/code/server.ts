import { ApolloServer } from 'apollo-server'
import { schema } from './graphql/schema'
import { context } from './graphql/context'

const server = new ApolloServer({
    schema: schema,
    context: context,
})

server.listen().then(async ({ url }) => {
    console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `)
})
