import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allpumpVendor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM pump_vendor`);
};

export const pumpVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM pump_vendor WHERE id = ?`,
  );
};

export const deletepumpVendor = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM pump_vendor WHERE id = ?`,
  );
};

export const createpumpVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'pump_vendor', 'PUVEN', columns);
};

export const updatepumpVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'pump_vendor', columns);
};
