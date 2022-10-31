import {gql} from "apollo-server";

export const typeDefs = gql`
    input CreateTransactionInput {
        amount: Float!
        label: String!
        title: String!
    }

    input CreateUserInput {
        email: String!
        name: String
    }

    scalar DateTime

    type Mutation {
        createTransaction(data: CreateTransactionInput!, userId: Int!): Transaction!
        createUser(data: CreateUserInput!): User!
        signup(email: String!, password: String!): AuthPayload!
    }

    type Query {
        allTransactions: [Transaction!]!
        allUserTransactions(userId: Int!): [Transaction!]!
        allUsers: [User!]!
    }

    type Transaction {
        amount: Float!
        author: User
        createdAt: DateTime!
        id: Int!
        label: String!
        title: String!
        updatedAt: DateTime!
    }

    type User {
        email: String!
        id: Int!
        name: String
        transactions: [Transaction]
    }
    
    type AuthPayload {
        token: String!,
        user: User!
    }
`
