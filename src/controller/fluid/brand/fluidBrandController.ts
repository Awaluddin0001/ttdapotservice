import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const fluidBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM fluid_tank_brand as cas`,
  );
};

export const fluidBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM fluid_tank_brand WHERE id = ?`,
  );
};

export const createFluidBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'fluid_tank_brand', 'EXRBA', columns);
};

export const updateFluidBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'fluid_tank_brand', columns);
};

export const deleteFluidBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM fluid_tank_brand WHERE id = ?`);
};
