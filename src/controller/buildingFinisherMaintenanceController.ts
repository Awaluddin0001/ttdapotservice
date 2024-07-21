import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allbuildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM maintenance_building_finisher`,
    `maintenance_building_finisher`,
  );
};

export const buildingfinisherMaintenance = async (
  req: Request,
  res: Response,
) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
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
    connectMySQL,
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
