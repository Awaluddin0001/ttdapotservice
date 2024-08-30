import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRowDocument } from '@/utils/deleteData';
import {
  createEntityDocument,
  updateEntityDocument,
} from '@/utils/CreatePutDataElectrical';

export const allNetworkMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM network_maintenance as cas`,
  );
};

export const NetworkMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM network_maintenance WHERE id = ?`,
  );
};

export const deleteNetworkMaintenance = async (req: Request, res: Response) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM network_maintenance WHERE id = ?`,
    'network',
    `network_maintenance`,
  );
};

export const createMaintenanceNetwork = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'network_maintenance',
    'NIMAI',
    columns,
    'network',
  );
};

export const updateNetworkMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`];
  await updateEntityDocument(
    req,
    res,
    'network_maintenance',
    columns,
    'network',
    'NIMAI',
  );
};
