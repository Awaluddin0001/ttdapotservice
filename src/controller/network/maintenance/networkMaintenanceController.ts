import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allNetworkMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM maintenance_network`);
};

export const NetworkMaintenance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_network WHERE id = ?`,
  );
};

export const deleteNetworkMaintenance = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_network WHERE id = ?`,
  );
};

export const createMaintenanceNetwork = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_network', 'NIMAI', columns);
};

export const updateNetworkMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_network', columns);
};
