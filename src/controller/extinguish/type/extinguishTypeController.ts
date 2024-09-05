import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const extinguishTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM extinguish_type as cas`,
  );
};

export const extinguishType = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT cas.* FROM extinguish_type as cas`);
};

export const createExtinguishType = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'extinguish_type', 'EXTYP', columns);
};

export const updateExtinguishType = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'extinguish_type', columns);
};

export const deleteExtinguishType = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM extinguish_type WHERE id = ?`);
};
