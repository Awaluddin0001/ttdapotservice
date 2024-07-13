import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { format } from 'date-fns';
export const getAllRow = async (
  req: Request,
  res: Response,
  poolMysql: () => Promise<Pool>,
  query: string,
) => {
  try {
    const pool = await poolMysql();
    const [rows] = await pool.query<RowDataPacket[]>(query);
    const formattedRows = rows.map((row: any) => ({
      ...row,
      installation_date: format(
        new Date(row.installation_date),
        'dd-MMMM-yyyy',
      ),
      created_at: format(new Date(row.created_at), 'dd-MMMM-yyyy'),
      maintenance_date: row.maintenance_date
        ? format(new Date(row.maintenance_date), 'dd-MMMM-yyyy')
        : '-',
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
export const getOneRow = async (
  req: Request,
  res: Response,
  poolMysql: () => Promise<Pool>,
  query: string,
) => {
  const { id } = req.query;
  try {
    const pool = await poolMysql();
    const [rows] = await pool.query<RowDataPacket[]>(query, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Rectifier not found');
    }
    const formattedRows = rows.map((row: any) => ({
      ...row,
      installation_date: format(
        new Date(row.installation_date),
        'dd-MMMM-yyyy',
      ),
      created_at: format(new Date(row.created_at), 'dd-MMMM-yyyy'),
      maintenance_date: row.maintenance_date
        ? format(new Date(row.maintenance_date), 'dd-MMMM-yyyy')
        : '-',
    }));

    res.json(formattedRows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
