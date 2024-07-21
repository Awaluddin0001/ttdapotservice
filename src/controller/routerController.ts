import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow, deleteRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';
import {
  createRowNetwork,
  updateRowNetwork,
} from '../utils/CreatePutDataNetwork';

export const allRouter = async (req: Request, res: Response) => {
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
    FROM routers r
    LEFT JOIN routers_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id`,
    `routers`,
  );
};

export const Router = async (req: Request, res: Response) => {
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
    FROM routers r
    LEFT JOIN routers_brand b ON r.brand_id = b.id
    LEFT JOIN rack_server rs ON r.rack_server_id = rs.id
    LEFT JOIN network_vendor v ON r.vendor_id = v.id
    LEFT JOIN user u ON r.user_id = u.id
    LEFT JOIN maintenance_network m ON r.maintenance_id = m.id
    LEFT JOIN network_it el ON r.id = el.device_id
    LEFT JOIN network_photo ep ON el.id = ep.asset_id
    WHERE r.id = ?`,
  );
};

export const createRouter = async (req: Request, res: Response) => {
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
    'routers',
    'NIRBR',
    deviceColumns,
    electricalColumns,
  );
};

export const updateRouter = async (req: Request, res: Response) => {
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
  await updateRowNetwork(req, res, 'routers', deviceColumns, electricalColumns);
};

export const deleteRouter = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM network_it WHERE device_id = ?`,
    `DELETE FROM routers WHERE id = ?`,
    `DELETE FROM network_photo WHERE asset_id = ?`,
    `network`,
  );
};

export const allBrandRouter = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM routers_brand`,
    `routers_brand`,
  );
};

export const brandRouter = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM routers_brand WHERE id = ?`,
  );
};

export const createBrandRouter = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'routers_brand', 'NIRBR', columns);
};

export const updateBrandRouter = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'routers_brand', columns);
};

export const deleteBrandRouter = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM routers_brand WHERE id = ?`,
  );
};
