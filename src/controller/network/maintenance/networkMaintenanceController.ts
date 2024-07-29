import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allNetworkMaintenance = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_network`,
    `maintenance_network`,
  );
};

export const NetworkMaintenance = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_network WHERE id = ?`,
  );
};

export const deleteNetworkMaintenance = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_network WHERE id = ?`,
  );
};

export const createMaintenanceNetwork = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await createEntity(req, res, 'maintenance_network', 'NIMAI', columns);
};

export const updateNetworkMaintenance = async (req: Request, res: Response) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_network', columns);
};
