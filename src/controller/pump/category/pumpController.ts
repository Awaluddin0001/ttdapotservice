import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
  getBigAssetRows,
  getSmallAssetRows,
} from '@/utils/getData';
import { exportBigDeviceRows } from '@/utils/exportData';
import { createRowPump, updateRowPump } from '@/utils/CreatePutDataPump';

export const allPump = async (req: Request, res: Response) => {
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
      `t.water_flow`,
      `t.power`,
    ],
    `pump`,
    [
      `LEFT JOIN pump_device t ON ca.device_id = t.id`,
      `LEFT JOIN pump_brand b ON t.brand_id = b.id`,
      `LEFT JOIN pump_vendor v ON t.vendor_id = v.id`,
    ],
  );
};

export const Pumps = async (req: Request, res: Response) => {
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
      `d.water_flow as water_flow`,
      `d.power as power`,
    ],
    `pump`,
    [
      `LEFT JOIN pump_device d ON ca.device_id = d.id`,
      `LEFT JOIN pump_brand b ON d.brand_id = b.id`,
      `LEFT JOIN pump_vendor v ON d.vendor_id = v.id`,
    ],
  );
};

export const exportPumpCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.model`,
      `cas.water_flow`,
      `cas.power`,
      `cas.warranty`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `pump`,
    `pump_device`,
    `csv`,
    [`LEFT JOIN pump_brand b ON cas.brand_id = b.id`],
  );
};
export const exportPumpXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.model`,
      `cas.water_flow`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `pump`,
    `pump_device`,
    `xlsx`,
    [`LEFT JOIN pump_brand b ON cas.brand_id = b.id`],
  );
};

export const Pump = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        d.vendor_id,
        d.brand_id,
        d.name,
        d.model,
        d.water_flow,
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
      FROM pump r
      LEFT JOIN pump_device d ON r.device_id = d.id
      LEFT JOIN pump_brand b ON d.brand_id = b.id
      LEFT JOIN pump_vendor v ON d.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN pump_maintenance m ON r.maintenance_id = m.id
      LEFT JOIN pump_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
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
  const pumpColumns = [
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
  await createRowPump(
    req,
    res,
    'pump_device',
    'PUMP',
    deviceColumns,
    pumpColumns,
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
  const pumpColumns = [
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
  await updateRowPump(req, res, 'pump_device', deviceColumns, pumpColumns);
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
    `pump_photo`,
  );
};
