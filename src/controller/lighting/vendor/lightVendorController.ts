import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allLigtVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM lighting_vendor`);
};

export const lightVendor = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM lighting_vendor WHERE id = ?`,
  );
};

export const deleteLightVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM lighting_vendor WHERE id = ?`);
};

export const createLightVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'lighting_vendor', 'LIVEN', columns);
};

export const updateLightVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'lighting_vendor', columns);
};
