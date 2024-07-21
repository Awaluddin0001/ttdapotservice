import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM maintenance_ac`,
    `maintenance_ac`,
  );
};

export const airconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM maintenance_ac WHERE id = ?`,
  );
};

export const deleteairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM maintenance_ac WHERE id = ?`,
  );
};

export const createMaintenanceairconditioning = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_ac', 'ACMAI', columns);
};

export const updateairconditioningMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_ac', columns);
};
