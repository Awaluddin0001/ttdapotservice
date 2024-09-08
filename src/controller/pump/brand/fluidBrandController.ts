import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const pumpBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM pump_brand as cas`,
  );
};

export const pumpBrand = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM pump_brand WHERE id = ?`);
};

export const createPumpBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'pump_brand', 'PURBA', columns);
};

export const updatePumpBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'pump_brand', columns);
};

export const deletePumpBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM pump_brand WHERE id = ?`);
};
