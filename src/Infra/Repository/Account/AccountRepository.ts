import { Repository } from "typeorm";
import { Account } from "../../../Domain/Entities/Account";
import { dataSource } from '../../../Shared/Typeorm';
import { IAccountRepository } from "./Interface/IAccountRepository";
import { UserRepository } from "../User/UserRepository";

const depositOperation = 1

export class AccountRepository implements IAccountRepository {
  private accountRepository: Repository<Account>;
  private userRepository: UserRepository;

  constructor() {
    this.accountRepository = dataSource.getRepository(Account);
  }

  async createAccount(balance: number, userId: number): Promise<Account> {
    const user = await this.userRepository.userExists(userId);
    if (user) {
      const bankAccount = this.accountRepository.create({
        balance: balance,
        user: user
      });

      await this.accountRepository.save(bankAccount);

      return bankAccount;
    } else
      throw new Error('User not exists');
  }

  async getBalance(userId: number) {
    const balance = await prisma.account.findFirst({
      where: {
        userId: userId
      }
    });

    return balance?.balance;
  }

  async deposit(userId: number, valueDeposit: number) {
    const newBalance = await this.OperationBank(userId, valueDeposit, depositOperation)

    return newBalance;
  }

  async getAccount(userId: number) {
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
