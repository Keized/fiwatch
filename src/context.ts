import { PrismaClient } from '@prisma/client'
import { decodeAuthorizationHeader } from "./utils/auth";

export interface Context {
    prisma: PrismaClient;
    userId?: number;
}

const prisma = new PrismaClient()


// @ts-ignore
export const context = ({req}): Context => {
    const token = req && req.headers.authorization ? decodeAuthorizationHeader(req.headers.authorization) : null;
    return {
        prisma,
        userId: token?.userId,
    };
}
