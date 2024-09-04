import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const buildingFinishesBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM building_finishes_brand as cas`,
  );
};

export const buildingFinishesBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM building_finishes_brand WHERE id = ?`,
  );
};

export const createBuildingFinishesBrand = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name'];
  await createEntity(req, res, 'building_finishes_brand', 'BFBRA', columns);
};

export const updateBuildingFinishesBrand = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name'];
  await updateEntity(req, res, 'building_finishes_brand', columns);
};

export const deleteBuildingFinishesBrand = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM building_finishes_brand WHERE id = ?`,
  );
};
