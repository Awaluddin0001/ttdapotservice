import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import {
  createRowNetwork,
  updateRowNetwork,
} from '../utils/CreatePutDataNetwork';

export const allComputer = async (req: Request, res: Response) => {
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
    FROM computer t
    LEFT JOIN network_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_network m ON t.maintenance_id = m.id
    LEFT JOIN network_it el ON t.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id`,
    `computer`,
  );
};

export const Computer = async (req: Request, res: Response) => {
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
    FROM computer t
    LEFT JOIN network_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_network m ON t.maintenance_id = m.id
    LEFT JOIN network_it el ON t.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createComputer = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'display',
    'keyboard',
    'mouse',
    'motherboard',
    'case',
    'processor',
    'vga',
    'hardisk',
    'ram',
    'cooling',
    'power_supply',
    'maintenance_id',
    'installation_date',
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
    'computer',
    'NICOM',
    deviceColumns,
    electricalColumns,
  );
};

export const updateComputer = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'display',
    'keyboard',
    'mouse',
    'motherboard',
    'case',
    'processor',
    'vga',
    'hardisk',
    'ram',
    'cooling',
    'power_supply',
    'maintenance_id',
    'installation_date',
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
  await updateRowNetwork(
    req,
    res,
    'computer',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteComputer = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM network_it WHERE category_id = ?`,
    `DELETE FROM computer WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};
