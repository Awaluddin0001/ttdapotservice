import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allElectricalMaintenance = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_electrical`,
    `maintenance_electrical`,
  );
};

export const electricalMaintenance = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_electrical WHERE id = ?`,
  );
};

export const deleteElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_electrical WHERE id = ?`,
  );
};

export const createMaintenanceElectrical = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_electrical', 'ELMAI', columns);
};

export const updateElectricalMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_electrical', columns);
};
