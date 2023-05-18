import { AccountRepository } from './../Account/AccountRepository';
import { PrismaClient } from "@prisma/client";
import { User } from "../../../Domain/User/Entity/User";

const prisma = new PrismaClient();
const accountRepository = new AccountRepository;

export class UserRepository {
  async createUser(user: User) {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    const newAccountUser = await accountRepository.createAccount(0, newUser.id)

    return { newUser, newAccountUser };
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      include: {
        account: true,
      }
    });

    return users;
  }


  async updateUser(user: User) {
    const userUpdated = await prisma.user.update({
      where: {
        id: Number(user.id)
      },
      data: {
        name: user.name,
        password: user.password
      }
    });

    return userUpdated;
  }

  async deleteUser(userId: string) {
    await prisma.user.delete({
      where: { id: Number(userId) }
    })

    return true;
  }
}

