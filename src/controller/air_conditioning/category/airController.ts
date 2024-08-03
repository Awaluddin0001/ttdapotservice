import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { createRowac, updateRowac } from '@/utils/CreatePutDataAir';

export const allAir = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.type_id`,
      `cas.brand_id`,
      `cas.air_flow`,
      `cas.speed`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `air_conditioning`,
    `air_conditioning_air_device`,
    [
      `LEFT JOIN air_conditioning_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN air_conditioning_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Air = async (req: Request, res: Response) => {
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
    FROM air_device r
    LEFT JOIN air_brand b ON r.brand_id = b.id
    LEFT JOIN air_conditioning_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_ac m ON r.maintenance_id = m.id
    LEFT JOIN air_conditioning el ON r.id = el.device_id
    LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createAir = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'air_flow',
    'speed',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await createRowac(
    req,
    res,
    'air_device',
    'ACAIR',
    deviceColumns,
    electricalColumns,
  );
};

export const updateAir = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'air_flow',
    'speed',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await updateRowac(req, res, 'air_device', deviceColumns, electricalColumns);
};

export const deleteAir = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning WHERE device_id = ?`,
    `DELETE FROM air_device WHERE id = ?`,
    `DELETE FROM air_conditioning_photo WHERE asset_id = ?`,
    `air_conditioning`,
  );
};
