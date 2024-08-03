import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allextinguishMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_extinguish`);
};

export const extinguishMaintenance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_extinguish WHERE id = ?`,
  );
};

export const deleteextinguishMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_extinguish WHERE id = ?`,
  );
};

export const createMaintenanceextinguish = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_extinguish', 'EXMAI', columns);
};

export const updateextinguishMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_extinguish', columns);
};
