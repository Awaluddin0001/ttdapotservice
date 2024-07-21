import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { deleteCombinedRow } from '../utils/deleteData';
import { getAllRow, getOneRow } from '../utils/getData';
import { createRowFluid, updateRowFluid } from '../utils/CreatePutDataFluid';

export const allFluid = async (req: Request, res: Response) => {
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
    FROM tank_type t
    LEFT JOIN fluid_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_fluid m ON t.maintenance_id = m.id
    LEFT JOIN fluid el ON t.id = el.tank_id
    LEFT JOIN fluid_photo ep ON el.id = ep.asset_id`,
    `tank_type`,
  );
};

export const Fluid = async (req: Request, res: Response) => {
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
    FROM tank_type t
    LEFT JOIN fluid_vendor v ON t.vendor_id = v.id
    LEFT JOIN user u ON t.user_id = u.id
    LEFT JOIN maintenance_fluid m ON t.maintenance_id = m.id
    LEFT JOIN fluid el ON t.id = el.tank_id
    LEFT JOIN fluid_photo ep ON el.id = ep.asset_id
    WHERE t.id = ?`,
  );
};

export const createFluid = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type',
    'capacity',
    'fluid',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await createRowFluid(
    req,
    res,
    'tank_type',
    'FTTYP',
    deviceColumns,
    electricalColumns,
  );
};

export const updateFluid = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type',
    'capacity',
    'fluid',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'maintenance_id',
    'installation_date',
    'status',
    `\`condition\``,
    'notes',
    'user_id',
  ];
  await updateRowFluid(req, res, 'tank_type', deviceColumns, electricalColumns);
};

export const deleteFluid = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM fluid WHERE device_id = ?`,
    `DELETE FROM tank_type WHERE id = ?`,
    `DELETE FROM fluid_photo WHERE asset_id = ?`,
    `fluid`,
  );
};
