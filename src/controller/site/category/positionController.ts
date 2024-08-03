import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';

export const allRoom = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM room`, true);
};
export const allFloor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM floor`, true);
};
