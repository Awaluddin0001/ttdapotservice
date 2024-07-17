import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';
import {
  createRowNetwork,
  updateRowNetwork,
} from '../utils/CreatePutDataNetwork';

export const allRackserver = async (req: Request, res: Response) => {
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
    FROM rack_server r
    LEFT JOIN rack_server_brand b ON r.brand_id = b.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id`,
  );
};

export const Rackserver = async (req: Request, res: Response) => {
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
    FROM rack_server r
    LEFT JOIN rack_server_brand b ON r.brand_id = b.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createRackserver = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'type',
    'capacity',
    'model',
    'manufactur',
    'port',
    'case_pc',
    'rack_sn',
    'kvm_id',
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
    'rack_server',
    'NIRAS',
    deviceColumns,
    electricalColumns,
  );
};

export const updateRackserver = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'type',
    'capacity',
    'model',
    'manufactur',
    'port',
    'case_pc',
    'rack_sn',
    'kvm_id',
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
  await updateRowNetwork(
    req,
    res,
    'rack_server',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteRackserver = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM network_it WHERE device_id = ?`,
    `DELETE FROM rack_server WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};

export const allBrandRackserver = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM rack_server_brand`);
};

export const brandRackserver = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM rack_server_brand WHERE id = ?`,
  );
};

export const createBrandRackserver = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'rack_server_brand', 'NIRSB', columns);
};

export const updateBrandRackserver = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'rack_server_brand', columns);
};

export const deleteBrandRackserver = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM rack_server_brand WHERE id = ?`,
  );
};
