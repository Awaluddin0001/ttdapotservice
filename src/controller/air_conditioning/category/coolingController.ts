import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { createRowac, updateRowac } from '@/utils/CreatePutDataAir';

export const allCooling = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.manufactur`,
      `cas.brand_id`,
      `cas.type_id`,
      `cas.indoor_sn`,
      `cas.type_indoor`,
      `cas.outdoor_sn`,
      `cas.type_outdoor`,
      `cas.paard_kracht`,
      `cas.btu_hour`,
      `cas.refrigerant`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `air_conditioning`,
    `air_conditioning_cooling_device`,
    [
      `LEFT JOIN air_conditioning_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN air_conditioning_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Cooling = async (req: Request, res: Response) => {
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
    FROM cooling_device r
    LEFT JOIN cooling_brand b ON r.brand_id = b.id
    LEFT JOIN cooling_model mo ON r.model_id = mo.id
    LEFT JOIN air_conditioning_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_ac m ON r.maintenance_id = m.id
    LEFT JOIN air_conditioning el ON r.id = el.device_id
    LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createCooling = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model_id',
    'name',
    'indoor_sn',
    'type_indoor',
    'outdoor_sn',
    'type_outdoor',
    'paard_kracht',
    'btu_hour',
    'refrigerant',
    'power',
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
  await createRowac(
    req,
    res,
    'cooling_device',
    'ACCOO',
    deviceColumns,
    electricalColumns,
  );
};

export const updateCooling = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model_id',
    'name',
    'indoor_sn',
    'type_indoor',
    'outdoor_sn',
    'type_outdoor',
    'paard_kracht',
    'btu_hour',
    'refrigerant',
    'power',
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
  await updateRowac(
    req,
    res,
    'cooling_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteCooling = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning WHERE device_id = ?`,
    `DELETE FROM cooling_device WHERE id = ?`,
    `DELETE FROM air_conditioning_photo WHERE asset_id = ?`,
    `air_conditioning`,
  );
};
