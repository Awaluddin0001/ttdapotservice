import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const extinguishBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM extinguish_brand as cas`,
  );
};

export const extinguishBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM extinguish_brand WHERE id = ?`,
  );
};

export const createExtinguishBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'extinguish_brand', 'EXRBA', columns);
};

export const updateExtinguishBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'extinguish_brand', columns);
};

export const deleteExtinguishBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM extinguish_brand WHERE id = ?`);
};
