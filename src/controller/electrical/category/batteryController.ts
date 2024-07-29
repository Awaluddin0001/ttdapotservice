import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { format } from 'date-fns';
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type
import moment from 'moment-timezone';
import { makeIdTable } from '@/utils/idManipulation';
import { getAllRow, getOneRow } from '@/utils/getData';
import {
  createEntity,
  createRow,
  updateEntity,
  updateRow,
} from '@/utils/CreatePutDataElectrical';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';

export const allBattery = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT 
            ba.*, 
            b.name AS brand_name, 
            v.company AS vendor_name, 
            u.name AS user_name,
            ep.foto1 AS photo1,
            ep.foto2 AS photo2,
            ep.foto3 AS photo3,
            DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
            DATE_FORMAT(ba.installation_date, "%Y-%m-%d") AS installation_date, 
            DATE_FORMAT(ba.created_at, "%Y-%m-%d") AS created_at
          FROM battery ba
          LEFT JOIN battery_brand b ON ba.brand_id = b.id
          LEFT JOIN electrical_vendor v ON ba.vendor_id = v.id
          LEFT JOIN user u ON ba.user_id = u.id
          LEFT JOIN maintenance_electrical m ON ba.maintenance_id = m.id
          LEFT JOIN electrical el ON ba.id = el.device_id
          LEFT JOIN electrical_photo ep ON el.id = ep.asset_id`,
    `battery`,
  );
};
export const Battery = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT 
          ba.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(ba.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(ba.created_at, "%Y-%m-%d") AS created_at
        FROM battery ba
        LEFT JOIN battery_brand b ON ba.brand_id = b.id
        LEFT JOIN electrical_vendor v ON ba.vendor_id = v.id
        LEFT JOIN user u ON ba.user_id = u.id
        LEFT JOIN maintenance_electrical m ON ba.maintenance_id = m.id
        LEFT JOIN electrical el ON ba.id = el.device_id
        LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
        WHERE ba.id = ?`,
  );
};

export const createBattery = async (req: Request, res: Response) => {
  const deviceColumns = [
    `brand_id`,
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `type`,
    `capacity`,
    `capacity_bank`,
    `amount`,
    `bank_amount`,
    `\`system\``,
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
  await createRow(
    req,
    res,
    'battery',
    'ELBAT',
    deviceColumns,
    electricalColumns,
  );
};

export const updateBattery = async (req: Request, res: Response) => {
  const deviceColumns = [
    `brand_id`,
    `vendor_id`,
    `user_id`,
    `maintenance_id`,
    `installation_date`,
    `name`,
    `type`,
    `capacity`,
    `capacity_bank`,
    `amount`,
    `bank_amount`,
    `\`system\``,
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
  await updateRow(req, res, 'battery', deviceColumns, electricalColumns);
};

export const deleteBattery = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM battery WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
  );
};

export const allBrandBattery = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM battery_brand`,
    `battery_brand`,
  );
};

export const brandBattery = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM battery_brand WHERE id = ?`);
};

export const createBrandBattery = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'battery_brand', 'ELBBR', columns);
};

export const updateBrandBattery = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'battery_brand', columns);
};

export const deleteBrandBattery = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM battery_brand WHERE id = ?`);
};
