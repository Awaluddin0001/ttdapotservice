import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';
import {
  createRowSecurity,
  updateRowSeurity,
} from '../utils/CreatePutDataSecurity';

export const allDetektor = async (req: Request, res: Response) => {
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
    FROM detector r
    LEFT JOIN detector_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id`,
  );
};

export const Detektor = async (req: Request, res: Response) => {
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
    FROM detector r
    LEFT JOIN detector_brand b ON r.brand_id = b.id
    LEFT JOIN security_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_security m ON r.maintenance_id = m.id
    LEFT JOIN security el ON r.id = el.device_id
    LEFT JOIN security_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createDetektor = async (req: Request, res: Response) => {
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
    'detector',
    'SEDET',
    deviceColumns,
    electricalColumns,
  );
};

export const updateDetektor = async (req: Request, res: Response) => {
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
  await updateRowSeurity(
    req,
    res,
    'detector',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteDetektor = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM security WHERE device_id = ?`,
    `DELETE FROM detector WHERE id = ?`,
    `DELETE FROM security_photo WHERE asset_id = ?`,
    `security`,
  );
};

export const allBrandDetektor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM detector_brand`);
};

export const brandDetektor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM detector_brand WHERE id = ?`,
  );
};

export const createBrandDetektor = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'detector_brand', 'SEBBR', columns);
};

export const updateBrandDetektor = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'detector_brand', columns);
};

export const deleteBrandDetektor = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM detector_brand WHERE id = ?`,
  );
};
