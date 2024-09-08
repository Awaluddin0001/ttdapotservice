import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allsafetyVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM safety_vendor as cas`,
  );
};

export const safetyVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM safety_vendor WHERE id = ?`);
};

export const deletesafetyVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM safety_vendor WHERE id = ?`);
};

export const createsafetyVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'safety_vendor', 'FUVEN', columns);
};

export const updatesafetyVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'safety_vendor', columns);
};
