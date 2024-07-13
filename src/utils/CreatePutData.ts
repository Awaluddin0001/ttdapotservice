import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import moment from 'moment-timezone';
import { makeIdTable } from './makeIdTable';

import connectMySQL from '../config/mySql';

// Fungsi untuk mendapatkan ID terbaru dan membuat ID baru
const getNewId = async (
  pool: Pool,
  tableName: string,
  prefix: string,
  length: number,
): Promise<string> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id FROM ${tableName} ORDER BY id DESC LIMIT 1`,
  );
  if (rows.length === 0 || !rows[0]?.id) {
    return `${prefix}${'0'.repeat(length - 1)}1`;
  }
  return makeIdTable(rows[0].id, prefix, length);
};

// Fungsi untuk menjalankan query insert
const insertRow = async (
  pool: Pool,
  query: string,
  params: any[],
): Promise<void> => {
  await pool.query<RowDataPacket[]>(query, params);
};
export const createRow = async (
  req: Request,
  res: Response,
  deviceTable: string,
  devicePrefix: string,
  deviceColumns: string[],
  electricalColumns: string[],
) => {
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const pool = await connectMySQL();

  try {
    const newDeviceId = await getNewId(pool, deviceTable, devicePrefix, 3);
    const newElectricalId = await getNewId(pool, 'electrical', 'EL', 6);

    const deviceParams = [
      newDeviceId,
      ...deviceColumns.map((col) => req.body[col] || null),
      now,
    ];
    const electricalParams = [
      newElectricalId,
      newDeviceId,
      ...electricalColumns.map((col) => req.body[col] || null),
      now,
    ];

    const deviceQuery = `INSERT INTO ${deviceTable} (id, ${deviceColumns.join(', ')}, created_at) VALUES (?, ${deviceColumns.map(() => '?').join(', ')}, ?)`;
    const electricalQuery = `INSERT INTO electrical (id, device_id, ${electricalColumns.map((col) => (col === 'condition' ? `\`condition\`` : col)).join(', ')}, created_at) VALUES (?, ?, ${electricalColumns.map(() => '?').join(', ')}, ?)`;

    console.log(electricalQuery);

    await insertRow(pool, deviceQuery, deviceParams);
    await insertRow(pool, electricalQuery, electricalParams);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const createEntity = async (
  req: Request,
  res: Response,
  tableName: string,
  prefix: string,
  columns: string[],
) => {
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const pool = await connectMySQL();

  try {
    const newId = await getNewId(pool, tableName, prefix, 3);
    const params = [
      newId,
      ...columns.map((col) => req.body[col] || null),
      now,
      req.body.user_id,
    ];

    await insertRow(
      pool,
      `INSERT INTO ${tableName} (id, ${columns.join(', ')}, created_at, user_id) VALUES (?, ${columns.map(() => '?').join(', ')}, ?, ?)`,
      params,
    );

    res.status(201).json({ success: true });
  } catch (error) {
    console.error(`Error creating entity in ${tableName}:`, error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

const updateARow = async (
  pool: Pool,
  query: string,
  params: any[],
): Promise<void> => {
  await pool.query<RowDataPacket[]>(query, params);
};

// Fungsi utama untuk updateRectifier dan updatePanel
export const updateRow = async (
  req: Request,
  res: Response,
  deviceTable: string,
  deviceColumns: string[],
  electricalColumns: string[],
) => {
  const { id } = req.query;
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const pool = await connectMySQL();

  try {
    const deviceParams = [
      ...deviceColumns.map((col) => req.body[col] || null),
      now,
      id,
    ];
    const electricalParams = [
      ...electricalColumns.map((col) => req.body[col] || null),
      now,
      req.body.user_id,
      id,
    ];

    await updateARow(
      pool,
      `UPDATE ${deviceTable} SET
          ${deviceColumns.map((col) => `${col} = ?`).join(', ')},
          created_at = ?
        WHERE id = ?`,
      deviceParams,
    );

    await updateARow(
      pool,
      `UPDATE electrical SET
          ${electricalColumns.map((col) => (col === 'condition' ? `\`condition\`` : col) + ` = ?`).join(', ')},
          created_at = ?,
          user_id = ?
        WHERE device_id = ?`,
      electricalParams,
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

export const updateEntity = async (
  req: Request,
  res: Response,
  tableName: string,
  columns: string[],
) => {
  const { id } = req.query;
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const pool = await connectMySQL();

  try {
    const params = [
      ...columns.map((col) => req.body[col] || null),
      now,
      req.body.user_id,
      id,
    ];

    await updateARow(
      pool,
      `UPDATE ${tableName} SET
          ${columns.map((col) => `${col} = ?`).join(', ')},
          created_at = ?,
          user_id = ?
        WHERE id = ?`,
      params,
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error updating entity in ${tableName}:`, error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
