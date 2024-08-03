import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import {
  createRowConveyance,
  updateRowConveyance,
} from '@/utils/CreatePutDataConveyance';

export const allConveyance = async (req: Request, res: Response) => {
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
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM conveyance_type t
    LEFT JOIN conveyance_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_conveyance m ON t.maintenance_id = m.id
    LEFT JOIN conveyance el ON t.id = el.type_id
    LEFT JOIN conveyance_photo ep ON el.id = ep.asset_id`,
  );
};

export const Conveyance = async (req: Request, res: Response) => {
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
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM conveyance_type t
    LEFT JOIN conveyance_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_conveyance m ON t.maintenance_id = m.id
    LEFT JOIN conveyance el ON t.id = el.type_id
    LEFT JOIN conveyance_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createConveyance = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type',
    'power',
    'capacity',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowConveyance(
    req,
    res,
    'conveyance_type',
    'COTYP',
    deviceColumns,
    electricalColumns,
  );
};

export const updateConveyance = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type',
    'power',
    'capacity',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowConveyance(
    req,
    res,
    'conveyance_type',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteConveyance = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM conveyance WHERE device_id = ?`,
    `DELETE FROM conveyance_type WHERE id = ?`,
    `DELETE FROM conveyance_photo WHERE asset_id = ?`,
    `conveyance`,
  );
};
