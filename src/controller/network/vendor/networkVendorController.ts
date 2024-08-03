import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allNetworkVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM network_vendor`);
};

export const NetworkVendor = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM network_vendor WHERE id = ?`,
  );
};

export const deleteNetworkVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM network_vendor WHERE id = ?`);
};

export const createNetworkVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'network_vendor', 'NIVEN', columns);
};

export const updateNetworkVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'network_vendor', columns);
};
