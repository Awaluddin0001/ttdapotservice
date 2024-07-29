import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allFurnitureVendor = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM furniture_vendor`,
    `furniture_vendor`,
  );
};

export const FurnitureVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM furniture_vendor WHERE id = ?`,
  );
};

export const deleteFurnitureVendor = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM furniture_vendor WHERE id = ?`);
};

export const createFurnitureVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'furniture_vendor', 'FUVEN', columns);
};

export const updateFurnitureVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'furniture_vendor', columns);
};
