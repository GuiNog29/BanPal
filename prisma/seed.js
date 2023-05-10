"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.user.upsert({
        create: {
            id: 1,
            name: 'Ronaldo Garcia',
            email: 'ronaldo@gmail.com',
            password: '123456'
        },
        update: {},
        where: {
            id: 1
        }
    });
    await prisma.account.upsert({
        create: {
            balance: 100,
            userId: 1
        },
        update: {},
        where: {
            id: 1
        }
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
