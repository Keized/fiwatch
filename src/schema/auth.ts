import {Context} from "../context";
import {AuthPayload, User} from "../types";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {APP_SECRET} from "../utils/auth";

export const typeDef = `
    input CreateUserInput {
        email: String!
        name: String
        password: String!
    }

    extend type Mutation {
        signup(email: String!, password: String!): AuthPayload!
    }

    type AuthPayload {
        token: String!,
        user: User!
    }
`;

export const resolvers = {
    Mutation: {
        signup: async (
            _parent: undefined,
            args: { password: string, email: string, name?: string },
            context: Context
        ): Promise<AuthPayload> => {
            const {email, password, name} = args;
            const existingUser = await context.prisma.user.findUnique({
                where: {email: args.email},
            });

            if (existingUser) {
                throw new Error("User already exists");
            }

            const hash = await bcrypt.hash(password, 10);
            const user: User = await context.prisma.user.create({
                data: {email, name, password: hash},
            });
            const token = jwt.sign({userId: user.id}, APP_SECRET);

            return {token, user};
        }
    }
}

