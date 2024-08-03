import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allairconditioningVendor = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM air_conditioning_vendor`);
};

export const airconditioningVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM air_conditioning_vendor WHERE id = ?`,
  );
};

export const deleteairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning_vendor WHERE id = ?`,
  );
};

export const createairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'air_conditioning_vendor', 'ACVEN', columns);
};

export const updateairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'air_conditioning_vendor', columns);
};
