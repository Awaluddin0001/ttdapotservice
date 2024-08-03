import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const airConditioningTypes = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM air_brand`);
};

export const airConditioningType = async (req: Request, res: Response) => {
  await getRowQuery(req, res, pool, `SELECT * FROM air_brand WHERE id = ?`);
};

export const createAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name'];
  await createEntity(req, res, 'air_brand', 'ACARA', columns);
};

export const updateAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name'];
  await updateEntity(req, res, 'air_brand', columns);
};

export const deleteAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(req, res, pool, `DELETE FROM air_brand WHERE id = ?`);
};
