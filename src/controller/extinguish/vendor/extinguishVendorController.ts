import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allextinguishVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM extinguish_vendor`);
};

export const extinguishVendor = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM extinguish_vendor WHERE id = ?`,
  );
};

export const deleteextinguishVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM extinguish_vendor WHERE id = ?`);
};

export const createextinguishVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'extinguish_vendor', 'EXVEN', columns);
};

export const updateextinguishVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'extinguish_vendor', columns);
};
