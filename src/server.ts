import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { resolvers, typeDefs } from './schema'

new ApolloServer({ resolvers, typeDefs, context }).listen(
    { port: 4000 },
    () => console.log(`
        🚀 Server ready at: http://localhost:4000
        ⭐️ See sample queries: http://pris.ly/e/ts/graphql-sdl-first#using-the-graphql-api`
    )
)
