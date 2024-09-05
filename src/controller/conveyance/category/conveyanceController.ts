import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRow, getSmallAssetRows } from '@/utils/getData';
import { createRow, updateRow } from '@/utils/CreatePutDataElectrical';
import { exportBigDeviceRows, exportData } from '@/utils/exportData';
import {
  createRowConveyance,
  updateRowConveyance,
} from '@/utils/CreatePutDataConveyance';

export const allConveyance = async (req: Request, res: Response) => {
  await getSmallAssetRows(
    req,
    res,
    pool,
    [
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.name as name`,
      `ca.amount as amount`,
      `b.name as brand_name`,
      `t.name as type_name`,
      `t.id as type_id`,
      `v.company AS vendor_name`,
    ],
    `conveyance`,
    [
      `LEFT JOIN conveyance_brand b ON ca.brand_id = b.id`,
      `LEFT JOIN conveyance_type t ON ca.type_id = t.id`,
      `LEFT JOIN conveyance_vendor v ON ca.vendor_id = v.id`,
    ],
  );
};
export const exportConveyanceCsv = async (req: Request, res: Response) => {
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
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `conveyance`,
    `conveyance`,
    `csv`,
    [
      `LEFT JOIN conveyance_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN conveyance_type t ON cas.type_id = t.id`,
      `LEFT JOIN conveyance_link lk ON ca.link_id = lk.id`,
    ],
  );
};
export const exportConveyanceXlsx = async (req: Request, res: Response) => {
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
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `conveyance`,
    `conveyance`,
    `xlsx`,
    [
      `LEFT JOIN conveyance_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN conveyance_type t ON cas.type_id = t.id`,
      `LEFT JOIN conveyance_link lk ON ca.link_id = lk.id`,
    ],
  );
};

export const Conveyance = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.vendor_id,
        r.brand_id,
        r.name,
        r.amount,
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
        r.id as asset_id,
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
      FROM conveyance r
      LEFT JOIN conveyance_brand b ON r.brand_id = b.id
      LEFT JOIN conveyance_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN conveyance_maintenance m ON r.maintenance_id = m.id
      LEFT JOIN conveyance_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
      LEFT JOIN conveyance_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createConveyance = async (req: Request, res: Response) => {
  const deviceColumns = ['brand_id', 'vendor_id', 'user_id', 'name'];
  const conveyanceColumns = [
    'brand_id',
    'vendor_id',
    'type_id',
    'name',
    'amount',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowConveyance(
    req,
    res,
    'conveyance',
    'CONVE',
    deviceColumns,
    conveyanceColumns,
  );
};

export const updateConveyance = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'role',
    'type_id',
    'capacity',
    'modul',
    'capacity_modul',
    'load_current',
    'occupancy',
    'remark_aging',
    'warranty',
    `system_device`,
  ];
  const conveyanceColumns = [
    'brand_id',
    'vendor_id',
    'type_id',
    'name',
    'amount',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRowConveyance(
    req,
    res,
    'conveyance',
    deviceColumns,
    conveyanceColumns,
  );
};

export const deleteConveyance = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM conveyance WHERE id = ?`,
    `DELETE FROM conveyance WHERE id = ?`,
    `DELETE FROM conveyance_photo WHERE asset_id = ?`,
    `conveyance`,
    `conveyance_photo`,
  );
};
