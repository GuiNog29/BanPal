import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../infra/typeorm/repositories/interface/IUserRepository";

export class GetUserById {
  constructor(private userRepository: IUserRepository) { }

  public async execute(userId: number): Promise<User | null> {
    return this.userRepository.getUserById(userId);
  }
}
