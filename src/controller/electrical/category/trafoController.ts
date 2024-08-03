import { Request, Response } from 'express';
import pool from '@/config/mySql';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { createRow, updateRow } from '@/utils/CreatePutDataElectrical';
import { deleteCombinedRow } from '@/utils/deleteData';

export const allTrafo = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
    t.*, 
    v.company AS vendor_name, 
    u.name AS user_name,
    ep.foto1 AS photo1,
    ep.foto2 AS photo2,
    ep.foto3 AS photo3,
    DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
    DATE_FORMAT(t.installation_date, "%Y-%m-%d") AS installation_date, 
    DATE_FORMAT(t.created_at, "%Y-%m-%d") AS created_at
  FROM trafo t
  LEFT JOIN electrical_vendor v ON t.vendor_id = v.id
  LEFT JOIN user u ON t.user_id = u.id
  LEFT JOIN maintenance_electrical m ON t.maintenance_id = m.id
      LEFT JOIN electrical el ON t.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
  );
};
export const Trafo = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          t.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(t.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(t.created_at, "%Y-%m-%d") AS created_at
          FROM trafo t
          LEFT JOIN electrical_vendor v ON t.vendor_id = v.id
          LEFT JOIN user u ON t.user_id = u.id
          LEFT JOIN maintenance_electrical m ON t.maintenance_id = m.id
          LEFT JOIN electrical el ON t.id = el.device_id
          LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
      WHERE p.id = ?`,
  );
};

export const createTrafo = async (req: Request, res: Response) => {
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

  await createRow(req, res, 'trafo', 'ELTRA', deviceColumns, electricalColumns);
};

export const updateTrafo = async (req: Request, res: Response) => {
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

  await updateRow(req, res, 'trafo', deviceColumns, electricalColumns);
};

export const deleteTrafo = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM trafo WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};
