import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';

import {
  createRowBuildingFinish,
  updateRowbuildingFinish,
} from '@/utils/CreatePutDataBuildingFinisher';

export const allmebel = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
          t.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
                              ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM mebel t
    LEFT JOIN building_finishes_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_building_finisher m ON t.maintenance_id = m.id
    LEFT JOIN building_finishes el ON t.id = el.category_id
    LEFT JOIN building_finishes_photo ep ON el.id = ep.asset_id`,
  );
};

export const mebel = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          t.*, 
          v.company AS vendor_name, 
          u.name AS user_name,
                              ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM mebel t
    LEFT JOIN building_finishes_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_building_finisher m ON t.maintenance_id = m.id
    LEFT JOIN building_finishes el ON t.id = el.category_id
    LEFT JOIN building_finishes_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createmebel = async (req: Request, res: Response) => {
  const deviceColumns = ['vendor_id', 'user_id', 'name', 'type', 'color'];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowBuildingFinish(
    req,
    res,
    'mebel',
    'BFMEB',
    deviceColumns,
    electricalColumns,
  );
};

export const updatemebel = async (req: Request, res: Response) => {
  const deviceColumns = ['vendor_id', 'user_id', 'name', 'type', 'color'];

  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowbuildingFinish(
    req,
    res,
    'mebel',
    deviceColumns,
    electricalColumns,
  );
};

export const deletemebel = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM building_finishes WHERE category_id = ?`,
    `DELETE FROM mebel WHERE id = ?`,
    `DELETE FROM building_finishes_photo WHERE asset_id = ?`,
    `building_finishes`,
  );
};
