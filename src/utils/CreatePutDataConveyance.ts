import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import moment from 'moment-timezone';
import fs from 'fs';
import pool from '@/config/mySql'; // Import pool langsung
import { generateImageFileName } from '@/utils/generateImageFileName';
import path from 'path';
import { getNewId } from './idManipulation';
import { createAuditTrail } from '@/models/auditTrailModel';

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
  const nowWithoutFormat = moment().tz('Asia/Singapore');
  const quarter = Math.floor((nowWithoutFormat.month() + 3) / 3);
  const collectionName = `${nowWithoutFormat.year()}Q${quarter}`;
  const AuditTrailData = createAuditTrail(collectionName);
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
      ...conveyanceColumns.map((col) => req.body[col] || null),
      now,
    ];

    const electricalQuery = `INSERT INTO conveyance (id, ${conveyanceColumns.join(', ')}, created_at) VALUES (?, ${conveyanceColumns.map(() => '?').join(', ')}, ?)`;

    await insertRow(pool, electricalQuery, conveyanceParams);

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
          'COPHO',
          newDeviceId,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/conveyance',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM conveyance_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [newconveyanceId],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE conveyance_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, newconveyanceId];
        } else {
          // Insert query
          photoQuery = `INSERT INTO conveyance_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          photoParams = [newconveyanceId, newFileName, now, req.body.user_id];
        }

        await insertRow(pool, photoQuery, photoParams);
      }
    }

    const newTrail = new AuditTrailData({
      timestamp: nowWithoutFormat,
      user: req.body.user_id,
      action: `user ${req.body.user_id} Membuat ${newDeviceId}`,
    });
    await newTrail.save();

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
  const { id, assetid } = req.query;
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  let connection;
  const nowWithoutFormat = moment().tz('Asia/Singapore');
  const quarter = Math.floor((nowWithoutFormat.month() + 3) / 3);
  const collectionName = `${nowWithoutFormat.year()}Q${quarter}`;
  const AuditTrailData = createAuditTrail(collectionName);

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
      `UPDATE conveyance SET
          ${conveyanceColumns.map((col) => col + ` = ?`).join(', ')},
          created_at = ?,
          user_id = ?
        WHERE id = ?`,
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
          'COPHO',
          id as string,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/conveyance',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM conveyance_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [assetid],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE conveyance_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, assetid];
        } else {
          // Insert query
          photoQuery = `INSERT INTO conveyance_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          photoParams = [assetid, newFileName, now, req.body.user_id];
        }

        await insertRow(pool, photoQuery, photoParams);
      }
    }
    const newTrail = new AuditTrailData({
      timestamp: nowWithoutFormat,
      user: req.body.user_id,
      action: `user ${req.body.user_id} Memperbaharui ${assetid}`,
    });
    await newTrail.save();
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};
