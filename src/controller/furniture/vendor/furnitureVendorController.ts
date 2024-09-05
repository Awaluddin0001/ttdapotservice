import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allfurnitureVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM furniture_vendor as cas`,
  );
};

export const furnitureVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM furniture_vendor WHERE id = ?`,
  );
};

export const deletefurnitureVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM furniture_vendor WHERE id = ?`);
};

export const createfurnitureVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'furniture_vendor', 'FUVEN', columns);
};

export const updatefurnitureVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'furniture_vendor', columns);
};
