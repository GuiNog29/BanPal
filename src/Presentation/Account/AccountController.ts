import { PrismaClient } from '@prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class AccountController {

  async getBankBalance(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const balance = await prisma.account.findFirst({ where: { userId: Number(id) } });

      return res.status(200).json({ message: `Your Balance is ${balance?.balance}` })
    } catch (error) {
      return res.status(500).json({ message: 'Error to get balance' });
    }
  }

  async bankDeposit(req: Request, res: Response) {
    const { id, idAccount, valueDeposit } = req.query;

    let newBalance = 0;

    try {
      let currentBalance = await prisma.account.findFirst({
        where: { userId: Number(id) }
      });

      if (currentBalance) {
        newBalance = currentBalance?.balance + Number(valueDeposit);
      }

      const balance = await prisma.account.update({
        where: {
          id: Number(idAccount)
        },
        data: {
          balance: newBalance,
        }
      });

      return res.status(200).json({
        message: `Deposit of ${valueDeposit} made successfully, you current balance is ${balance}`
      })
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  async bankDraft(req: Request, res: Response) {

  }

  async deleteAccount(req: Request, res: Response) {

  }
}
