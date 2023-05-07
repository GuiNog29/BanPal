import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
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

const findEspecificUser = (email: string) => {
  return Prisma.validator<Prisma.UserWhereUniqueInput>()({
    email,
  })
}

export class UserController {

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body as IUser;

    const emailExist = await prisma.user.findUnique({ where: findEspecificUser(email) })

    if (emailExist)
      return res.status(400).json({ message: 'Email already exists' })

    try {
      await bodyValidation.validate(req.body);

      const newUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: password
        }
      })

      return res.status(200).json({ message: 'User created successfully', newUser });
    } catch (error) {
      const yupError = error as yup.ValidationError;
      return res.status(500).json({
        errors: {
          default: yupError.message,
        }
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const users = await prisma.user.findMany();

      if (users === undefined || users.length == 0)
        return res.status(400).json({ message: 'There are no registered users' })

      return res.status(200).json({ message: 'Registered Users', users })
    } catch (error) {
      return res.status(500).json({ message: 'Error to get users' })
    }
  }

  async put(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, password } = req.body as IUser;

    const emailExist = await prisma.user.findUnique({ where: findEspecificUser(email) })

    if (emailExist)
      return res.status(400).json({ message: 'Email already exists' })

    try {
      await bodyValidation.validate(req.body);

      const userUpdated = await prisma.user.update({
        where: { id: Number(id) },
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

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deleted = await prisma.user.delete({
        where: { id: Number(id) }
      })
      return res.status(200).json({ message: 'User deleted', deleted })
    } catch (error) {
      return res.status(500).json({ message: 'Error to delete user' })
    }
  }
}
