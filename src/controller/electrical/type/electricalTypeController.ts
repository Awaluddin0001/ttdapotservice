import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const electricalTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name, sc.name as category_name  FROM electrical_type as cas  LEFT JOIN electrical_sub_category sc ON sc.id = cas.sub_category_id`,
  );
};

export const electricalType = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, sc.name as category_name FROM electrical_type as cas LEFT JOIN electrical_sub_category sc ON sc.id = cas.sub_category_id WHERE cas.id = ?`,
  );
};

export const createElectricalType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await createEntity(req, res, 'electrical_type', 'ELTYP', columns);
};

export const updateElectricalType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await updateEntity(req, res, 'electrical_type', columns);
};

export const deleteElectricalType = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM electrical_type WHERE id = ?`);
};

export const electricalSubCategories = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM electrical_sub_category`,
    true,
  );
};
