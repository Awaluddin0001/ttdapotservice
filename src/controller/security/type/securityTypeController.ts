import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const securityTypes = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name, sc.name as category_name  FROM security_type as cas  LEFT JOIN security_sub_category sc ON sc.id = cas.sub_category_id`,
  );
};

export const securityType = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, sc.name as category_name FROM security_type as cas LEFT JOIN security_sub_category sc ON sc.id = cas.sub_category_id WHERE cas.id = ?`,
  );
};

export const createSecurityType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await createEntity(req, res, 'security_type', 'ELTYP', columns);
};

export const updateSecurityType = async (req: Request, res: Response) => {
  const columns = ['name', 'sub_category_id'];
  await updateEntity(req, res, 'security_type', columns);
};

export const deleteSecurityType = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM security_type WHERE id = ?`);
};

export const securitySubCategories = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM security_sub_category`,
    true,
  );
};
