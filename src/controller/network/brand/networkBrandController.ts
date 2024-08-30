import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const networkBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM network_brand as cas`,
  );
};

export const networkBrand = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM network_brand WHERE id = ?`);
};

export const createNetworkBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'network_brand', 'NIBRA', columns);
};

export const updateNetworkBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'network_brand', columns);
};

export const deleteNetworkBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM network_brand WHERE id = ?`);
};
