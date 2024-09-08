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

export const alllightingMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM lighting_maintenance as cas`,
  );
};

export const lightingMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM lighting_maintenance WHERE id = ?`,
  );
};

export const deletelightingMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM lighting_maintenance WHERE id = ?`,
  );
};

export const createMaintenancelighting = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'lighting_maintenance',
    'FLMAI',
    columns,
  );
};

export const updatelightingMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(req, res, 'lighting_maintenance', columns);
};
