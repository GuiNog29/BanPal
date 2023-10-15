import { UpdateResult } from "typeorm";
import { User } from "../../entities/User";
import { Account } from "../../../../../accounts/infra/typeorm/entities/Account";

export interface IUserRepository {
  createUser(user: User): Promise<[User, Account]>
  getAllUsers() : Promise<User[]>
  updateUser(userId: number, user: User) : Promise<UpdateResult>
  deleteUser(userId: number) : Promise<boolean>
  getExistEmail(email: string): Promise<void>
  getExistUser(userId: number): Promise<User | null>
}
