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

export const allfluidMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM fluid_maintenance as cas`,
  );
};

export const fluidMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM fluid_maintenance WHERE id = ?`,
  );
};

export const deletefluidMaintenance = async (req: Request, res: Response) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM fluid_maintenance WHERE id = ?`,
  );
};

export const createMaintenancefluid = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await createEntityDocument(req, res, 'fluid_maintenance', 'FLMAI', columns);
};

export const updatefluidMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await updateEntityDocument(req, res, 'fluid_maintenance', columns);
};
