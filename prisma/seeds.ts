import { PrismaClient } from '@prisma/client'
import { transactions } from '../data/transactions'
const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            id: 1,
            email: `kevin.fiseneck@live.fr`,
            name: 'Kevin',
        },
    })

    await prisma.transaction.createMany({
        data: transactions,
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
