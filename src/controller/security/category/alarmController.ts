import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import { getAllRow, getOneRow } from '@/utils/getData';
import { createEntity, updateEntity } from '@/utils/CreatePutDataElectrical';
import {
  createRowSecurity,
  updateRowSecurity,
} from '@/utils/CreatePutDataSecurity';

export const allAlarm = async (req: Request, res: Response) => {
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
    FROM alarm r
    LEFT JOIN alarm_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id`,
    `alarm`,
  );
};

export const Alarm = async (req: Request, res: Response) => {
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
    FROM alarm r
    LEFT JOIN alarm_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createAlarm = async (req: Request, res: Response) => {
  const deviceColumns = ['brand_id', 'vendor_id', 'user_id', 'model', 'type'];
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
    'alarm',
    'SEALA',
    deviceColumns,
    electricalColumns,
  );
};

export const updateAlarm = async (req: Request, res: Response) => {
  const deviceColumns = ['brand_id', 'vendor_id', 'user_id', 'model', 'type'];
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
  await updateRowSecurity(req, res, 'alarm', deviceColumns, electricalColumns);
};

export const deleteAlarm = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM security WHERE device_id = ?`,
    `DELETE FROM alarm WHERE id = ?`,
    `DELETE FROM security_photo WHERE asset_id = ?`,
    `security`,
  );
};

export const allBrandAlarm = async (req: Request, res: Response) => {
  await getAllRow(req, res, pool, `SELECT * FROM alarm_brand`, `alarm_brand`);
};

export const brandAlarm = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM alarm_brand WHERE id = ?`);
};

export const createBrandAlarm = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'alarm_brand', 'SEABR', columns);
};

export const updateBrandAlarm = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'alarm_brand', columns);
};

export const deleteBrandAlarm = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM alarm_brand WHERE id = ?`);
};
