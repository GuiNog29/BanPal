import { Repository } from 'typeorm';
import { User } from '../../../Domain/Entities/User';
import { AccountRepository } from './../Account/AccountRepository';
import { Account } from '../../../Domain/Entities/Account';
import { IUserRepository } from './Interface/IUserRepository';
import { dataSource } from '../../../Shared/Typeorm';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  private accountRepository: AccountRepository;

  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }

  async createUser(user: User): Promise<[User, Account]> {
    await this.emailExist(user.email);

    const newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password
    });

    await this.userRepository.save(newUser);

    const newAccountUser = await this.accountRepository.createAccount(0, newUser.id)

    return [newUser, newAccountUser];
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

  async emailExist(email: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({
      email
    });

    if (user)
      throw new Error('Email already exists');

    return user;
  }

  async userExists(userId: number): Promise<User | null> {
    const userExist = await this.userRepository.findOneBy({
      id: userId
    });

    return userExist;
  }
}

export default new UserRepository;
