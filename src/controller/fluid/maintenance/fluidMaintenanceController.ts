import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allFluidMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_fluid`);
};

export const fluidMaintenance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_fluid WHERE id = ?`,
  );
};

export const deleteFluidMaintenance = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM maintenance_fluid WHERE id = ?`);
};

export const createMaintenanceFluid = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_fluid', 'FTMAI', columns);
};

export const updateFluidMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_fluid', columns);
};
