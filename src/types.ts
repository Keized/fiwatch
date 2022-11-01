export type CreateTransactionInput = {
    title: string,
    amount: number,
    label: string,
}

export type CreateUserInput = {
    email: string,
    name?: string,
    password : string
}

export type User = {
    id: number,
    email: string,
    name: string | null
}

export type AuthPayload = {
    user: User,
    token: string
}
