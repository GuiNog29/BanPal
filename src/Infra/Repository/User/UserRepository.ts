import { PrismaClient } from "@prisma/client";
import { User } from "../../../Domain/User/Entity/User";
import { IUserRepository } from "./Interface/IUserRepository";
import { Account } from "../../../Domain/Account/Entity/Account";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  
  async createUser(user: User): Promise<User> {

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return newUser;
  }

  async getAllUsers(): Promise<User & { account: Account | null; }> {
    const users = await prisma.user.findMany({
      include: {
        account: true,
      }
    });

    return users;
  }


  updateUser(user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }

  deleteUser(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
}
