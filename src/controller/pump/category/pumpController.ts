import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import { createRowPump, updateRowPump } from '@/utils/CreatePutDataPump';

export const allPump = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
                    ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM pump_device r
    LEFT JOIN pump_brand b ON r.brand_id = b.id
    LEFT JOIN pump_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_pump m ON r.maintenance_id = m.id
        LEFT JOIN pump el ON r.id = el.device_id
    LEFT JOIN pump_photo ep ON el.id = ep.asset_id`,
  );
};

export const Pump = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
                    ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM pump_device r
    LEFT JOIN pump_brand b ON r.brand_id = b.id
    LEFT JOIN pump_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_pump m ON r.maintenance_id = m.id
        LEFT JOIN pump el ON r.id = el.device_id
    LEFT JOIN pump_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createPump = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'water_flow',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    'maintenance_id',
    'installation_date',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowPump(
    req,
    res,
    'pump_device',
    'PUDEV',
    deviceColumns,
    electricalColumns,
  );
};

export const updatePump = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'water_flow',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    'maintenance_id',
    'installation_date',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowPump(
    req,
    res,
    'pump_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deletePump = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM pump WHERE device_id = ?`,
    `DELETE FROM pump_device WHERE id = ?`,
    `DELETE FROM pump_photo WHERE asset_id = ?`,
    `pump`,
  );
};
