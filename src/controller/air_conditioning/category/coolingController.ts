import { Request, Response } from 'express';
import pool from '@/config/mySql';
import { deleteCombinedRow } from '@/utils/deleteData';
import { getBigDeviceRows, getBigDeviceRow } from '@/utils/getData';
import { createRowac, updateRowac } from '@/utils/CreatePutDataAir';
import { exportBigDeviceRows } from '@/utils/exportData';

export const allCooling = async (req: Request, res: Response) => {
  await getBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.brand_id`,
      `cas.type_id`,
      `cas.name`,
      `cas.manufactur`,
      `cas.indoor_sn`,
      `cas.type_indoor`,
      `cas.outdoor_sn`,
      `cas.type_outdoor`,
      `cas.paard_kracht`,
      `cas.btu_hour`,
      `cas.refrigerant`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.amount as amount`,
      `ca.waranty as waranty`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `air_conditioning`,
    `air_conditioning_cooling_device`,
    [
      `LEFT JOIN air_conditioning_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN air_conditioning_type t ON cas.type_id = t.id`,
    ],
  );
};

export const exportAirCsv = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.manufactur`,
      `cas.brand_id`,
      `cas.type_id`,
      `cas.indoor_sn`,
      `cas.type_indoor`,
      `cas.outdoor_sn`,
      `cas.type_outdoor`,
      `cas.paard_kracht`,
      `cas.btu_hour`,
      `cas.refrigerant`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,

      `t.name AS type_name`,
    ],
    `air_conditioning`,
    `air_conditioning_cooling_device`,
    `csv`,
    [
      `LEFT JOIN air_conditioning_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN air_conditioning_type t ON cas.type_id = t.id`,
    ],
  );
};
export const exportAirXlsx = async (req: Request, res: Response) => {
  await exportBigDeviceRows(
    req,
    res,
    pool,
    [
      `cas.name`,
      `cas.manufactur`,
      `cas.brand_id`,
      `cas.type_id`,
      `cas.indoor_sn`,
      `cas.type_indoor`,
      `cas.outdoor_sn`,
      `cas.type_outdoor`,
      `cas.paard_kracht`,
      `cas.btu_hour`,
      `cas.refrigerant`,
      `cas.power`,
      `b.name AS brand_name`,
      `ca.ne_id as ne_id`,
      `ca.status as status`,
      `ca.condition_asset`,
      `t.name AS type_name`,
    ],
    `air_conditioning`,
    `air_conditioning_cooling_device`,
    `xlsx`,
    [
      `LEFT JOIN air_conditioning_brand b ON cas.brand_id = b.id`,
      `LEFT JOIN air_conditioning_type t ON cas.type_id = t.id`,
    ],
  );
};

export const Cooling = async (req: Request, res: Response) => {
  await getBigDeviceRow(
    req,
    res,
    pool,
    `SELECT 
        r.id, 
        r.vendor_id,
        r.brand_id,
        r.name,
        r.manufactur,
        r.indoor_sn,
        r.type_indoor,
        r.outdoor_sn,
        r.type_outdoor,
        r.paard_kracht,
        r.btu_hour,
        r.refrigerant,
        r.power,
        DATE_FORMAT(el.installation_date, "%Y-%m-%d") AS installation_date, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") AS created_at,
        DATE_FORMAT(m.maintenance_date, "%Y-%m-%d") AS maintenance_date,
        m.activity AS maintenance_activity,
        m.document_name AS maintenance_document,
        b.name AS brand_name, 
        v.company AS vendor_name, 
        v.company_user_name AS vendor_user_name, 
        v.number_phone AS vendor_phone,
        u.name AS user_name,
        ep.foto1 AS photo1,
        ep.foto2 AS photo2,
        ep.foto3 AS photo3,
        el.id as asset_id,
        el.waranty as waranty,
        el.amount as amount,
        el.ne_id as ne_id,
        el.site_id as site_id,
        el.floor_id as floor_id,
        el.room_id as room_id,
        el.status as status,
        el.condition_asset,
        el.notes as notes,
        rm.name as room_name,
        fl.name as floor_name,
        st.name as site_name,
        ty.name as type_name,
        ty.id as type_id
      FROM air_conditioning_cooling_device r
      LEFT JOIN air_conditioning_brand b ON r.brand_id = b.id
      LEFT JOIN air_conditioning el ON r.id = el.device_id
      LEFT JOIN air_conditioning_vendor v ON r.vendor_id = v.id
      LEFT JOIN user u ON r.user_id = u.id
      LEFT JOIN air_conditioning_maintenance m ON el.maintenance_id = m.id
      LEFT JOIN air_conditioning_photo ep ON el.id = ep.asset_id
      LEFT JOIN room rm ON el.room_id = rm.id
      LEFT JOIN floor fl ON el.floor_id = fl.id
      LEFT JOIN site st ON el.site_id = st.id
      LEFT JOIN air_conditioning_type ty ON r.type_id = ty.id
    WHERE r.id = ?`,
  );
};

export const createCooling = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'name',
    `manufactur`,
    'indoor_sn',
    'type_indoor',
    'outdoor_sn',
    'type_outdoor',
    'paard_kracht',
    'btu_hour',
    'refrigerant',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `waranty`,
    `amount`,
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await createRowac(
    req,
    res,
    'air_conditioning_cooling_device',
    'ACCOO',
    deviceColumns,
    electricalColumns,
  );
};

export const updateCooling = async (req: Request, res: Response) => {
  const deviceColumns = [
    'brand_id',
    'vendor_id',
    'user_id',
    'type_id',
    'name',
    `manufactur`,
    'indoor_sn',
    'type_indoor',
    'outdoor_sn',
    'type_outdoor',
    'paard_kracht',
    'btu_hour',
    'refrigerant',
    'power',
  ];
  const electricalColumns = [
    'ne_id',
    'site_id',
    'floor_id',
    'room_id',
    'status',
    `waranty`,
    `amount`,
    'sub_category_id',
    `condition_asset`,
    'notes',
    'maintenance_id',
    'installation_date',
    'user_id',
  ];
  await updateRowac(
    req,
    res,
    'air_conditioning_cooling_device',
    deviceColumns,
    electricalColumns,
  );
};

export const deleteCooling = async (req: Request, res: Response) => {
  await deleteCombinedRow(
    req,
    res,
    pool,
    `DELETE FROM air_conditioning WHERE device_id = ?`,
    `DELETE FROM air_conditioning_cooling_device WHERE id = ?`,
    `DELETE FROM air_conditioning_photo WHERE asset_id = ?`,
    `air_conditioning`,
    `air_conditioning_photo`,
  );
};
