import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const networkTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name, sc.name as category_name  FROM network_type as cas  LEFT JOIN network_sub_category sc ON sc.id = cas.sub_category_id`,
  );
};

export const networkType = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, sc.name as category_name FROM network_type as cas LEFT JOIN network_sub_category sc ON sc.id = cas.sub_category_id WHERE cas.id = ?`,
  );
};

export const createNetworkType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await createEntity(req, res, 'network_type', 'NETYP', columns);
};

export const updateNetworkType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await updateEntity(req, res, 'network_type', columns);
};

export const deleteNetworkType = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM network_type WHERE id = ?`);
};

export const networkSubCategories = async (req: Request, res: Response) => {
  console.log('run sub');
  await getRowQuery(req, res, pool, `SELECT * FROM network_sub_category`, true);
};
