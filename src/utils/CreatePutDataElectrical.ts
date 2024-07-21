import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import moment from 'moment-timezone';
import { makeIdTable } from './makeIdTable';
import fs from 'fs';
import connectMySQL from '../config/mySql';
import { generateImageFileName } from './generateImageFileName';
import path from 'path';

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

    await insertRow(pool, deviceQuery, deviceParams);
    await insertRow(pool, electricalQuery, electricalParams);

    // Menyimpan gambar jika ada
    if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
      for (let i = 0; i < req.body.images.length; i++) {
        const file = req.body.images[i];
        const newFileName = generateImageFileName('ELPHO', newDeviceId, i + 1);
        const newPath = path.join(
          __dirname,
          '../../src/images/electrical',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        const photoQuery = `INSERT INTO electrical_photo (asset_id, foto${i + 1}, created_at, user_id) VALUES (?, ?, ?, ?)`;
        const photoParams = [newDeviceId, newFileName, now, req.body.user_id];

        await insertRow(pool, photoQuery, photoParams);
      }
    }

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
  folderPath?: string,
  prefixPhoto?: string,
  tablePhoto?: string,
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

    // Menyimpan gambar jika ada
    if (folderPath) {
      if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
        for (let i = 0; i < req.body.images.length; i++) {
          const file = req.body.images[i];
          const newFileName = generateImageFileName(
            `${prefixPhoto}`,
            newId,
            i + 1,
          );
          const newPath = path.join(
            __dirname,
            `../../src/images/${folderPath}`,
            newFileName,
          );

          fs.renameSync(file.path, newPath);

          const photoQuery = `INSERT INTO ${tablePhoto} (asset_id, foto${i + 1}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          const photoParams = [newId, newFileName, now, req.body.user_id];

          await insertRow(pool, photoQuery, photoParams);
        }
      }
    }

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

    // Menyimpan gambar jika ada
    if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
      for (let i = 0; i < req.body.images.length; i++) {
        const file = req.body.images[i];
        const newFileName = generateImageFileName('ELPHO', id as string, i + 1);
        const newPath = path.join(
          __dirname,
          '../../src/images/electrical',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        const photoQuery = `UPDATE electrical_photo SET foto${i + 1} = ?, updated_at = ? WHERE asset_id = ?`;
        const photoParams = [newFileName, now, id];

        await updateARow(pool, photoQuery, photoParams);
      }
    }

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
  folderPath?: string,
  prefixPhoto?: string,
  tablePhoto?: string,
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

    // Menyimpan gambar jika ada
    if (folderPath) {
      if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
        for (let i = 0; i < req.body.images.length; i++) {
          const file = req.body.images[i];
          const newFileName = generateImageFileName(
            `${prefixPhoto}`,
            id as string,
            i + 1,
          );
          const newPath = path.join(
            __dirname,
            `../../src/images/${folderPath}`,
            newFileName,
          );

          fs.renameSync(file.path, newPath);

          const photoQuery = `UPDATE ${tablePhoto} SET foto${i + 1} = ?, updated_at = ? WHERE asset_id = ?`;
          const photoParams = [newFileName, now, id];

          await updateARow(pool, photoQuery, photoParams);
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(`Error updating entity in ${tableName}:`, error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
