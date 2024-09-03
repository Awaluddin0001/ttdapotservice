import pool from '@/config/mySql';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

import { deleteRow } from '@/utils/deleteData';
import { getRowQuery } from '@/utils/getData';
import { Request, Response } from 'express';

export const securityBrands = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT cas.*, u.name as user_name FROM security_brand as cas`,
  );
};

export const securityBrand = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT * FROM security_brand WHERE id = ?`,
  );
};

export const createSecurityBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'security_brand', 'SEBRA', columns);
};

export const updateSecurityBrand = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'security_brand', columns);
};

export const deleteSecurityBrand = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM security_brand WHERE id = ?`);
};
