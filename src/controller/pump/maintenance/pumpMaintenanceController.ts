import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allpumpMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_pump`);
};

export const pumpMaintenance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_pump WHERE id = ?`,
  );
};

export const deletepumpMaintenance = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM maintenance_pump WHERE id = ?`);
};

export const createMaintenancepump = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_pump', 'PUMAI', columns);
};

export const updatepumpMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_pump', columns);
};
