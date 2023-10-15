import { User } from "../../../../Domain/Entities/User";
import { Account } from "../../../../Domain/Entities/Account";
import { UpdateResult } from "typeorm";

export interface IUserRepository {
  createUser(user: User): Promise<[User, Account]>
  getAllUsers() : Promise<User[]>
  updateUser(userId: number, user: User) : Promise<UpdateResult>
  deleteUser(userId: number) : Promise<boolean>
  emailExist(email: string): Promise<User | null>
  userExists(userId: number): Promise<User | null>
}
