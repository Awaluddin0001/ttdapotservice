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

export const allElectricalMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM electrical_maintenance as cas`,
  );
};

export const electricalMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM electrical_maintenance WHERE id = ?`,
  );
};

export const deleteElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM electrical_maintenance WHERE id = ?`,
    'electrical',
    `electrical_maintenance`,
  );
};

export const createMaintenanceElectrical = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'electrical_maintenance',
    'ELMAI',
    columns,
    'electrical',
  );
};

export const updateElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(
    req,
    res,
    'electrical_maintenance',
    columns,
    'electrical',
    'ELMAI',
  );
};
