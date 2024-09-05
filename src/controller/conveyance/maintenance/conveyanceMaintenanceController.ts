import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRow, deleteRowDocument } from '@/utils/deleteData';
import {
  createEntity,
  createEntityDocument,
  updateEntity,
  updateEntityDocument,
} from '@/utils/CreatePutDataElectrical';

export const allconveyanceMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM conveyance_maintenance as cas`,
  );
};

export const conveyanceMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM conveyance_maintenance WHERE id = ?`,
  );
};

export const deleteconveyanceMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM conveyance_maintenance WHERE id = ?`,
  );
};

export const createMaintenanceconveyance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'conveyance_maintenance',
    'COMAI',
    columns,
  );
};

export const updateconveyanceMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(req, res, 'conveyance_maintenance', columns);
};
