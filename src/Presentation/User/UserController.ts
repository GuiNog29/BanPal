import { Request, Response } from "express";
import { PrismaClient } from ".prisma/client";
import * as yup from 'yup';
import UserRepository from "../../Infra/Repository/User/UserRepository";

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
  password: string;
}

const bodyValidationCreate: yup.Schema<IUser> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(3)
});

const bodyValidationUpdate = yup.object().shape({
  name: yup.string().required().min(3),
  password: yup.string().required().min(3)
});

export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as IUser;

    const emailExist = await prisma.user.findUnique({ where: { email: email } });

    if (emailExist)
      return res.status(400).json({
        message: 'Email already exists'
      });

    try {
      await bodyValidationCreate.validate(req.body);

      const newUser = await UserRepository.createUser(req.body);

      return res.status(201).json({
        newUser
      });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return res.status(500).json({
        errors: {
          default: yupError.message,
        }
      });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany({
        include: {
          account: true
        }
      });

      if (users === undefined || users.length == 0)
        return res.status(400).json({
          message: 'There are no registered users'
        });

      return res.status(200).json({
        users
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Error to get users'
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.query;
    const { name, password } = req.body as IUser;

    const userExist = await prisma.user.findUnique({ where: { id: Number(userId) } });

    if (!userExist)
      return res.status(400).json({ message: 'User not exists' });

    try {
      await bodyValidationUpdate.validate(req.body);

      const userUpdated = await prisma.user.update({
        where: {
          id: Number(userId)
        },
        data: {
          name: name,
          password: password
        }
      });

      return res.status(200).json({ userUpdated });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return res.status(500).json({
        errors: {
          default: yupError.message,
        }
      });
    }
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.query;

    try {
      await prisma.user.delete({
        where: { id: Number(userId) }
      })
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

async function createBankAccount(balance: number, userId: number) {
  const bankAccount = await prisma.account.create({
    data: {
      balance: balance,
      userId: userId
    }
  });

  return bankAccount;
}

