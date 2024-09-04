import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { createRowac, updateRowac } from '@/utils/CreatePutDataAir';
import { exportBigDeviceRows } from '@/utils/exportData';

export const allHeater = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.temperature_max`,
      `cas.power`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.amount as amount`,
      `ca.waranty as waranty`,
      `ca.condition_asset`,
    ],
    `air_conditioning`,
    `air_conditioning_heating_device`,
  );
};

export const exportAirCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.temperature_max`,
      `cas.power`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `air_conditioning`,
    `air_conditioning_heating_device`,
    `csv`,
  );
};
export const exportAirXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.temperature_max`,
      `cas.power`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `air_conditioning`,
    `air_conditioning_heating_device`,
    `xlsx`,
  );
};

export const Heater = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id, 
        r.name,
        r.temperature_max,
        r.power,
        DATE_FORMAT(el.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        m.activity AS maintenance_activity,
        m.document_name AS maintenance_document,
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        el.id as asset_id,
        el.waranty as waranty,
        el.amount as amount,
        el.ne_id as ne_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.status as status,
        el.condition_asset,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name
      FROM air_conditioning_heating_device r
      LEFT JOIN air_conditioning el ON r.id = el.device_id
      LEFT JOIN air_conditioning_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN air_conditioning_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
    WHERE r.id = ?`,
  );
};

export const createHeater = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    `temperature_max`,
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `waranty`,
    `amount`,
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowac(
    req,
    res,
    'air_conditioning_heating_device',
    'ACHEA',
    deviceColumns,
    electricalColumns,
  );
};

export const updateHeater = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    `temperature_max`,
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `waranty`,
    `amount`,
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRowac(
    req,
    res,
    'air_conditioning_heating_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteHeater = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning WHERE device_id = ?`,
    `DELETE FROM air_conditioning_heating_device WHERE id = ?`,
    `DELETE FROM air_conditioning_photo WHERE asset_id = ?`,
    `air_conditioning`,
    `air_conditioning_photo`,
  );
};
