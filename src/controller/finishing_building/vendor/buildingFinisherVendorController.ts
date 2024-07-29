import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allbuildingfinishesVendor = async (
  req: Request,
  res: Response,
) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM building_finishes_vendor`,
    `building_finishes_vendor`,
  );
};

export const buildingfinishesVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT * FROM building_finishes_vendor WHERE id = ?`,
  );
};

export const deletebuildingfinishesVendor = async (
  req: Request,
  res: Response,
) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM building_finishes_vendor WHERE id = ?`,
  );
};

export const createbuildingfinishesVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'building_finishes_vendor', 'BFVEN', columns);
};

export const updatebuildingfinishesVendor = async (
  req: Request,
  res: Response,
) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'building_finishes_vendor', columns);
};
