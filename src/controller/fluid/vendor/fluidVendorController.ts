import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allfluidVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM fluid_tank_vendor as cas`,
  );
};

export const fluidVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM fluid_tank_vendor WHERE id = ?`,
  );
};

export const deletefluidVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM fluid_tank_vendor WHERE id = ?`);
};

export const createfluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'fluid_tank_vendor', 'FUVEN', columns);
};

export const updatefluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'fluid_tank_vendor', columns);
};
