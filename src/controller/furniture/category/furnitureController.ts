import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import { getBigDeviceRow, getSmallAssetRows } from '@/utils/getData';
import { exportBigDeviceRows } from '@/utils/exportData';
import {
  createRowFurniture,
  updateRowFurniture,
} from '@/utils/CreatePutDataFurniture';

export const allFurniture = async (req: Request, res: Response) => {
  await getSmallAssetRows(
    req,
    res,
    pool,
    [
      `ca.amount as amount`,
      `ca.status as status`,
      `ca.condition_asset`,
      `ca.name`,
    ],
    `furniture`,
    [
      `LEFT JOIN furniture_brand b ON ca.brand_id = b.id`,
      `LEFT JOIN furniture_vendor v ON ca.vendor_id = v.id`,
    ],
  );
};

export const Furnitures = async (req: Request, res: Response) => {
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
      `ca.name as name`,
    ],
    `furniture`,
    [
      `LEFT JOIN furniture_brand b ON ca.brand_id = b.id`,
      `LEFT JOIN furniture_vendor v ON ca.vendor_id = v.id`,
    ],
  );
};

export const exportFurnitureCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `ca.brand_id`,
      `ca.name`,
      `b.name AS brand_name`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `furniture`,
    `furniture`,
    `csv`,
    [`LEFT JOIN furniture_brand b ON cas.brand_id = b.id`],
  );
};
export const exportFurnitureXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `ca.brand_id`,
      `ca.name`,
      `b.name AS brand_name`,
      `ca.status as status`,
      `ca.condition_asset`,
    ],
    `furniture`,
    `furniture`,
    `xlsx`,
    [`LEFT JOIN furniture_brand b ON cas.brand_id = b.id`],
  );
};

export const Furniture = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.vendor_id,
        r.brand_id,
        r.name,
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        r.id as id,
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
      FROM furniture r
      LEFT JOIN furniture_brand b ON r.brand_id = b.id
      LEFT JOIN furniture_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN furniture_photo ep ON r.id = ep.asset_id
      LEFT JOIN room rm ON r.room_id = rm.id
      LEFT JOIN floor fl ON r.floor_id = fl.id
      LEFT JOIN site st ON r.site_id = st.id
    WHERE r.id = ?`,
  );
};

export const createFurniture = async (req: Request, res: Response) => {
  const deviceColumns = ['brand_id', 'vendor_id', 'user_id', 'name'];
  const furnitureColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `amount`,
    `condition_asset`,
    'notes',
    'brand_id',
    'vendor_id',
    'user_id',
    'name',
  ];
  await createRowFurniture(
    req,
    res,
    'furniture',
    'FURNI',
    deviceColumns,
    furnitureColumns,
  );
};

export const updateFurniture = async (req: Request, res: Response) => {
  const deviceColumns = ['brand_id', 'vendor_id', 'user_id', 'name'];
  const furnitureColumns = [
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `amount`,
    `condition_asset`,
    'notes',
    'name',
    'user_id',
  ];
  await updateRowFurniture(
    req,
    res,
    'furniture',
    deviceColumns,
    furnitureColumns,
  );
};

export const deleteFurniture = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM furniture WHERE id = ?`,
    `DELETE FROM furniture WHERE id = ?`,
    `DELETE FROM furniture_photo WHERE asset_id = ?`,
    `furniture`,
    `furniture_photo`,
  );
};
