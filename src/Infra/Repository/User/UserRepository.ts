import { User } from '../../../Domain/Entities/User';
import { AccountRepository } from './../Account/AccountRepository';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const accountRepository = new AccountRepository;

class UserRepository {
  async createUser(user: User) {
    await this.emailExist(user.email);

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
    console.log('aoba')

    return users;
  }

  async updateUser(userId: number, user: User) {
    await this.userExists(userId);

    const userUpdated = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: user.name,
        password: user.password
      }
    });

    return userUpdated;
  }

  async deleteUser(userId: number) {
    await this.userExists(userId);

    await prisma.user.delete({
      where: {
        id: userId
      }
    })

    return true;
  }

  async emailExist(email: string) {
    const emailExist = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (emailExist)
      throw new Error('Email already exists');
  }

  async userExists(userId: number) {
    const userExist = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userExist)
      throw new Error('User not exists');
  }
}

export default new UserRepository;
