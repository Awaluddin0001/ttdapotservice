import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { createRow, updateRow } from '@/utils/CreatePutDataElectrical';

export const allLvmdp = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
          p.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(p.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(p.created_at, "%Y-%m-%d") AS created_at
    FROM lvmdp p
    LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
    LEFT JOIN user u ON p.user_id = u.id
    LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id
    LEFT JOIN electrical el ON p.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
  );
};

export const Lvmdp = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          p.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(p.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(p.created_at, "%Y-%m-%d") AS created_at
    FROM lvmdp p
    LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
    LEFT JOIN user u ON p.user_id = u.id
    LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id
    LEFT JOIN electrical el ON p.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
    WHERE g.id = ?`,
  );
};

export const createLvmdp = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'voltage_level',
    'current_rating',
    'breaker_type',
    'breaker_rating',
    'section',
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
  await createRow(req, res, 'pdu', 'ELPDU', deviceColumns, electricalColumns);
};

export const updateLvmdp = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'voltage_level',
    'current_rating',
    'breaker_type',
    'breaker_rating',
    'section',
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
  ];
  await updateRow(req, res, 'pdu', deviceColumns, electricalColumns);
};

export const deleteLvmdp = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM pdu WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};
