import {Context} from "../context";
import {CreateTransactionInput} from "../types";

export const typeDef = `
    type Transaction {
        amount: Float!
        author: User
        createdAt: DateTime!
        id: Int!
        label: String!
        title: String!
        updatedAt: DateTime!
    }
    
    input CreateTransactionInput {
        amount: Float!
        label: String!
        title: String!
    }
    
    extend type Query {
        allUserTransactions(userId: Int!): [Transaction!]!  
        allTransactions: [Transaction!]!
    }
    
    extend type Mutation {
        createTransaction(data: CreateTransactionInput!, userId: Int!): Transaction!
    }
`

export const resolvers = {
    Query: {
        allUserTransactions: (_parent: undefined, args: { id: number }, context: Context) => {
            return context.prisma.transaction.findMany({
                where: {author: {id: args.id}}
            });
        },
        allTransactions: (_parent: undefined, args: undefined, context: Context) => {
            return context.prisma.transaction.findMany();
        }
    },
    Mutation: {
        createTransaction: (
            _parent: undefined,
            args: { data: CreateTransactionInput, userId: number },
            context: Context
        ) => {
            return context.prisma.transaction.create({
                data: {
                    title: args.data.title,
                    amount: args.data.amount,
                    label: args.data.label,
                    author: {
                        connect: {id: args.userId},
                    }
                }
            })
        },
    },
    Transaction: {
        author: (parent: { id: number }, _args: undefined, context: Context) => {
            return context.prisma.transaction
                .findUnique({
                    where: {id: parent?.id},
                })
                .author()
        },
    }
}
