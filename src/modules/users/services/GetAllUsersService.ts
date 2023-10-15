import { User } from "../infra/typeorm/entities/User";
import { IUserRepository } from "../infra/typeorm/repositories/interface/IUserRepository";

export class GetAllUsersService{
  constructor(private userRepository: IUserRepository) { }

  public async execute() : Promise<User[]>{
    return this.userRepository.getAll();
  }
}
