import {
    arg,
    asNexusMethod,
    extendType,
    inputObjectType,
    intArg,
    mutationType,
    nonNull,
    objectType,
    stringArg
} from "nexus";
import {Context} from "../context";
import {DateTimeResolver} from "graphql-scalars";

export const Query = objectType({
    name: 'Query',
    definition(t) {
        t.nonNull.list.nonNull.field('allUsers', {
            type: 'User',
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.user.findMany()
            },
        })

        t.nonNull.list.nonNull.field('allTransactions', {
            type: 'Transaction',
            resolve: (_parent, _args, context: Context) => {
                return context.prisma.transaction.findMany()
            },
        })

        t.nonNull.list.nonNull.field('allUserTransactions', {
            type: 'Transaction',
            args: {
                userId: nonNull(intArg()),
            },
            resolve: (_parent, args , context: Context) => {
                return context.prisma.transaction.findMany({
                    where: { author: { id: args.userId } }
                });
            },
        })
    },
})


export const User = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.int('id')
        t.nullable.string('name')
        t.nonNull.string('email')
        t.nullable.list.nullable.field('transactions', {
            type: 'Transaction',
            resolve: (parent, _, context: Context) => {
                return context.prisma.user
                    .findUnique({
                        where: { id: parent.id },
                    })
                    .transactions()
            },
        })
    },
})

export const Transaction = objectType({
    name: 'Transaction',
    definition(t) {
        t.nonNull.int('id')
        t.nonNull.field('createdAt', { type: 'DateTime' })
        t.nonNull.field('updatedAt', { type: 'DateTime' })
        t.nonNull.string('title')
        t.nonNull.string('label')
        t.nonNull.float('amount')
        t.field('author', {
            type: 'User',
            resolve: (parent, _, context: Context) => {
                return context.prisma.transaction
                    .findUnique({
                        where: { id: parent.id },
                    })
                    .author()
            },
        })
    },
})

export const CreateTransactionInput = inputObjectType({
    name: 'CreateTransactionInput',
    definition(t) {
        t.nonNull.string('title')
        t.nonNull.string('label')
        t.nonNull.float('amount')
    },
})

export const CreateUserInput = inputObjectType({
    name: 'CreateUserInput',
    definition(t) {
        t.nonNull.string('email')
        t.string('name')
    },
})

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

export const AuthPayload = objectType({
    name: "AuthPayload",
    definition: (t) => {
        t.nonNull.string("token");

    }
});

export const AuthMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("signUp", { // 1
            type: "AuthPayload",
            args: {
                email: nonNull(stringArg()),
                password: nonNull(stringArg()),
                name: nonNull(stringArg()),
            },
            resolve: async (_, args, context: Context) => {
                const { email, name } = args;

                return {
                    token: "token"
                };
            },
        });
    },
});


export const Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field('createUser', {
            type: 'User',
            args: {
                data: nonNull(
                    arg({
                        type: 'CreateUserInput',
                    }),
                ),
            },
            resolve: (_, args, context: Context) => {
                return context.prisma.user.create({
                    data: {
                        email: args.data.email,
                        name: args.data.name
                    }
                })
            },
        })

        t.nonNull.field('createTransaction', {
            type: 'Transaction',
            args: {
                data: nonNull(
                    arg({
                        type: 'CreateTransactionInput',
                    }),
                ),
                userId: nonNull(intArg()),
            },
            resolve: (_, args, context: Context) => {
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
        })
    },
})

