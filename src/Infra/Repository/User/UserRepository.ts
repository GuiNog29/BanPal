import { AccountRepository } from './../Account/AccountRepository';
import { PrismaClient } from "@prisma/client";
import { User } from "../../../Domain/User/Entity/User";

const accountRepository = new AccountRepository;
let mensagemErro = '';

export class UserRepository {
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient();
  }

  async createUser(user: User) {

    if(await this.emailExist(user.email))
      return mensagemErro;

    const newUser = await this.prisma.user.create({
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
    const users = await this.prisma.user.findMany({
      include: {
        account: true,
      }
    });

    return users;
  }


  async updateUser(user: User) {
    const userUpdated = await this.prisma.user.update({
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
    await this.prisma.user.delete({
      where: { id: userId }
    })

    return true;
  }

  async emailExist(email: string){
    const emailExist = await this.prisma.user.findUnique({ where: { email: email } });

    if (emailExist)
      return mensagemErro = 'Email already exists';

    false;
  }
}

