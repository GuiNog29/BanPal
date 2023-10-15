import { Repository } from "typeorm";
import { Account } from "../../../Domain/Entities/Account";
import { dataSource } from '../../../Shared/Typeorm';
import { IAccountRepository } from "./Interface/IAccountRepository";
import { UserRepository } from "../User/UserRepository";

const DEPOSIT_OPERATION = 1

export class AccountRepository implements IAccountRepository {
  private accountRepository: Repository<Account>;

  constructor(private userRepository: UserRepository) {
    this.accountRepository = dataSource.getRepository(Account);
  }

  async createAccount(balance: number, userId: number): Promise<Account> {
    const user = await this.userRepository.getExistUser(userId);

    if (user) {
      const bankAccount = this.accountRepository.create({
        balance: balance,
        user: user
      });

      await this.accountRepository.save(bankAccount);

      return bankAccount;
    } else
      throw new Error('User does not exists');
  }

  async deposit(userId: number, valueDeposit: number) {
    return await this.bankOperation(userId, valueDeposit, DEPOSIT_OPERATION);
  }

  async getBalance(userId: number): Promise<any> {
    return (await this.getAccount(userId))?.balance;
  }

  async getAccount(userId: number) : Promise<Account> {
    let account = await this.accountRepository.findOneBy({ user: { id: userId } });

    if (!account)
      throw new Error('Account not exists');

    return account;
  }

  async bankOperation(userId: number, valueDeposit: number, depositOperation: number) {
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

  async updateBalance(accountId: number, newBalance: number) {
    return this.accountRepository.update({ id: accountId }, { balance: newBalance, });
  }
}
