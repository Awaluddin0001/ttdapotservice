import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allextinguishVendor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM extinguish_vendor`);
};

export const extinguishVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM extinguish_vendor WHERE id = ?`,
  );
};

export const deleteextinguishVendor = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM extinguish_vendor WHERE id = ?`,
  );
};

export const createextinguishVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'extinguish_vendor', 'EXVEN', columns);
};

export const updateextinguishVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'extinguish_vendor', columns);
};
