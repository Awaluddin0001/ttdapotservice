import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allconveyanceMaintenance = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_conveyance`,
    `maintenance_conveyance`,
  );
};

export const conveyanceMaintenance = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_conveyance WHERE id = ?`,
  );
};

export const deleteconveyanceMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_conveyance WHERE id = ?`,
  );
};

export const createMaintenanceconveyance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_conveyance', 'COMAI', columns);
};

export const updateconveyanceMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_conveyance', columns);
};
