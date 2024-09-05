import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
  getBigAssetRows,
} from '@/utils/getData';
import {
  createEntity,
  createRow,
  updateRow,
  updateEntity,
} from '@/utils/CreatePutDataElectrical';

export const allExtinguish = async (req: Request, res: Response) => {
  await getBigAssetRows(
    req,
    res,
    pool,
    [
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.device_id`,
    ],
    `extinguish`,
  );
};

export const Extinguishs = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          mo.name AS model_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM cylinder_device r
    LEFT JOIN cylinder_brand b ON r.brand_id = b.id
    LEFT JOIN cylinder_model mo ON r.model_id = mo.id
    LEFT JOIN extinguish_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_extinguish m ON r.maintenance_id = m.id
    LEFT JOIN extinguish el ON r.id = el.device_id
    LEFT JOIN extinguish_photo ep ON el.id = ep.asset_id`,
  );
};

export const Extinguish = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          mo.name AS model_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM cylinder_device r
    LEFT JOIN cylinder_brand b ON r.brand_id = b.id
    LEFT JOIN cylinder_model mo ON r.model_id = mo.id
    LEFT JOIN extinguish_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_extinguish m ON r.maintenance_id = m.id
    LEFT JOIN extinguish el ON r.id = el.device_id
    LEFT JOIN extinguish_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createExtinguish = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model_id',
    'name',
    'system_wiring',
    'extinguish_agent',
    'capacity',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRow(
    req,
    res,
    'cylinder_device',
    'EXDEV',
    deviceColumns,
    electricalColumns,
  );
};

export const updateExtinguish = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model_id',
    'name',
    'system_wiring',
    'extinguish_agent',
    'capacity',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRow(
    req,
    res,
    'cylinder_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteExtinguish = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM extinguish WHERE device_id = ?`,
    `DELETE FROM cylinder_device WHERE id = ?`,
    `DELETE FROM extinguish_photo WHERE asset_id = ?`,
    `extinguish`,
  );
};
