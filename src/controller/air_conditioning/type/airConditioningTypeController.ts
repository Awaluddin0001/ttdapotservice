import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const airConditioningTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name, sc.name as category_name  FROM air_conditioning_type as cas  LEFT JOIN air_conditioning_sub_category sc ON sc.id = cas.sub_category_id`,
  );
};

export const airConditioningType = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, sc.name as category_name FROM air_conditioning_type as cas LEFT JOIN air_conditioning_sub_category sc ON sc.id = cas.sub_category_id WHERE cas.id = ?`,
  );
};

export const createAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name', 'sub_category_id'];
  await createEntity(req, res, 'air_conditioning_type', 'ACARA', columns);
};

export const updateAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  const columns = ['name', 'sub_category_id'];
  await updateEntity(req, res, 'air_conditioning_type', columns);
};

export const deleteAirConditioningType = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning_type WHERE id = ?`,
  );
};

export const airConditioningSubCategories = async (
  req: Request,
  res: Response,
) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM air_conditioning_sub_category`,
    true,
  );
};
