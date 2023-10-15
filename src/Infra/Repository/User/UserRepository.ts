import { Repository, UpdateResult } from 'typeorm';
import { User } from '../../../Domain/Entities/User';
import { AccountRepository } from './../Account/AccountRepository';
import { Account } from '../../../Domain/Entities/Account';
import { IUserRepository } from './Interface/IUserRepository';
import { dataSource } from '../../../Shared/Typeorm';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor(private accountRepository: AccountRepository) {
    this.userRepository = dataSource.getRepository(User);
  }

  async createUser(user: User): Promise<[User, Account]> {
    await this.getExistEmail(user.email);

    const newUser = this.userRepository.create({
      name: user.name,
      email: user.email,
      password: user.password
    });

    await this.userRepository.save(newUser);

    const newAccountUser = await this.accountRepository.createAccount(0, newUser.id);

    return [newUser, newAccountUser];
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async updateUser(userId: number, user: User): Promise<UpdateResult> {
    await this.getExistUser(userId);

    return await this.userRepository.update(userId, {
      name: user.name,
      password: user.password
    });
  }

  async deleteUser(userId: number): Promise<boolean> {
    await this.getExistUser(userId);
    const deleteResult = await this.userRepository.delete(userId);
    return deleteResult.affected === 1;
  }

  async getExistEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });

    if (user)
      throw new Error('Email already exists');
  }

  async getExistUser(userId: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
