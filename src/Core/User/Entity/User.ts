import { Account } from "../../Account/Entity";

export class User {
  userId: number;
  name: string;
  email: string;
  password: string;
  account: Account;

  constructor (userId: number, name: string, email: string, password: string, account: Account){
    this.userId = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.account = account;
  }
}
