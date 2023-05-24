import { AccountRepository } from './../Account/AccountRepository';
import { PrismaClient } from "@prisma/client";
import { User } from "../../../Domain/User/Entity/UserEntity";

const prisma = new PrismaClient();
const accountRepository = new AccountRepository;
let mensagemErro = '';

export class UserRepository {
  async createUser(user: User) {

    if(await this.emailExist(user.email))
      return false;

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

  async deleteUser(userId: number) {
    await prisma.user.delete({
      where: { id: userId }
    })

    return true;
  }

  async emailExist(email: string){
    const emailExist = await prisma.user.findUnique({ where: { email: email } });

    if (emailExist)
      return mensagemErro = 'Email already exists';

    false;
  }
}

