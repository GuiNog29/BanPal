import { Repository, UpdateResult } from "typeorm";
import { IAccountRepository } from "./interface/IAccountRepository";
import { Account } from "../entities/Account";
import { UserRepository } from "../../../../users/infra/typeorm/repositories/UserRepository";
import { dataSource } from "../../../../../Shared/Typeorm";
import { AppError } from "../../../../../Shared/Errors/AppError";

const DEPOSIT_OPERATION = 1

export class AccountRepository implements IAccountRepository {
  private accountRepository: Repository<Account>;

  constructor(private userRepository: UserRepository) {
    this.accountRepository = dataSource.getRepository(Account);
  }

  async createAccount(balance: number, userId: number): Promise<Account> {
    const user = await this.userRepository.getUserById(userId);

    if (user) {
      const bankAccount = this.accountRepository.create({
        balance: balance,
        user: user
      });

      await this.accountRepository.save(bankAccount);

      return bankAccount;
    } else
      throw new AppError('User does not exists');
  }

  async deposit(userId: number, valueDeposit: number) : Promise<UpdateResult> {
    return await this.bankOperation(userId, valueDeposit, DEPOSIT_OPERATION);
  }

  async getBalance(userId: number): Promise<number> {
    return (await this.getAccount(userId))?.balance;
  }

  async getAccount(userId: number) : Promise<Account> {
    let account = await this.accountRepository.findOneBy({ user: { id: userId } });

    if (!account)
      throw new AppError('Account not exists');

    return account;
  }

  async bankOperation(userId: number, valueDeposit: number, depositOperation: number) : Promise<UpdateResult> {
    const currentAccount = await this.getAccount(userId);

    switch (depositOperation) {
      case DEPOSIT_OPERATION:
        currentAccount.balance += valueDeposit;
        break;

      default:
        break;
    }

    return this.updateBalance(currentAccount.id, currentAccount.balance);
  }

  async updateBalance(accountId: number, newBalance: number) : Promise<UpdateResult> {
    return this.accountRepository.update({ id: accountId }, { balance: newBalance, });
  }
}
