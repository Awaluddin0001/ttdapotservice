import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_ac`);
};

export const airconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_ac WHERE id = ?`,
  );
};

export const deleteairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(req, res, pool, `DELETE FROM maintenance_ac WHERE id = ?`);
};

export const createMaintenanceairconditioning = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_ac', 'ACMAI', columns);
};

export const updateairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_ac', columns);
};
