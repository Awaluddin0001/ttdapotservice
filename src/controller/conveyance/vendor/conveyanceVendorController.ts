import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allconveyanceVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM conveyance_vendor as cas`,
  );
};

export const conveyanceVendor = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM conveyance_vendor WHERE id = ?`,
  );
};

export const createconveyanceVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'conveyance_vendor', 'COVEN', columns);
};

export const updateconveyanceVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'conveyance_vendor', columns);
};

export const deleteconveyanceVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM conveyance_vendor WHERE id = ?`);
};
