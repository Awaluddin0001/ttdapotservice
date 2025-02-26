import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRowLicense } from '@/utils/deleteData';
import {
  createLicensesDocument,
  updateLicensesDocument,
} from '@/utils/CreatePutDataElectrical';

export const allLicenses = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM license as cas`,
  );
};

export const licenseMaintenance = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM license WHERE id = ?`);
};

export const deletelicenseMaintenance = async (req: Request, res: Response) => {
  await deleteRowLicense(req, res, pool, `DELETE FROM license WHERE id = ?`);
};

export const createMaintenancelicense = async (req: Request, res: Response) => {
  await createLicensesDocument(
    req,
    res,
    pool,
    `INSERT INTO license (id, name_file, created_at, user_id) VALUES (?, ?, ?, ?)`,
  );
};

export const updatelicenseMaintenance = async (req: Request, res: Response) => {
  await updateLicensesDocument(
    req,
    res,
    pool,
    `UPDATE license SET name_file = ?, created_at = ?, user_id = ? WHERE id = ?`,
  );
};
