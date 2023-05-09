import { Request, Response } from "express";
import { PrismaClient } from "../../../node_modules/.prisma/client";
import * as yup from 'yup';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
  password: string;
}

const bodyValidation: yup.Schema<IUser> = yup.object().shape({
  name: yup.string().required().min(3),
  email: yup.string().required().email(),
  password: yup.string().required().min(3)
});


export class UserController {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as IUser;

    const emailExist = await prisma.user.findUnique({ where: { email: email } })

    if (emailExist)
      return res.status(400).json({
        message: 'Email already exists'
      });

    try {
      await bodyValidation.validate(req.body);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password
        }
      });

      const bankAccount = await createBankAccount(0, newUser.id);

      return res.status(200).json({
        message: 'User created successfully', newUser, bankAccount
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
        message: 'Registered Users', users
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error to get users'
      });
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.query;
    const { name, email, password } = req.body as IUser;

    const userExist = await prisma.user.findUnique({ where: { id: Number(userId) } })

    if (!userExist)
      return res.status(400).json({ message: 'User not exists' });

    try {
      await bodyValidation.validate(req.body);

      const userUpdated = await prisma.user.update({
        where: {
          id: Number(userId)
        },
        data: {
          name: name,
          email: email,
          password: password
        }
      })

      return res.status(200).json({ message: 'User updated successfully', userUpdated });
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
      const deleted = await prisma.user.delete({
        where: { id: Number(userId) }
      })
      return res.status(200).json({
        message: 'User deleted', deleted
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error to delete user'
      })
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

