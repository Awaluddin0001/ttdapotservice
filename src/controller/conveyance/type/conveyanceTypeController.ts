import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const conveyanceTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM conveyance_type as cas`,
  );
};

export const conveyanceType = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT cas.* FROM conveyance_type as cas`);
};

export const createConveyanceType = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'conveyance_type', 'COTYP', columns);
};

export const updateConveyanceType = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'conveyance_type', columns);
};

export const deleteConveyanceType = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM conveyance_type WHERE id = ?`);
};
