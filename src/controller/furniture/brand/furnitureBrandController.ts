import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const furnitureBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM furniture_brand as cas`,
  );
};

export const furnitureBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM furniture_brand WHERE id = ?`,
  );
};

export const createFurnitureBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'furniture_brand', 'FURBA', columns);
};

export const updateFurnitureBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'furniture_brand', columns);
};

export const deleteFurnitureBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM furniture_brand WHERE id = ?`);
};
