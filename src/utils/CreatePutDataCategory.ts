import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import moment from 'moment-timezone';
import fs from 'fs';
import pool from '@/config/mySql';
import { generateImageFileName } from '@/utils/generateImageFileName';
import path from 'path';
import { getNewId, makeIdTable } from './idManipulation';

// Fungsi untuk menjalankan query insert
const insertRow = async (
  pool: Pool,
  query: string,
  params: any[],
): Promise<void> => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query<RowDataPacket[]>(query, params);
  } catch (err) {
    console.error('Failed to fetch data from MySQL:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
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
  let connection;

  try {
    connection = await pool.getConnection();
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
    const electricalQuery = `INSERT INTO electrical (id, device_id, ${electricalColumns.join(', ')}, created_at) VALUES (?, ?, ${electricalColumns.map(() => '?').join(', ')}, ?)`;

    await insertRow(pool, deviceQuery, deviceParams);
    await insertRow(pool, electricalQuery, electricalParams);

    // Menyimpan gambar jika ada
    const fileFields = ['foto1', 'foto2', 'foto3'] as const;
    const files = req.files as Record<
      (typeof fileFields)[number],
      Express.Multer.File[]
    >;

    for (const field of fileFields) {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        const fileIndex = fileFields.indexOf(field) + 1;
        const newFileName = generateImageFileName(
          'ELPHO',
          newDeviceId,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/electrical',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM electrical_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [newElectricalId],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE electrical_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, newElectricalId];
        } else {
          // Insert query
          photoQuery = `INSERT INTO electrical_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          photoParams = [newElectricalId, newFileName, now, req.body.user_id];
        }

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
  let connection;

  try {
    connection = await pool.getConnection();
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
      if (req.files && req.files instanceof Array) {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
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
  } finally {
    if (connection) connection.release();
  }
};

const updateARow = async (
  pool: Pool,
  query: string,
  params: any[],
): Promise<void> => {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query<RowDataPacket[]>(query, params);
  } catch (err) {
    console.error('Failed to update data in MySQL:', err);
    throw err;
  } finally {
    if (connection) connection.release();
  }
};

// Fungsi utama untuk updateRectifier dan updatePanel
export const updateRow = async (
  req: Request,
  res: Response,
  deviceTable: string,
  deviceColumns: string[],
  electricalColumns: string[],
) => {
  const { id, assetid } = req.query;
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
          ${electricalColumns.map((col) => col + ` = ?`).join(', ')},
          created_at = ?,
          user_id = ?
        WHERE device_id = ?`,
      electricalParams,
    );

    // Menyimpan gambar jika ada
    const fileFields = ['foto1', 'foto2', 'foto3'] as const;
    const files = req.files as Record<
      (typeof fileFields)[number],
      Express.Multer.File[]
    >;

    for (const field of fileFields) {
      if (files[field] && files[field][0]) {
        const file = files[field][0];
        const fileIndex = fileFields.indexOf(field) + 1;
        const newFileName = generateImageFileName(
          'ELPHO',
          id as string,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/electrical',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM electrical_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [assetid],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE electrical_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, assetid];
        } else {
          // Insert query
          photoQuery = `INSERT INTO electrical_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          photoParams = [assetid, newFileName, now, req.body.user_id];
        }

        await insertRow(pool, photoQuery, photoParams);
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
  let connection;

  try {
    connection = await pool.getConnection();
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
      if (req.files && req.files instanceof Array) {
        for (let i = 0; i < req.files.length; i++) {
          const file = req.files[i];
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
  } finally {
    if (connection) connection.release();
  }
};
