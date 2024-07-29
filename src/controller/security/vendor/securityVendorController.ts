import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allsecurityVendor = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM security_vendor`,
    `security_vendor`,
  );
};

export const securityVendor = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM security_vendor WHERE id = ?`);
};

export const deletesecurityVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM security_vendor WHERE id = ?`);
};

export const createsecurityVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'security_vendor', 'SEVEN', columns);
};

export const updatesecurityVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'security_vendor', columns);
};
