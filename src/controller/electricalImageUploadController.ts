// src/controllers/electricalImageUploadController.ts

import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import moment from 'moment-timezone';
import { RowDataPacket } from 'mysql2';

export const uploadElectricalImage = async (req: Request, res: Response) => {
  const { asset_id, user_id } = req.body;
  if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const db = await connectMySQL();
    const fileNames = req.body.images.map((file: any) => file.filename);
    const storeData = [asset_id, ...fileNames, now, user_id];
    const query =
      'INSERT INTO electrical_photo (asset_id, foto1, foto2, foto3, created_at, user_id) VALUES (?, ?, ?, ?,?,?)';
    await db.query(query, storeData);

    res
      .status(200)
      .json({ message: 'Files uploaded successfully.', fileNames });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getElectricalImagesByAssetId = async (
  req: Request,
  res: Response,
) => {
  const { asset_id } = req.body;

  try {
    const db = await connectMySQL();
    const query =
      'SELECT foto1, foto2, foto3 FROM electrical_photo WHERE asset_id = ?';
    const [rows] = await db.query<RowDataPacket[]>(query, [asset_id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'No images found for this asset_id.' });
    }

    const images = rows[0];
    res.status(200).json({ images });
  } catch (error) {
    console.error('Error retrieving from database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const updateElectricalImages = async (req: Request, res: Response) => {
  const { asset_id, user_id } = req.body;
  if (req.body.images[0] || req.body.images[1] || req.body.images[2]) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }
  const now = moment().tz('Asia/Singapore').format('YYYY-MM-DD');
  try {
    const db = await connectMySQL();
    const fileNames = req.body.images.map((file: any) => file.filename);
    const updateData = [
      fileNames[0],
      fileNames[1],
      fileNames[2],
      now,
      user_id,
      asset_id,
    ];
    const query =
      'UPDATE electrical_photo SET foto1 = ?, foto2 = ?, foto3 = ?, updated_at = ?, user_id = ? WHERE asset_id = ?';
    await db.query(query, updateData);

    res.status(200).json({ message: 'Files updated successfully.', fileNames });
  } catch (error) {
    console.error('Error updating database:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
