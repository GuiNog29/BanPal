import { Repository, UpdateResult } from 'typeorm';
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

  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async updateUser(userId: number, user: User) : Promise<UpdateResult>{
    await this.userExists(userId);

    const userUpdated = await this.userRepository.update(
      {
        id: userId
      },
      {
        name: user.name,
        password: user.password
      }
    );

    return userUpdated;
  }

  async deleteUser(userId: number) : Promise<boolean> {
    await this.userExists(userId);

    await this.userRepository.delete({
      id: userId
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
