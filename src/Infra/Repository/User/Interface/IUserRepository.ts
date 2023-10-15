import { User } from "../../../../Domain/Entities/User";
import { Account } from "../../../../Domain/Entities/Account";

export interface IUserRepository {
  createUser(user: User): Promise<[User, Account]>
  emailExist(email: string): Promise<User | null>
  userExists(userId: number): Promise<User | null>
}
