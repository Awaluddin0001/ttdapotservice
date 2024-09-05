import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow, deleteRowDocument } from '@/utils/deleteData';
import {
  createEntity,
  createEntityDocument,
  updateEntity,
  updateEntityDocument,
} from '@/utils/CreatePutDataElectrical';

export const allextinguishMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM extinguish_maintenance as cas`,
  );
};

export const extinguishMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM extinguish_maintenance WHERE id = ?`,
  );
};

export const deleteextinguishMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM extinguish_maintenance WHERE id = ?`,
  );
};

export const createMaintenanceextinguish = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'extinguish_maintenance',
    'EXMAI',
    columns,
  );
};

export const updateextinguishMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(req, res, 'extinguish_maintenance', columns);
};
