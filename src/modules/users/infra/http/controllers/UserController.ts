import { Request, Response } from "express";
import UserRepository from "../../Infra/Repository/User/UserRepository";

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const newUser = await UserRepository.createUser(req.body);

      return res.status(201).json({
        newUser
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error to create user'
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = UserRepository.getAllUsers();

      return res.status(200).json({
        users
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error to get users'
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userUpdated = UserRepository.updateUser(Number(req.query), req.body);

      return res.status(200).json({ userUpdated });
    } catch (error) {
      return res.status(500).json({
        message: 'Error to update user'
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      await UserRepository.deleteUser(Number(req.query));

      return res.status(204).json({
        message: 'User deleted'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error to delete user'
      });
    }
  }
}

