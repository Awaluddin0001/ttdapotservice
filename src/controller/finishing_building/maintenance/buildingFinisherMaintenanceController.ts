import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getRowQuery } from '@/utils/getData';
import { deleteRowDocument } from '@/utils/deleteData';
import {
  createEntityDocument,
  updateEntityDocument,
} from '@/utils/CreatePutDataElectrical';

export const allbuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM building_finishes_maintenance as cas`,
  );
};

export const buildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM building_finishes_maintenance WHERE id = ?`,
  );
};

export const deletebuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await deleteRowDocument(
    req,
    res,
    pool,
    `DELETE FROM building_finishes_maintenance WHERE id = ?`,
    `building_finishes`,
    `building_finishes_maintenance`,
  );
};

export const createMaintenancebuildingfinisher = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await createEntityDocument(
    req,
    res,
    'building_finishes_maintenance',
    'COMAI',
    columns,
    `building_finishes`,
  );
};

export const updatebuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  const columns = [`activity`];
  await updateEntityDocument(
    req,
    res,
    'building_finishes_maintenance',
    columns,
    `building_finishes`,
    `COMAI`,
  );
};
