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

export const createRowSafety = async (
  req: Request,
  res: Response,
  deviceTable: string,
  devicePrefix: string,
  deviceColumns: string[],
  safetyColumns: string[],
) => {
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  const nowWithoutFormat = moment().tz('Asia/Singapore');
  const quarter = Math.floor((nowWithoutFormat.month() + 3) / 3);
  const collectionName = `${nowWithoutFormat.year()}Q${quarter}`;
  const AuditTrailData = createAuditTrail(collectionName);
  let connection;

  try {
    connection = await pool.getConnection();

    // const newDeviceId = await getNewId(pool, deviceTable, devicePrefix, 3);
    const newsafetyId = await getNewId(pool, 'safety', 'SU', 6);

    const deviceParams = [
      ...deviceColumns.map((col) => req.body[col] || null),
      now,
    ];
    const safetyParams = [
      newsafetyId,
      ...safetyColumns.map((col) => req.body[col] || null),
      now,
    ];

    // const deviceQuery = `INSERT INTO ${deviceTable} (id, ${deviceColumns.join(', ')}, created_at) VALUES (?, ${deviceColumns.map(() => '?').join(', ')}, ?)`;
    const electricalQuery = `INSERT INTO safety (id,  ${safetyColumns.join(', ')}, created_at) VALUES (?, ${safetyColumns.map(() => '?').join(', ')}, ?)`;

    console.log(electricalQuery);

    await insertRow(pool, electricalQuery, safetyParams);

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
          'SAPHO',
          newsafetyId,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/safety',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM safety_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [newsafetyId],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE safety_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, newsafetyId];
        } else {
          // Insert query
          photoQuery = `INSERT INTO safety_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
          photoParams = [newsafetyId, newFileName, now, req.body.user_id];
        }

        await insertRow(pool, photoQuery, photoParams);
      }
    }

    const newTrail = new AuditTrailData({
      timestamp: nowWithoutFormat,
      user: req.body.user_id,
      action: `user ${req.body.user_id} Membuat ${newsafetyId}`,
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
export const updateRowSafety = async (
  req: Request,
  res: Response,
  deviceTable: string,
  deviceColumns: string[],
  safetyColumns: string[],
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
      ...safetyColumns.map((col) => req.body[col] || null),
      now,
      req.body.user_id,
      id,
    ];

    console.log(id, assetid);

    await updateARow(
      pool,
      `UPDATE safety SET
          ${safetyColumns.map((col) => col + ` = ?`).join(', ')},
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
          'SAPHO',
          id as string,
          fileIndex,
        );
        const newPath = path.join(
          __dirname,
          '../../src/images/safety',
          newFileName,
        );

        fs.renameSync(file.path, newPath);

        let photoQuery, photoParams;
        const checkExistingQuery =
          'SELECT * FROM safety_photo WHERE asset_id = ?';
        const [existingRows] = await connection.query<RowDataPacket[]>(
          checkExistingQuery,
          [assetid],
        );

        if (existingRows.length > 0) {
          // Update query
          photoQuery = `UPDATE safety_photo SET foto${fileIndex} = ?, created_at = ?, user_id = ? WHERE asset_id = ?`;
          photoParams = [newFileName, now, req.body.user_id, assetid];
        } else {
          // Insert query
          photoQuery = `INSERT INTO safety_photo (asset_id, foto${fileIndex}, created_at, user_id) VALUES (?, ?, ?, ?)`;
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
