import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { deleteRow } from '@/utils/deleteData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

export const allSafety = async (req: Request, res: Response) => {
  await getAllRow(req, res, pool, `SELECT * FROM safety`, `safety`);
};

export const Safety = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM safety WHERE id = ?`);
};

export const deleteSafety = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    pool,
    `DELETE FROM safety WHERE id = ?`,
    `DELETE FROM safety_photo WHERE asset_id = ?`,
    `safety`,
  );
};

export const createSafety = async (req: Request, res: Response) => {
  const columns = [
    `site_id`,
    `floor_id`,
    `room_id`,
    `vendor_id`,
    `name`,
    `\`status\``,
    `\`condition\``,
    `amount`,
    `notes`,
  ];
  await createEntity(
    req,
    res,
    'safety',
    'SA',
    columns,
    'safety',
    'SAPHO',
    'safety_photo',
  );
};

export const updateSafety = async (req: Request, res: Response) => {
  const columns = [
    `site_id`,
    `floor_id`,
    `room_id`,
    `vendor_id`,
    `name`,
    `\`status\``,
    `\`condition\``,
    `amount`,
    `notes`,
  ];
  await updateEntity(
    req,
    res,
    'safety',
    columns,
    'safety',
    'SAPHO',
    'safety_photo',
  );
};
