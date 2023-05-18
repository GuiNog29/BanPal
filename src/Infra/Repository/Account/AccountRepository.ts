import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AccountRepository {

  async createAccount(balance: number, userId: number) {
    const bankAccount = await prisma.account.create({
      data: {
        balance: balance,
        userId: userId
      }
    });

    return bankAccount;
  }
}
