import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow, deleteRow } from '@/utils/deleteData';
import { getAllRow, getOneRow } from '@/utils/getData';
import {
  createEntity,
  createRow,
  updateRow,
  updateEntity,
} from '@/utils/CreatePutDataElectrical';

export const allRectifier = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.brand_id,
        r.name,
        r.role,
        r.type,
        r.capacity,
        r.modul,
        r.capacity_modul,
        r.load_current,
        r.occupancy,
        r.system_device,
        r.remark_aging,
        r.warranty,
        DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        el.id as asset_id,
        el.ne_id as ne_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.link_id as link_id,
        el.status as status,
        el.condition_asset,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        lk.incoming as incoming,
        lk.outgoing as outgoing
      FROM rectifier r
      LEFT JOIN rectifier_brand b ON r.brand_id = b.id
      LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN maintenance_electrical m ON r.maintenance_id = m.id
      LEFT JOIN electrical el ON r.id = el.device_id
      LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN electrical_link lk ON el.link_id = lk.id
      WHERE 1=1
    `,
    `rectifier`,
  );
};

export const Rectifier = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.brand_id,
        r.name,
        r.role,
        r.type,
        r.capacity,
        r.modul,
        r.capacity_modul,
        r.load_current,
        r.occupancy,
        r.system_device,
        r.remark_aging,
        r.warranty,
        DATE_FORMAT(r.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        el.id as asset_id,
        el.ne_id as ne_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.link_id as link_id,
        el.status as status,
        el.condition_asset,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        lk.incoming as incoming,
        lk.outgoing as outgoing
      FROM rectifier r
      LEFT JOIN rectifier_brand b ON r.brand_id = b.id
      LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN maintenance_electrical m ON r.maintenance_id = m.id
      LEFT JOIN electrical el ON r.id = el.device_id
      LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN electrical_link lk ON el.link_id = lk.id
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
    `system_device`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    `condition_asset`,
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
    `system_device`,
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'condition_asset',
    'notes',
  ];
  await updateRow(req, res, 'rectifier', deviceColumns, electricalColumns);
};

export const deleteRectifier = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM rectifier WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
    `electrical_photo`,
  );
};

export const allBrandRecti = async (req: Request, res: Response) => {
  await getAllRow(
    req,
    res,
    pool,
    `SELECT * FROM rectifier_brand`,
    `rectifier_brand`,
  );
};

export const brandRectifier = async (req: Request, res: Response) => {
  await getOneRow(req, res, pool, `SELECT * FROM rectifier_brand WHERE id = ?`);
};

export const createBrandRectifier = async (req: Request, res: Response) => {
  const columns = ['name'];
  await createEntity(req, res, 'rectifier_brand', 'ELRBR', columns);
};

export const updateBrandRectifier = async (req: Request, res: Response) => {
  const columns = ['name'];
  await updateEntity(req, res, 'rectifier_brand', columns);
};

export const deleteBrandRectifier = async (req: Request, res: Response) => {
  await deleteRow(req, res, pool, `DELETE FROM rectifier_brand WHERE id = ?`);
};
