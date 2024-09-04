import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const budildingTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name, sc.name as category_name  FROM building_finishes_type as cas  LEFT JOIN building_finishes_sub_category sc ON sc.id = cas.sub_category_id`,
  );
};

export const budildingType = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, sc.name as category_name FROM building_finishes_type as cas LEFT JOIN building_finishes_sub_category sc ON sc.id = cas.sub_category_id WHERE cas.id = ?`,
  );
};

export const createBudildingType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await createEntity(req, res, 'building_finishes_type', 'ELTYP', columns);
};

export const updateBudildingType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await updateEntity(req, res, 'building_finishes_type', columns);
};

export const deleteBudildingType = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM building_finishes_type WHERE id = ?`,
  );
};

export const budildingSubCategories = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM building_finishes_sub_category`,
    true,
  );
};
