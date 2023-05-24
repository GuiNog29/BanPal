import { Account } from "../../Account/Entity/AccountEntity";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  account: Account | null;

  constructor (userId: number, name: string, email: string, password: string, account: Account | null){
    this.id = userId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.account = account;
  }
}
