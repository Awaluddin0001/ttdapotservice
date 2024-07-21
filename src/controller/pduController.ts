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

export const allPdu = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          p.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(p.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(p.created_at, "%Y-%m-%d") AS created_at
    FROM pdu p
    LEFT JOIN pdu_brand b ON p.brand_id = b.id
    LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
    LEFT JOIN user u ON p.user_id = u.id
    LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id
    LEFT JOIN electrical el ON p.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
    `pdu`,
  );
};

export const Pdu = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          p.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(p.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(p.created_at, "%Y-%m-%d") AS created_at
    FROM pdu p
    LEFT JOIN pdu_brand b ON p.brand_id = b.id
    LEFT JOIN electrical_vendor v ON p.vendor_id = v.id
    LEFT JOIN user u ON p.user_id = u.id
    LEFT JOIN maintenance_electrical m ON p.maintenance_id = m.id
    LEFT JOIN electrical el ON p.id = el.device_id
    LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
    WHERE g.id = ?`,
  );
};

export const createPdu = async (req: Request, res: Response) => {
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
    'breaker_count',
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
  await createRow(req, res, 'pdu', 'ELPDU', deviceColumns, electricalColumns);
};

export const updatePdu = async (req: Request, res: Response) => {
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
    'breaker_count',
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
  await updateRow(req, res, 'pdu', deviceColumns, electricalColumns);
};

export const deletePdu = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM pdu WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};

export const allBrandPdu = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM pdu_brand`,
    `pdu_brand`,
  );
};

export const brandPdu = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM pdu_brand WHERE id = ?`,
  );
};

export const createBrandPdu = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'pdu_brand', 'ELPBR', columns);
};

export const updateBrandPdu = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'pdu_brand', columns);
};

export const deleteBrandPdu = async (req: Request, res: Response) => {
  await deleteRow(req, res, connectMySQL, `DELETE FROM pdu_brand WHERE id = ?`);
};
