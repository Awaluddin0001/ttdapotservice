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
import {
  createEntity,
  createRow,
  updateRow,
  updateEntity,
} from '@/utils/CreatePutDataElectrical';
import { exportBigDeviceRows } from '@/utils/exportData';
import {
  createRowExtinguish,
  updateRowExtinguish,
} from '@/utils/CreatePutDataExtinguish';

export const allExtinguish = async (req: Request, res: Response) => {
  await getBigAssetRows(
    req,
    res,
    pool,
    [
      `ca.ne_id as ne_id`,
      `ca.amount as amount`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.device_id`,
    ],
    `extinguish`,
  );
};

export const Extinguishs = async (req: Request, res: Response) => {
  await getSmallAssetRows(
    req,
    res,
    pool,
    [
      `ca.status as status`,
      `ca.ne_id as ne_id`,
      `ca.condition_asset`,
      `ca.amount as amount`,
      `b.name as brand_name`,
      `t.name as type_name`,
      `t.id as type_id`,
      `v.company AS vendor_name`,
      `d.id as id`,
      `d.name as name`,
      `d.system_wiring as system_wiring`,
      `d.extinguish_agent as extinguish_agent`,
      `d.weight as weight`,
      `d.capacity as capacity`,
    ],
    `extinguish`,
    [
      `LEFT JOIN extinguish_device d ON ca.device_id = d.id`,
      `LEFT JOIN extinguish_brand b ON d.brand_id = b.id`,
      `LEFT JOIN extinguish_type t ON d.type_id = t.id`,
      `LEFT JOIN extinguish_vendor v ON d.vendor_id = v.id`,
    ],
  );
};

export const exportExtinguishCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.role`,
      `cas.type_id`,
      `cas.capacity`,
      `cas.modul`,
      `cas.capacity_modul`,
      `cas.load_current`,
      `cas.occupancy`,
      `cas.system_device`,
      `cas.remark_aging`,
      `cas.warranty`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `extinguish`,
    `extinguish_device`,
    `csv`,
    [
      `LEFT JOIN extinguish_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN extinguish_type t ON cas.type_id = t.id`,
    ],
  );
};
export const exportExtinguishXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.name`,
      `cas.role`,
      `cas.type_id`,
      `cas.capacity`,
      `cas.modul`,
      `cas.capacity_modul`,
      `cas.load_current`,
      `cas.occupancy`,
      `cas.system_device`,
      `cas.remark_aging`,
      `cas.warranty`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `extinguish`,
    `extinguish`,
    `xlsx`,
    [
      `LEFT JOIN extinguish_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN extinguish_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Extinguish = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        d.vendor_id,
        d.brand_id,
        d.name,
        d.system_wiring,
        d.extinguish_agent,
        d.weight,
        d.capacity,
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
        r.ne_id as ne_id,
        r.site_id as site_id,
        r.floor_id as floor_id,
        r.room_id as room_id,
        r.status as status,
        r.condition_asset,
        r.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        ty.name as type_name,
        ty.id as type_id
      FROM extinguish r
      LEFT JOIN extinguish_device d ON r.device_id = d.id
      LEFT JOIN extinguish_brand b ON d.brand_id = b.id
      LEFT JOIN extinguish_vendor v ON d.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN extinguish_maintenance m ON r.maintenance_id = m.id
      LEFT JOIN extinguish_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
      LEFT JOIN extinguish_type ty ON d.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createExtinguish = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'name',
    'system_wiring',
    'capacity',
    'extinguish_agent',
    'weight',
  ];
  const extinguishColumns = [
    'ne_id',
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
  await createRowExtinguish(
    req,
    res,
    'extinguish_device',
    'EXTIN',
    deviceColumns,
    extinguishColumns,
  );
};

export const updateExtinguish = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'name',
    'system_wiring',
    'capacity',
    'extinguish_agent',
    'weight',
  ];
  const extinguishColumns = [
    'ne_id',
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
  await updateRowExtinguish(
    req,
    res,
    'extinguish_device',
    deviceColumns,
    extinguishColumns,
  );
};

export const deleteExtinguish = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM extinguish WHERE device_id = ?`,
    `DELETE FROM extinguish_device WHERE id = ?`,
    `DELETE FROM extinguish_photo WHERE asset_id = ?`,
    `extinguish`,
    `extinguish_photo`,
  );
};
