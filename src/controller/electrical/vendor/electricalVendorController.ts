import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const electricalVendors = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM electrical_vendor as cas`,
  );
};

export const electricalVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM electrical_vendor WHERE id = ?`,
  );
};

export const createElectricalVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'electrical_vendor', 'ELVEN', columns);
};

export const updateElectricalVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'electrical_vendor', columns);
};

export const deleteElectricalVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM electrical_vendor WHERE id = ?`);
};
