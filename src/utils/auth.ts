import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

export const APP_SECRET = process.env.APP_SECRET as string;

export interface AuthTokenPayload {  // 1
    userId: number;
}

export function decodeAuthorizationHeader(authorizationHeader: String): AuthTokenPayload {
    const token = authorizationHeader.replace("Bearer ", "");

    if (!token) {
        throw new Error("No token found");
    }

    return jwt.verify(token, APP_SECRET) as unknown as AuthTokenPayload;
}