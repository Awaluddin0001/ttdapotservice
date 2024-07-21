import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allRoom = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM room`, `room`);
};
export const allFloor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM floor`, `floor`);
};
