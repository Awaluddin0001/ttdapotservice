import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const alllightingMaintenance = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_lighting`,
    `maintenance_lighting`,
  );
};

export const lightingMaintenance = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_lighting WHERE id = ?`,
  );
};

export const deletelightingMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_lighting WHERE id = ?`,
  );
};

export const createMaintenancelighting = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_lighting', 'LIMAI', columns);
};

export const updatelightingMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_lighting', columns);
};
