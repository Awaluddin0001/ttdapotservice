import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import {
  createRowSecurity,
  updateRowSecurity,
} from '@/utils/CreatePutDataSecurity';

export const allCctv = async (req: Request, res: Response) => {
  await getRowQuery(
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
    FROM cctv r
    LEFT JOIN cctv_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id`,
  );
};

export const Cctv = async (req: Request, res: Response) => {
  await getBigDeviceRow(
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
    FROM cctv r
    LEFT JOIN cctv_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createCctv = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model',
    'type',
    'manufactur',
    'ip',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await createRowSecurity(
    req,
    res,
    'cctv',
    'SECCT',
    deviceColumns,
    electricalColumns,
  );
};

export const updateCctv = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'model',
    'type',
    'manufactur',
    'ip',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'maintenance_id',
    'installation_date',
    'notes',
    'user_id',
  ];
  await updateRowSecurity(req, res, 'cctv', deviceColumns, electricalColumns);
};

export const deleteCctv = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM security WHERE device_id = ?`,
    `DELETE FROM access_control WHERE id = ?`,
    `DELETE FROM security_photo WHERE asset_id = ?`,
    `security`,
  );
};
