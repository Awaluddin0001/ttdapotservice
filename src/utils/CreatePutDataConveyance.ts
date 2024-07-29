import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import moment from 'moment-timezone';
import fs from 'fs';
import pool from '@/config/mySql'; // Import pool langsung
import { generateImageFileName } from '@/utils/generateImageFileName';
import path from 'path';
import { getNewId } from './idManipulation';

// Fungsi untuk menjalankan query insert
const insertRow = async (
  pool: Pool,
  query: string,
  params: any[],
): Promise<void> => {
  await pool.query<RowDataPacket[]>(query, params);
};

export const createRowConveyance = async (
  req: Request,
  res: Response,
  deviceTable: string,
  devicePrefix: string,
  deviceColumns: string[],
  conveyanceColumns: string[],
) => {
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;

  try {
    connection = await pool.getConnection();

    const newDeviceId = await getNewId(pool, deviceTable, devicePrefix, 3);
    const newconveyanceId = await getNewId(pool, 'conveyance', 'CO', 6);

    const deviceParams = [
      newDeviceId,
      ...deviceColumns.map((col) => req.body[col] || null),
      now,
    ];
    const conveyanceParams = [
      newconveyanceId,
      newDeviceId,
      ...conveyanceColumns.map((col) => req.body[col] || null),
      now,
    ];

    const deviceQuery = `INSERT INTO ${deviceTable} (id, ${deviceColumns.join(', ')}, created_at) VALUES (?, ${deviceColumns.map(() => '?').join(', ')}, ?)`;
    const electricalQuery = `INSERT INTO conveyance (id, type_id, ${conveyanceColumns.map((col) => (col === 'condition' ? `\`condition\`` : col)).join(', ')}, created_at) VALUES (?, ?, ${conveyanceColumns.map(() => '?').join(', ')}, ?)`;

    console.log(electricalQuery);

    await insertRow(pool, deviceQuery, deviceParams);
    await insertRow(pool, electricalQuery, conveyanceParams);

    // Menyimpan gambar jika ada
    if (req.files && req.files instanceof Array) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const newFileName = generateImageFileName('COPHO', newDeviceId, i + 1);
        const newPath = path.join(
          __dirname,
          '../../src/images/conveyance',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        const photoQuery = `INSERT INTO conveyance_photo (asset_id, foto${i + 1}, created_at, user_id) VALUES (?, ?, ?, ?)`;
        const photoParams = [newDeviceId, newFileName, now, req.body.user_id];

        await insertRow(pool, photoQuery, photoParams);
      }
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error creating device:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
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
export const updateRowConveyance = async (
  req: Request,
  res: Response,
  deviceTable: string,
  deviceColumns: string[],
  conveyanceColumns: string[],
) => {
  const { id } = req.query;
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;

  try {
    connection = await pool.getConnection();

    const deviceParams = [
      ...deviceColumns.map((col) => req.body[col] || null),
      now,
      id,
    ];
    const electricalParams = [
      ...conveyanceColumns.map((col) => req.body[col] || null),
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
      `UPDATE conveyance SET
          ${conveyanceColumns.map((col) => (col === 'condition' ? `\`condition\`` : col) + ` = ?`).join(', ')},
          created_at = ?,
          user_id = ?
        WHERE type_id = ?`,
      electricalParams,
    );

    // Menyimpan gambar jika ada
    if (req.files && req.files instanceof Array) {
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        const newFileName = generateImageFileName('COPHO', id as string, i + 1);
        const newPath = path.join(
          __dirname,
          '../../src/images/conveyance',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        const photoQuery = `UPDATE conveyance_photo SET foto${i + 1} = ?, updated_at = ? WHERE asset_id = ?`;
        const photoParams = [newFileName, now, id];

        await updateARow(pool, photoQuery, photoParams);
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};
