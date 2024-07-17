import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { format } from 'date-fns';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '../utils/makeIdTable';
import { getAllRow, getOneRow } from '../utils/getData';
import {
  createEntity,
  createRow,
  updateEntity,
  updateRow,
} from '../utils/CreatePutDataElectrical';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';

export const allUps = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT 
            up.*, 
            b.name AS brand_name, 
            v.company AS vendor_name, 
            u.name AS user_name,
            ep.foto1 AS photo1,
            ep.foto2 AS photo2,
            ep.foto3 AS photo3,
            DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
            DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
            DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
          FROM ups up
          LEFT JOIN ups_brand b ON up.brand_id = b.id
          LEFT JOIN electrical_vendor v ON up.vendor_id = v.id
          LEFT JOIN user u ON up.user_id = u.id
          LEFT JOIN maintenance_electrical m ON up.maintenance_id = m.id
          LEFT JOIN electrical el ON up.id = el.device_id
          LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
  );
};
export const Ups = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT 
            up.*, 
            b.name AS brand_name, 
            v.company AS vendor_name, 
            u.name AS user_name,
            ep.foto1 AS photo1,
            ep.foto2 AS photo2,
            ep.foto3 AS photo3,
            DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
            DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
            DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
          FROM ups up
          LEFT JOIN ups_brand b ON up.brand_id = b.id
          LEFT JOIN electrical_vendor v ON up.vendor_id = v.id
          LEFT JOIN user u ON up.user_id = u.id
          LEFT JOIN maintenance_electrical m ON up.maintenance_id = m.id
          LEFT JOIN electrical el ON up.id = el.device_id
          LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
          WHERE up.id = ?`,
  );
};

export const createUps = async (req: Request, res: Response) => {
  const deviceColumns = [
    `brand_id`,
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `type`,
    `capacity`,
    `load`,
    `serial_number`,
    `occupancy`,
    `type_modular`,
    `remark_aging`,
    `warranty`,
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
  await createRow(req, res, 'ups', 'ELUPS', deviceColumns, electricalColumns);
};

export const updateUps = async (req: Request, res: Response) => {
  const deviceColumns = [
    `brand_id`,
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `type`,
    `capacity`,
    `load`,
    `serial_number`,
    `occupancy`,
    `type_modular`,
    `remark_aging`,
    `warranty`,
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
  await updateRow(req, res, 'ups', deviceColumns, electricalColumns);
};

export const deleteUps = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM ups WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};

export const allBrandUps = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM ups_brand`);
};

export const brandUps = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM ups_brand WHERE id = ?`,
  );
};

export const createBrandUps = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'ups_brand', 'ELUBR', columns);
};

export const updateBrandUps = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'ups_brand', columns);
};

export const deleteBrandUps = async (req: Request, res: Response) => {
  await deleteRow(req, res, connectMySQL, `DELETE FROM ups_brand WHERE id = ?`);
};
