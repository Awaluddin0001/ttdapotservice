import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRowDocument } from '@/utils/deleteData';
import {
  createEntityDocument,
  updateEntityDocument,
} from '@/utils/CreatePutDataElectrical';

export const allpumpMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM pump_maintenance as cas`,
  );
};

export const pumpMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM pump_maintenance WHERE id = ?`,
  );
};

export const deletepumpMaintenance = async (req: Request, res: Response) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM pump_maintenance WHERE id = ?`,
  );
};

export const createMaintenancepump = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await createEntityDocument(req, res, 'pump_maintenance', 'PUMAI', columns);
};

export const updatepumpMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await updateEntityDocument(req, res, 'pump_maintenance', columns);
};
