import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allSecurityLink = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM security_link as cas`,
  );
};

export const SecurityLink = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM security_link WHERE id = ?`,
  );
};

export const deleteSecurityLink = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM security_link WHERE id = ?`);
};

export const createSecurityLink = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await createEntity(req, res, 'security_link', 'SELIN', columns);
};

export const updateSecurityLink = async (req: Request, res: Response) => {
  const columns = [`incoming`, `outgoing`];
  await updateEntity(req, res, 'security_link', columns);
};
