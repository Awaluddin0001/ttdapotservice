import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

// Fungsi untuk menghapus file gambar
const deleteImageFiles = async (
  pool: Pool,
  assetId: string,
  folderPath: string,
  tableName?: string,
): Promise<void> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT foto1, foto2, foto3 FROM ${tableName} WHERE asset_id = ?`,
    [assetId],
  );

  connection.release();
  if (rows.length > 0) {
    const images = rows[0];
    for (let i = 1; i <= 3; i++) {
      const imageFile = images[`foto${i}`];
      if (imageFile) {
        const imagePath = path.join(
          __dirname,
          `../../src/images/${folderPath}`,
          imageFile,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
  }
};

const deleteDocumentFiles = async (
  pool: Pool,
  assetId: string,
  folderPath: string,
  tableName?: string,
): Promise<void> => {
  const connection = await pool.getConnection();
  const [rows] = await connection.query<RowDataPacket[]>(
    `SELECT document_name FROM ${tableName} WHERE id = ?`,
    [assetId],
  );

  connection.release();
  if (rows.length > 0) {
    const documentName = rows[0].document_name;
    for (let i = 1; i <= 3; i++) {
      const document = documentName;
      if (document) {
        const imagePath = path.join(
          __dirname,
          `../../src/documents/maintenance/${folderPath}`,
          document,
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    }
  }
};

export const deleteCombinedRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query1: string,
  query2: string,
  query3: string,
  folderPath: string,
  tableName?: string,
) => {
  const { id, assetid } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Hapus file gambar terkait
    await deleteImageFiles(pool, assetid as string, folderPath, tableName);

    // Hapus data dari database
    await connection.query<RowDataPacket[]>(query2, [id]);
    await connection.query<RowDataPacket[]>(query3, [assetid]);
    await connection.query<RowDataPacket[]>(query1, [id]);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};

export const deleteRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  query2?: string,
  folderPath?: string,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Hapus file gambar terkait
    if (folderPath && query2) {
      await deleteImageFiles(
        pool,
        id as string,
        folderPath,
        `electrical_photo`,
      );
      await connection.query<RowDataPacket[]>(query2, [id]);
    }
    console.log(id);
    await connection.query<RowDataPacket[]>(query, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};
export const deleteRowDocument = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  folderPath?: string,
  tableName?: string,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();

    // Hapus file gambar terkait
    if (folderPath) {
      await deleteDocumentFiles(pool, id as string, folderPath, tableName);
    }
    console.log(id);
    await connection.query<RowDataPacket[]>(query, [id]);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Internal Server Error' });
  } finally {
    if (connection) connection.release();
  }
};
