import { UpdateResult } from "typeorm";
import { User } from "../../entities/User";
import { ICreateUser } from "../../../../domain/models/ICreateUser";

export interface IUserRepository {
  create({ name, email, password }: ICreateUser): Promise<User>
  getAll() : Promise<User[]>
  update(userId: number, user: User) : Promise<UpdateResult>
  delete(userId: number) : Promise<boolean>
  getUserByEmail(email: string): Promise<User | null>
  getUserById(userId: number): Promise<User | null>
}
