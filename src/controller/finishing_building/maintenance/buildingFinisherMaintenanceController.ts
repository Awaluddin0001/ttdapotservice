import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allbuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_building_finisher`,
  );
};

export const buildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT * FROM maintenance_building_finisher WHERE id = ?`,
  );
};

export const deletebuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM maintenance_building_finisher WHERE id = ?`,
  );
};

export const createMaintenancebuildingfinisher = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await createEntity(
    req,
    res,
    'maintenance_building_finisher',
    'COMAI',
    columns,
  );
};

export const updatebuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`, `document_name`];
  await updateEntity(req, res, 'maintenance_building_finisher', columns);
};
