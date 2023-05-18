import { User } from "../../User/Entity/User";

export class Account{
  accountId: number;
  balance: number;
  userId: User;


  constructor(accountId: number, balance: number, userId: User) {
    this.accountId = accountId;
    this.balance = balance;
    this.userId = userId;
  }
}
