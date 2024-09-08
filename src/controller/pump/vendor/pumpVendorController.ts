import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allpumpVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM pump_vendor as cas`,
  );
};

export const pumpVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM pump_vendor WHERE id = ?`);
};

export const deletepumpVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM pump_vendor WHERE id = ?`);
};

export const createpumpVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'pump_vendor', 'PUVEN', columns);
};

export const updatepumpVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'pump_vendor', columns);
};
