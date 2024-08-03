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
  createRowNetwork,
  updateRowNetwork,
} from '@/utils/CreatePutDataNetwork';

export const allStorage = async (req: Request, res: Response) => {
  await getRowQuery(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          rs.id AS rack_server_id,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM storage r
    LEFT JOIN storage_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id`,
  );
};

export const Storage = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          rs.id AS rack_server_id,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM storage r
    LEFT JOIN storage_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createStorage = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'rack_server_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'capacity',
    'model',
    'manufactur',
    'position_unit',
    'port',
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowNetwork(
    req,
    res,
    'storage',
    'NISTO',
    deviceColumns,
    electricalColumns,
  );
};

export const updateStorage = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'rack_server_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'capacity',
    'model',
    'manufactur',
    'position_unit',
    'port',
    `power`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowNetwork(req, res, 'storage', deviceColumns, electricalColumns);
};

export const deleteStorage = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM network_it WHERE device_id = ?`,
    `DELETE FROM storage WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};
