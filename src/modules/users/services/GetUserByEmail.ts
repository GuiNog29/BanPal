import { AppError } from "../../../Shared/Errors/AppError";
import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../infra/typeorm/repositories/interface/IUserRepository";

export class GetUserByEmail {
  constructor(private userRepository: IUserRepository) { }

  public async execute(email: string): Promise<User | null> {
    var user = this.userRepository.getUserByEmail(email);

    if (!user)
      throw new AppError('User not found.');

    return user;
  }
}
