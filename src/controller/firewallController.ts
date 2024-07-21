import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';
import {
  createRowNetwork,
  updateRowNetwork,
} from '../utils/CreatePutDataNetwork';

export const allFirewall = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          rs.id AS rack_server_id,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM firewalls r
    LEFT JOIN firewalls_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id`,
    `firewalls`,
  );
};

export const Firewall = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT 
          r.*, 
          b.name AS brand_name, 
          v.company AS vendor_name, 
          u.name AS user_name,
          rs.id AS rack_server_id,
          ep.foto1 AS photo1,
          ep.foto2 AS photo2,
          ep.foto3 AS photo3,
          DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
          DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
          DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at
    FROM firewalls r
    LEFT JOIN firewalls_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createFirewall = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'rack_server_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'capacity',
    'model',
    'manufactur',
    'position_unit',
    'port',
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
    'firewalls',
    'NIFIR',
    deviceColumns,
    electricalColumns,
  );
};

export const updateFirewall = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'rack_server_id',
    'user_id',
    'maintenance_id',
    'installation_date',
    'name',
    'type',
    'capacity',
    'model',
    'manufactur',
    'position_unit',
    'port',
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
    'firewalls',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteFirewall = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM network_it WHERE device_id = ?`,
    `DELETE FROM firewalls WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};

export const allBrandFirewall = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM firewalls_brand`,
    `firewalls_brand`,
  );
};

export const brandFirewall = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM firewalls_brand WHERE id = ?`,
  );
};

export const createBrandFirewall = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'firewalls_brand', 'NIFBR', columns);
};

export const updateBrandFirewall = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'firewalls_brand', columns);
};

export const deleteBrandFirewall = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM firewalls_brand WHERE id = ?`,
  );
};
