import { PrismaClient } from '.prisma/client';
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class AccountController {
  async getBankBalance(req: Request, res: Response) {
    const { userId } = req.query;

    try {

      const userExist = await prisma.user.findUnique({ where: { id: Number(userId) } })

      if (!userExist)
        return res.status(400).json({ message: 'User not exists' });

      const balance = await prisma.account.findFirst({
        where: {
          userId:
            Number(userId)
        }
      });

      return res.status(200).json({
        message: `Your Balance is ${balance?.balance}`
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error to get balance'
      });
    }
  }

  async bankDeposit(req: Request, res: Response) {
    const { userId, accountId, valueDeposit } = req.query;

    if (Number(valueDeposit) <= 0)
      return res.status(400).json({
        message: 'Deposit amount must be greater than 0'
      });

    try {
      const newBalance = await OperationBank(Number(userId), Number(valueDeposit), 'deposit')
      const balance = await updateBalance(Number(accountId), Number(newBalance));

      return res.status(200).json({
        message: `Deposit of ${valueDeposit} made successfully, you current balance is ${balance?.balance}`
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error to deposit'
      });
    }
  }

  async bankDraft(req: Request, res: Response) {
    const { userId, accountId, valueDraft } = req.query;

    try {
      const newBalance = await OperationBank(Number(userId), Number(valueDraft), 'draft');

      if (newBalance === -1)
        return res.status(400).json({
          message: `Amount ${valueDraft} is greather than balance`
        });

      const balance = await updateBalance(Number(accountId), Number(newBalance));

      return res.status(200).json({
        message:
          `Draft of ${valueDraft} made successfully, you current balance is ${balance?.balance}`
      })
    } catch (error) {
      return res.status(500).json({
        message: 'Error to draft'
      });
    }
  }

  async bankTransfer(req: Request, res: Response) {
    const { userIdSending, userIdReceiving, transferAmount } = req.query;

    try {
      const accountSending = await prisma.account.findFirst({
        where: {
          userId: Number(userIdSending)
        }
      });

      const accountReceiving = await prisma.account.findFirst({
        where: {
          userId: Number(userIdReceiving)
        }
      });

      if (!accountSending)
        return res.status(400).json({ message: 'Transfer account not exists' });

      if (!accountReceiving)
        return res.status(400).json({ message: 'Receiving account not exists' });

      accountSending!.balance -= Number(transferAmount)
      await prisma.account.update({
        where: {
          userId: Number(userIdSending)
        },
        data: {
          balance: accountSending.balance,
        }
      });

      accountReceiving!.balance += Number(transferAmount);
      await prisma.account.update({
        where: {
          userId: Number(userIdReceiving)
        },
        data: {
          balance: accountReceiving.balance,
        }
      });

      return res.status(200).json({
        message: `Transfer of ${transferAmount} made successfully, you current balance is ${accountSending?.balance}`
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Error to transfer'
      });
    }
  }
}

async function OperationBank(userId: number, valueForOperation: number, operation: string) {
  let newBalance = 0;

  let currentAccount = await prisma.account.findFirst({
    where: {
      userId: userId
    }
  });

  if (currentAccount) {
    switch (operation) {
      case 'deposit': {
        newBalance = currentAccount?.balance + valueForOperation;
        break;
      }
      case 'draft': {
        newBalance = currentAccount?.balance - valueForOperation;
        break;
      }
      default: {
        currentAccount?.balance;
        break;
      }
    }
  }

  return newBalance;
}

async function updateBalance(accountId: number, newBalance: number) {
  try {
    return await prisma.account.update({
      where: {
        id: accountId
      },
      data: {
        balance: newBalance,
      }
    });
  } catch (error) {
    error
  }
}
