import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const electricalBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM electrical_brand as cas`,
  );
};

export const electricalBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM electrical_brand WHERE id = ?`,
  );
};

export const createElectricalBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'electrical_brand', 'ELRBR', columns);
};

export const updateElectricalBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'electrical_brand', columns);
};

export const deleteElectricalBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM electrical_brand WHERE id = ?`);
};
