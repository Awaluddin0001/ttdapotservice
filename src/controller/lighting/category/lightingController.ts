import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import { getAllRow, getOneRow } from '@/utils/getData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';

import {
  createRowLighting,
  updateRowLighting,
} from '@/utils/CreatePutDataLighting';

export const allLighting = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
                    ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM lighting_device r
    LEFT JOIN lighting_brand b ON r.brand_id = b.id
    LEFT JOIN lighting_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_lighting m ON r.maintenance_id = m.id
    LEFT JOIN lighting el ON r.id = el.device_id
    LEFT JOIN lighting_photo ep ON el.id = ep.asset_id`,
    `lighting_device`,
  );
};

export const Lighting = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
                    ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM lighting_device r
    LEFT JOIN lighting_brand b ON r.brand_id = b.id
    LEFT JOIN lighting_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_lighting m ON r.maintenance_id = m.id
    LEFT JOIN lighting el ON r.id = el.device_id
    LEFT JOIN lighting_photo ep ON el.id = ep.asset_id
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
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    `\`amount\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await createRowLighting(
    req,
    res,
    'lighting_device',
    'LIDEV',
    deviceColumns,
    electricalColumns,
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
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `\`condition\``,
    `\`amount\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await updateRowLighting(
    req,
    res,
    'lighting_device',
    deviceColumns,
    electricalColumns,
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
  );
};

export const allBrandLighting = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM lighting_brand`,
    `lighting_brand`,
  );
};

export const brandLighting = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM ligting_brand WHERE id = ?`);
};

export const createBrandLighting = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'lighting_brand', 'LIBRA', columns);
};

export const updateBrandLighting = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'lighting_brand', columns);
};

export const deleteBrandLighting = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM lighting_brand WHERE id = ?`);
};
