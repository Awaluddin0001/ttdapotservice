import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allFurniture = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM furniture`,
    `furniture`,
  );
};

export const Furniture = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM furniture WHERE id = ?`,
  );
};

export const deleteFurniture = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM furniture WHERE id = ?`,
    `DELETE FROM furniture_photo WHERE asset_id = ?`,
    `furniture`,
  );
};

export const createFurniture = async (req: Request, res: Response) => {
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
    'furniture',
    'FU',
    columns,
    'furniture',
    'FUPHO',
    'furniture_photo',
  );
};

export const updateFurniture = async (req: Request, res: Response) => {
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
    'furniture',
    columns,
    'furniture',
    'FUPHO',
    'furniture_photo',
  );
};
