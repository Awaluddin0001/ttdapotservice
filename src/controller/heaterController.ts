import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createRowac, updateRowac } from '../utils/CreatePutDataAir';

export const allHeater = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
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
    FROM heating_device t
    LEFT JOIN air_conditioning_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_ac m ON t.maintenance_id = m.id
    LEFT JOIN air_conditioning el ON t.id = el.device_id
    LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id`,
    `heating_device`,
  );
};

export const Heater = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
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
    FROM heating_device t
    LEFT JOIN air_conditioning_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_ac m ON t.maintenance_id = m.id
    LEFT JOIN air_conditioning el ON t.id = el.device_id
    LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createHeater = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'temperature_max',
    'power',
  ];
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
  await createRowac(
    req,
    res,
    'heating_device',
    'ACHEA',
    deviceColumns,
    electricalColumns,
  );
};

export const updateHeater = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'temperature_max',
    'power',
  ];
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
  await updateRowac(
    req,
    res,
    'heating_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteHeater = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM air_conditioning WHERE device_id = ?`,
    `DELETE FROM heating_device WHERE id = ?`,
    `DELETE FROM air_conditioning_photo WHERE asset_id = ?`,
    `air_conditioning`,
  );
};
