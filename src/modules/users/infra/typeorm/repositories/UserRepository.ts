import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/User';
import { IUserRepository } from './interface/IUserRepository';
import { Account } from '../../../../accounts/infra/typeorm/entities/Account';
import { AccountRepository } from '../../../../accounts/infra/typeorm/repositories/AccountRepository';
import { dataSource } from '../../../../../Shared/Typeorm';
import { ICreateUser } from '../../../domain/models/ICreateUser';

export class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor(private accountRepository: AccountRepository) {
    this.userRepository = dataSource.getRepository(User);
  }

  async create({ name, email, password }: ICreateUser): Promise<User> {
    const newUser = this.userRepository.create({
      name: name,
      email: email,
      password: password
    });

    await this.userRepository.save(newUser);
    await this.accountRepository.createAccount(0, newUser.id);

    return newUser;
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async update(userId: number, { name, password }: ICreateUser): Promise<UpdateResult> {
    await this.getUserById(userId);

    return await this.userRepository.update(userId, {
      name: name,
      password: password
    });
  }

  async delete(userId: number): Promise<boolean> {
    await this.getUserById(userId);
    const deleteResult = await this.userRepository.delete(userId);
    return deleteResult.affected === 1;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(userId: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
