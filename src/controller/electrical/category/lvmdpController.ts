import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import {
  getBigDeviceRows,
  getBigDeviceRow,
  getRowQuery,
} from '@/utils/getData';
import { createRow, updateRow } from '@/utils/CreatePutDataElectrical';

export const allLvmdp = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.type_id`,
      `cas.voltage_level`,
      `cas.current_rating`,
      `cas.breaker_type`,
      `cas.breaker_rating`,
      `cas.section`,
      `ca.ne_id as ne_id`,
      `ca.link_id as link_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `lk.incoming as incoming`,
      `lk.outgoing as outgoing`,
      `t.name AS type_name`,
    ],
    `electrical`,
    `electrical_lvmdp`,
    [
      `LEFT JOIN electrical_type t ON cas.type_id = t.id`,
      `LEFT JOIN electrical_link lk ON ca.link_id = lk.id`,
    ],
  );
};

export const Lvmdp = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.name,
        r.type_id,
        r.voltage_level,
        r.current_rating,
        r.breaker_type,
        r.breaker_rating,
        r.section,
        DATE_FORMAT(el.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        m.activity AS maintenance_activity,
        m.document_name AS maintenance_document,
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
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
        lk.outgoing as outgoing,
        ty.name as type_name,
        ty.id as type_id
      FROM electrical_lvmdp r
      LEFT JOIN electrical el ON r.id = el.device_id
      LEFT JOIN electrical_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN electrical_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN electrical_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN electrical_link lk ON el.link_id = lk.id
      LEFT JOIN electrical_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createLvmdp = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type_id',
    'voltage_level',
    'current_rating',
    'breaker_type',
    'breaker_rating',
    'section',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRow(
    req,
    res,
    'electrical_lvmdp',
    'ELLVM',
    deviceColumns,
    electricalColumns,
  );
};

export const updateLvmdp = async (req: Request, res: Response) => {
  const deviceColumns = [
    'vendor_id',
    'user_id',
    'name',
    'type_id',
    'voltage_level',
    'current_rating',
    'breaker_type',
    'breaker_rating',
    'section',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'link_id',
    'status',
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRow(
    req,
    res,
    'electrical_lvmdp',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteLvmdp = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM electrical WHERE device_id = ?`,
    `DELETE FROM electrical_lvmdp WHERE id = ?`,
    `DELETE FROM electrical_photo WHERE asset_id = ?`,
    `electrical`,
    `electrical_photo`,
  );
};
