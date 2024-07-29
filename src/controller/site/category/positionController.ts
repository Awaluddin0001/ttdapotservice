import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allRoom = async (req: Request, res: Response) => {
  await getAllRow(req, res, pool, `SELECT * FROM room`, `room`);
};
export const allFloor = async (req: Request, res: Response) => {
  await getAllRow(req, res, pool, `SELECT * FROM floor`, `floor`);
};
