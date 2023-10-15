import { UpdateResult } from "typeorm";
import { Account } from "../../entities/Account";

export interface IAccountRepository {
  createAccount(balance: number, userId: number): Promise<Account>
  deposit(userId: number, valueDeposit: number) : Promise<UpdateResult>
  getBalance(userId: number): Promise<number>
  getAccount(userId: number) : Promise<Account>
  bankOperation(userId: number, valueDeposit: number, depositOperation: number) : Promise<UpdateResult>
  updateBalance(accountId: number, newBalance: number) : Promise<UpdateResult>
}
