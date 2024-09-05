import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const conveyanceBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM conveyance_brand as cas`,
  );
};

export const conveyanceBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM conveyance_brand WHERE id = ?`,
  );
};

export const createConveyanceBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'conveyance_brand', 'CORBA', columns);
};

export const updateConveyanceBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'conveyance_brand', columns);
};

export const deleteConveyanceBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM conveyance_brand WHERE id = ?`);
};
