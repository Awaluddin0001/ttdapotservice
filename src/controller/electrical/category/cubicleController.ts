import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { getAllRow, getOneRow } from '@/utils/getData';
import { createRow, updateRow } from '@/utils/CreatePutDataElectrical';
import { deleteCombinedRow } from '@/utils/deleteData';

export const allCubicle = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT 
    c.*, 
    v.company AS vendor_name, 
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    DATE_FORMAT(c.installation_date, "%Y-%m-%d") AS installation_date, 
    DATE_FORMAT(c.created_at, "%Y-%m-%d") AS created_at
  FROM cubicle c
  LEFT JOIN electrical_vendor v ON c.vendor_id = v.id
  LEFT JOIN user u ON c.user_id = u.id
  LEFT JOIN maintenance_electrical m ON c.maintenance_id = m.id
  LEFT JOIN electrical el ON c.id = el.device_id
  LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
    `cubicle`,
  );
};
export const Cubicle = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT 
    c.*, 
    v.company AS vendor_name, 
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    DATE_FORMAT(c.installation_date, "%Y-%m-%d") AS installation_date, 
    DATE_FORMAT(c.created_at, "%Y-%m-%d") AS created_at
  FROM cubicle c
  LEFT JOIN electrical_vendor v ON c.vendor_id = v.id
  LEFT JOIN user u ON c.user_id = u.id
  LEFT JOIN maintenance_electrical m ON c.maintenance_id = m.id
  LEFT JOIN electrical el ON c.id = el.device_id
  LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
          WHERE p.id = ?`,
  );
};

export const createCubicle = async (req: Request, res: Response) => {
  const deviceColumns = [
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `model`,
    `manufactur`,
    `transform_ratio`,
    `serial_number`,
    `load`,
    `breaker_count`,
  ];

  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];

  await createRow(
    req,
    res,
    'cubicle',
    'ELCUB',
    deviceColumns,
    electricalColumns,
  );
};

export const updateCubicle = async (req: Request, res: Response) => {
  const deviceColumns = [
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `model`,
    `manufactur`,
    `transform_ratio`,
    `serial_number`,
    `load`,
    `breaker_count`,
  ];

  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];

  await updateRow(req, res, 'cubicle', deviceColumns, electricalColumns);
};

export const deleteCubicle = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM cubicle WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};
