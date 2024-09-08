import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const alllightingVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM lighting_vendor as cas`,
  );
};

export const lightingVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM lighting_vendor WHERE id = ?`,
  );
};

export const deletelightingVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM lighting_vendor WHERE id = ?`);
};

export const createlightingVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'lighting_vendor', 'FUVEN', columns);
};

export const updatelightingVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'lighting_vendor', columns);
};
