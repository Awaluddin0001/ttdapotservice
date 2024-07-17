import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allFluidVendor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM fluid_vendor`);
};

export const FluidVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM fluid_vendor WHERE id = ?`,
  );
};

export const deleteFluidVendor = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM fluid_vendor WHERE id = ?`,
  );
};

export const createFluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'fluid_vendor', 'ELVEN', columns);
};

export const updateFluidVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'fluid_vendor', columns);
};
