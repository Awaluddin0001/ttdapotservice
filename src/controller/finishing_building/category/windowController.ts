import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { exportBigDeviceRows } from '@/utils/exportData';
import {
  createRowBuildingFinish,
  updateRowbuildingFinish,
} from '@/utils/CreatePutDataBuildingFinisher';

export const allWindow = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.type_id`,
      `cas.good`,
      `cas.broke`,
      `cas.amount`,
      `b.name AS brand_name`,
      `t.name AS type_name`,
    ],
    `building_finishes`,
    `building_finishes_window`,
    [
      `LEFT JOIN building_finishes_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN building_finishes_type t ON cas.type_id = t.id`,
    ],
  );
};
export const exportWindowCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.type_id`,
      `cas.good`,
      `cas.broke`,
      `cas.amount`,
      `b.name AS brand_name`,
      `t.name AS type_name`,
    ],
    `building_finishes`,
    `building_finishes_window`,
    `csv`,
    [
      `LEFT JOIN building_finishes_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN building_finishes_type t ON cas.type_id = t.id`,
    ],
  );
};
export const exportWindowXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.type_id`,
      `cas.good`,
      `cas.broke`,
      `cas.amount`,
      `b.name AS brand_name`,
      `t.name AS type_name`,
    ],
    `building_finishes`,
    `building_finishes_window`,
    `xlsx`,
    [
      `LEFT JOIN building_finishes_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN building_finishes_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Window = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.brand_id,
        r.type_id,
        r.good,
        r.broke,
        r.amount,
        DATE_FORMAT(el.installation_date, "%Y-%m-%d") AS installation_date, 
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
        el.id as asset_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        ty.name as type_name,
        ty.id as type_id
      FROM building_finishes_window r
      LEFT JOIN building_finishes_brand b ON r.brand_id = b.id
      LEFT JOIN building_finishes el ON r.id = el.device_id
      LEFT JOIN building_finishes_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN building_finishes_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN building_finishes_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN building_finishes_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createWindow = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    `good`,
    `broke`,
    `amount`,
  ];
  const building_finishesColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'sub_category_id',
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowBuildingFinish(
    req,
    res,
    'building_finishes_window',
    'BFWIN',
    deviceColumns,
    building_finishesColumns,
  );
};

export const updateWindow = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    `good`,
    `broke`,
    `amount`,
  ];
  const building_finishesColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'sub_category_id',
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRowbuildingFinish(
    req,
    res,
    'building_finishes_window',
    deviceColumns,
    building_finishesColumns,
  );
};

export const deleteWindow = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM building_finishes WHERE device_id = ?`,
    `DELETE FROM building_finishes_window WHERE id = ?`,
    `DELETE FROM building_finishes_photo WHERE asset_id = ?`,
    `building_finishes`,
    `building_finishes_photo`,
  );
};
