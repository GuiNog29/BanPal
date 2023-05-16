import { Account } from "../../../../Domain/Account/Entity/Account";
import { User } from "../../../../Domain/User/Entity/User";

export interface IUserRepository {
  createUser(user: User): Promise<User>
  getAllUsers(): Promise<User & { account: Account | null; }>
  updateUser(user: User): Promise<User>
  deleteUser(id: string): Promise<User>
}
