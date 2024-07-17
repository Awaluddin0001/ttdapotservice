import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import {
  createEntity,
  createRow,
  updateRow,
  updateEntity,
} from '../utils/CreatePutDataElectrical';

export const allGenset = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          g.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM genset g
    LEFT JOIN genset_brand b ON g.brand_id = b.id
    LEFT JOIN electrical_vendor v ON g.vendor_id = v.id
    LEFT JOIN user u ON g.user_id = u.id
    LEFT JOIN maintenance_electrical m ON g.maintenance_id = m.id
    LEFT JOIN electrical el ON g.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
  );
};

export const Genset = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          g.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM genset g
    LEFT JOIN genset_brand b ON g.brand_id = b.id
    LEFT JOIN electrical_vendor v ON g.vendor_id = v.id
    LEFT JOIN user u ON g.user_id = u.id
    LEFT JOIN maintenance_electrical m ON g.maintenance_id = m.id
    LEFT JOIN electrical el ON g.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
    WHERE g.id = ?`,
  );
};

export const createGenset = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'model',
    'manufactur',
    'serial_number',
    'load',
    'fuel',
    'fuel_capacity',
    'runtime',
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
  await createRow(
    req,
    res,
    'genset',
    'ELGEN',
    deviceColumns,
    electricalColumns,
  );
};

export const updateGenset = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'model',
    'manufactur',
    'serial_number',
    'load',
    'fuel',
    'fuel_capacity',
    'runtime',
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
  ];
  await updateRow(req, res, 'genset', deviceColumns, electricalColumns);
};

export const deleteGenset = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM genset WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};

export const allBrandGenset = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM genset_brand`);
};

export const brandGenset = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM genset_brand WHERE id = ?`,
  );
};

export const createBrandGenset = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'genset_brand', 'ELGBR', columns);
};

export const updateBrandGenset = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'genset_brand', columns);
};

export const deleteBrandGenset = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM genset_brand WHERE id = ?`,
  );
};
