import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';
import {
  createRowSecurity,
  updateRowSeurity,
} from '../utils/CreatePutDataSecurity';

export const allSound = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
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
    FROM sound r
    LEFT JOIN sound_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
        LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id`,
  );
};

export const Sound = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
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
    FROM sound r
    LEFT JOIN sound_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
        LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createSound = async (req: Request, res: Response) => {
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
    'sound',
    'SESOU',
    deviceColumns,
    electricalColumns,
  );
};

export const updateSound = async (req: Request, res: Response) => {
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
  await updateRowSeurity(req, res, 'sound', deviceColumns, electricalColumns);
};

export const deleteSound = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM security WHERE device_id = ?`,
    `DELETE FROM sound WHERE id = ?`,
    `DELETE FROM security_photo WHERE asset_id = ?`,
    `security`,
  );
};

export const allBrandSound = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM sound_brand`);
};

export const brandSound = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM sound_brand WHERE id = ?`,
  );
};

export const createBrandSound = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'sound_brand', 'SOBBR', columns);
};

export const updateBrandSound = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'sound_brand', columns);
};

export const deleteBrandSound = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM sound_brand WHERE id = ?`,
  );
};
