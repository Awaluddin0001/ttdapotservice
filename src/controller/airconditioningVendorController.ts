import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allairconditioningVendor = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM air_conditioning_vendor`,
    `air_conditioning_vendor`,
  );
};

export const airconditioningVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM air_conditioning_vendor WHERE id = ?`,
  );
};

export const deleteairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM air_conditioning_vendor WHERE id = ?`,
  );
};

export const createairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'air_conditioning_vendor', 'ACVEN', columns);
};

export const updateairconditioningVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'air_conditioning_vendor', columns);
};
