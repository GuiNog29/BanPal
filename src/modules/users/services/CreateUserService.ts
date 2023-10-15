import { User } from '../infra/typeorm/entities/User';
import { ICreateUser } from '../domain/models/ICreateUser';
import { AppError } from '../../../Shared/Errors/AppError';
import { IUserRepository } from '../infra/typeorm/repositories/interface/IUserRepository';

export class CreateUserService {
  constructor(private userRepository: IUserRepository) { }

  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.userRepository.getUserByEmail(email);

    if (emailExists)
      throw new AppError('Email already exists');

    return await this.userRepository.create({
      name, email, password
    });
  }
}
