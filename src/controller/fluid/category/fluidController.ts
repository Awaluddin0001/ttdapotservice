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
import { createRowFluid, updateRowFluid } from '@/utils/CreatePutDataFluid';

export const allFluid = async (req: Request, res: Response) => {
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
      `t.type`,
      `t.fluid`,
      `t.capacity`,
    ],
    `fluid_tank`,
    [
      `LEFT JOIN fluid_tank_type t ON ca.device_id = t.id`,
      `LEFT JOIN fluid_tank_brand b ON t.brand_id = b.id`,
      `LEFT JOIN fluid_tank_vendor v ON t.vendor_id = v.id`,
    ],
  );
};

export const Fluids = async (req: Request, res: Response) => {
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
      `d.type as type`,
      `d.fluid as fluid`,
      `d.capacity as capacity`,
    ],
    `fluid_tank`,
    [
      `LEFT JOIN fluid_tank_type d ON ca.device_id = d.id`,
      `LEFT JOIN fluid_tank_brand b ON d.brand_id = b.id`,
      `LEFT JOIN fluid_tank_vendor v ON d.vendor_id = v.id`,
    ],
  );
};

export const exportFluidCsv = async (req: Request, res: Response) => {
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
    ],
    `fluid_tank`,
    `fluid_tank_type`,
    `csv`,
    [`LEFT JOIN fluid_tank_brand b ON cas.brand_id = b.id`],
  );
};
export const exportFluidXlsx = async (req: Request, res: Response) => {
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
    `fluid_tank`,
    `fluid_tank`,
    `xlsx`,
    [
      `LEFT JOIN fluid_tank_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN fluid_tank_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Fluid = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        d.vendor_id,
        d.brand_id,
        d.name,
        d.type,
        d.fluid,
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
        r.site_id as site_id,
        r.floor_id as floor_id,
        r.room_id as room_id,
        r.status as status,
        r.condition_asset,
        r.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name
      FROM fluid_tank r
      LEFT JOIN fluid_tank_type d ON r.device_id = d.id
      LEFT JOIN fluid_tank_brand b ON d.brand_id = b.id
      LEFT JOIN fluid_tank_vendor v ON d.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN fluid_tank_maintenance m ON r.maintenance_id = m.id
      LEFT JOIN fluid_tank_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
    WHERE r.id = ?`,
  );
};

export const createFluid = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'fluid',
    'type',
    'capacity',
  ];
  const fluidColumns = [
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
  await createRowFluid(
    req,
    res,
    'fluid_tank_type',
    'FLUID',
    deviceColumns,
    fluidColumns,
  );
};

export const updateFluid = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
    'fluid',
    'type',
    'capacity',
  ];
  const fluidColumns = [
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
  await updateRowFluid(
    req,
    res,
    'fluid_tank_type',
    deviceColumns,
    fluidColumns,
  );
};

export const deleteFluid = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM fluid_tank WHERE device_id = ?`,
    `DELETE FROM fluid_tank_type WHERE id = ?`,
    `DELETE FROM fluid_tank_photo WHERE asset_id = ?`,
    `fluid_tank`,
    `fluid_tank_photo`,
  );
};
