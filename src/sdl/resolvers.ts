import { Context } from './context'

export const resolvers = {
    Query: {
        allUserTransactions: (_parent: undefined, args: {id: number}, context: Context) => {
            return context.prisma.transaction.findMany({
                where: { author: { id: args.id } }
            });
        },
        allTransactions: (_parent: undefined, args: undefined, context: Context) => {
            return context.prisma.transaction.findMany();
        },
        allUsers: (_parent: undefined, args: undefined, context: Context) => {
            return context.prisma.user.findMany();
        },
    },
    Mutation: {
        createUser: (
            _parent: undefined,
            args: { data: CreateUserInput },
            context: Context
        ) => {
            return context.prisma.user.create({
                data: {
                    email: args.data.email,
                    name: args.data.name
                }
            })
        },
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
                        connect: { id: args.userId },
                    }
                }
            })
        },
        signup: (
            _parent: undefined,
            _args: { name: string, email: string },
            _context: Context
        ): AuthPayload => {
            return {
                token: "oko",
                user: {
                    id: 1,
                    email: "okok",
                    name: "okok"
                }
            }
        }
    },
    Transaction: {
        author: (parent: {id: number}, _args:undefined, context: Context) => {
            return context.prisma.transaction
                .findUnique({
                    where: { id: parent?.id },
                })
                .author()
        },
    },
    User: {
        transactions: (parent: {id: number}, _args: undefined, context: Context) => {
            return context.prisma.user
                .findUnique({
                    where: { id: parent?.id },
                })
                .transactions()
        },
    },
}

type CreateTransactionInput = {
    title: string,
    amount: number,
    label: string,
}

type CreateUserInput = {
    email: string,
    name: string,
}

type User = {
    id: number,
    email: string,
    name?: string
}

type AuthPayload = {
    user: User,
    token: string
}
