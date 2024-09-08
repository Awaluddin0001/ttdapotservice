import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const lightingBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM lighting_brand as cas`,
  );
};

export const lightingBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM lighting_brand WHERE id = ?`,
  );
};

export const createLightingBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'lighting_brand', 'LIRBA', columns);
};

export const updateLightingBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'lighting_brand', columns);
};

export const deleteLightingBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM lighting_brand WHERE id = ?`);
};
