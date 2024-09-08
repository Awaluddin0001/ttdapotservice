import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import { getBigDeviceRow, getSmallAssetRows } from '@/utils/getData';
import { exportBigDeviceRows } from '@/utils/exportData';
import {
  createRowLighting,
  updateRowLighting,
} from '@/utils/CreatePutDataLighting';

export const allLighting = async (req: Request, res: Response) => {
  await getSmallAssetRows(
    req,
    res,
    pool,
    [
      `ca.amount as amount`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.device_id`,
      `t.name`,
      `t.model`,
      `t.ampere`,
      `t.power`,
    ],
    `lighting`,
    [
      `LEFT JOIN lighting_device t ON ca.device_id = t.id`,
      `LEFT JOIN lighting_brand b ON t.brand_id = b.id`,
      `LEFT JOIN lighting_vendor v ON t.vendor_id = v.id`,
    ],
  );
};

export const Lightings = async (req: Request, res: Response) => {
  await getSmallAssetRows(
    req,
    res,
    pool,
    [
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.amount as amount`,
      `b.name as brand_name`,
      `v.company AS vendor_name`,
      `d.id as id`,
      `d.name as name`,
      `d.model as model`,
      `d.ampere as ampere`,
      `d.power as power`,
    ],
    `lighting`,
    [
      `LEFT JOIN lighting_device d ON ca.device_id = d.id`,
      `LEFT JOIN lighting_brand b ON d.brand_id = b.id`,
      `LEFT JOIN lighting_vendor v ON d.vendor_id = v.id`,
    ],
  );
};

export const exportLightingCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.model`,
      `cas.ampere`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `lighting`,
    `lighting_device`,
    `csv`,
    [`LEFT JOIN lighting_brand b ON cas.brand_id = b.id`],
  );
};
export const exportLightingXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.model`,
      `cas.ampere`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `lighting`,
    `lighting_device`,
    `xlsx`,
    [`LEFT JOIN lighting_brand b ON cas.brand_id = b.id`],
  );
};

export const Lighting = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        d.vendor_id,
        d.brand_id,
        d.name,
        d.model,
        d.ampere,
        d.power,
        DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        m.activity AS maintenance_activity,
        m.document_name AS maintenance_document,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        r.id as id,
        d.id as asset_id,
        r.amount as amount,
        r.site_id as site_id,
        r.floor_id as floor_id,
        r.room_id as room_id,
        r.status as status,
        r.condition_asset,
        r.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name
      FROM lighting r
      LEFT JOIN lighting_device d ON r.device_id = d.id
      LEFT JOIN lighting_brand b ON d.brand_id = b.id
      LEFT JOIN lighting_vendor v ON d.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN lighting_maintenance m ON r.maintenance_id = m.id
      LEFT JOIN lighting_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
    WHERE r.id = ?`,
  );
};

export const createLighting = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'ampere',
    'power',
  ];
  const lightingColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `amount`,
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowLighting(
    req,
    res,
    'lighting_device',
    'LIGHT',
    deviceColumns,
    lightingColumns,
  );
};

export const updateLighting = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'model',
    'ampere',
    'power',
  ];
  const lightingColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `amount`,
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRowLighting(
    req,
    res,
    'lighting_device',
    deviceColumns,
    lightingColumns,
  );
};

export const deleteLighting = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM lighting WHERE device_id = ?`,
    `DELETE FROM lighting_device WHERE id = ?`,
    `DELETE FROM lighting_photo WHERE asset_id = ?`,
    `lighting`,
    `lighting_photo`,
  );
};
