import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const safetyBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM safety_brand as cas`,
  );
};

export const safetyBrand = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM safety_brand WHERE id = ?`);
};

export const createSafetyBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'safety_brand', 'EXRBA', columns);
};

export const updateSafetyBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'safety_brand', columns);
};

export const deleteSafetyBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM safety_brand WHERE id = ?`);
};
