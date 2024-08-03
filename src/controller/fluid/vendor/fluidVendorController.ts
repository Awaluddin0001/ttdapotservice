import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allFluidVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM fluid_vendor`);
};

export const FluidVendor = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM fluid_vendor WHERE id = ?`,
  );
};

export const deleteFluidVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM fluid_vendor WHERE id = ?`);
};

export const createFluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'fluid_vendor', 'ELVEN', columns);
};

export const updateFluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'fluid_vendor', columns);
};
