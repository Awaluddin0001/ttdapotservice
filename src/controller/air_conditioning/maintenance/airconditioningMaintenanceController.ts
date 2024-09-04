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

export const allairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM air_conditioning_maintenance as cas`,
  );
};

export const airconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM air_conditioning_maintenance WHERE id = ?`,
  );
};

export const deleteairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning_maintenance WHERE id = ?`,
    `air_conditioning`,
    `air_conditioning_maintenance`,
  );
};

export const createMaintenanceairconditioning = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'air_conditioning_maintenance',
    'ACMAI',
    columns,
    `air_conditioning`,
  );
};

export const updateairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(
    req,
    res,
    'air_conditioning_maintenance',
    columns,
    `air_conditioning`,
    `ACMAI`,
  );
};
