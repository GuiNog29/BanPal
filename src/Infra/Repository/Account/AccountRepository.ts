import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const depositOperation = 1

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

  async getBalance(userId: number){
    const balance = await prisma.account.findFirst({
      where: {
        userId: userId
      }
    });

    return balance?.balance;
  }

  async deposit(userId: number, valueDeposit: number){
    const newBalance = await this.OperationBank(userId, valueDeposit, depositOperation)

    return newBalance;
  }

  async getAccount(userId: number){
    let currentAccount = await prisma.account.findFirst({
      where: {
        userId: userId
      }
    });

    return currentAccount;
  }

  async OperationBank(userId: number, valueDeposit: number, depositOperation: number) {

    const currentAccount = await this.getAccount(userId);

    switch (depositOperation) {
      case 1:
        currentAccount!.balance += valueDeposit;
        break;

      default:
        break;
    }

    const updatedBalance = this.updateBalance(currentAccount!.id, currentAccount!.balance);

    return updatedBalance;
  }


  async updateBalance(accountId: number, newBalance: number) {
    return await prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: newBalance,
      }
    });
  }
}



