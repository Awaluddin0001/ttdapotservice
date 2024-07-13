import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import {
  createEntity,
  createRow,
  updateRow,
  updateEntity,
} from '../utils/CreatePutData';

export const allRectifier = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM rectifier r
    LEFT JOIN rectifier_brand b ON r.brand_id = b.id
    LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_electrical m ON r.maintenance_id = m.id`,
  );
};

export const Rectifier = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM rectifier r
    LEFT JOIN rectifier_brand b ON r.brand_id = b.id
    LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_electrical m ON r.maintenance_id = m.id
    WHERE r.id = ?`,
  );
};

export const createRectifier = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'role',
    'type',
    'capacity',
    'modul',
    'capacity_modul',
    'load_current',
    'occupancy',
    'remark_aging',
    'warranty',
    `\`system\``,
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
    'rectifier',
    'ELREC',
    deviceColumns,
    electricalColumns,
  );
};

export const updateRectifier = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'role',
    'type',
    'capacity',
    'modul',
    'capacity_modul',
    'load_current',
    'occupancy',
    'remark_aging',
    'warranty',
    'system',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'condition',
    'notes',
  ];
  await updateRow(req, res, 'rectifier', deviceColumns, electricalColumns);
};

export const deleteRectifier = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM rectifier WHERE id = ?`,
  );
};

export const allBrandRecti = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM rectifier_brand`);
};

export const brandRectifier = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM rectifier_brand WHERE id = ?`,
  );
};

export const createBrandRectifier = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'rectifier_brand', 'ELRBR', columns);
};

export const updateBrandRectifier = async (req: Request, res: Response) => {
  const columns = ['name'];
  updateEntity(req, res, 'rectifier_brand', columns);
};

export const deleteBrandRectifier = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM rectifier_brand WHERE id = ?`,
  );
};
