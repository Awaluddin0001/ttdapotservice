import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allsecurityMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_security`);
};

export const securityMaintenance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_security WHERE id = ?`,
  );
};

export const deletesecurityMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_security WHERE id = ?`,
  );
};

export const createMaintenancesecurity = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_security', 'SEMAI', columns);
};

export const updatesecurityMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_security', columns);
};
