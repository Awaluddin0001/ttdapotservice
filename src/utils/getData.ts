import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { format } from 'date-fns';
export const getAllRow = async (
  req: Request,
  res: Response,
  poolMysql: () => Promise<Pool>,
  query: string,
  table: string,
) => {
  try {
    const pool = await poolMysql();

    const { nopage } = req.query;

    let page;
    let limit;

    if (nopage === 'no' || !nopage) {
      // Get pagination parameters from the query string
      page = parseInt(req.query.page as string) || 1;
      limit = parseInt(req.query.limit as string) || 10;
    } else {
      // Get pagination parameters from the query string
      page = 1;
      limit = 1000000;
    }
    const offset = (page - 1) * limit;

    // Get filter parameters from the query string
    const vendorId = req.query.vendor_id as string;
    const brandId = req.query.brand_id as string;
    const userId = req.query.user_id as string;

    // Base query
    let filterQuery = query;

    // Adding filters if the respective columns are present in the base query
    if (query.includes('vendor_id') && vendorId) {
      filterQuery += ` AND vendor_id = '${vendorId}'`;
    }
    if (query.includes('brand_id') && brandId) {
      filterQuery += ` AND brand_id = '${brandId}'`;
    }
    if (query.includes('user_id') && userId) {
      filterQuery += ` AND user_id = '${userId}'`;
    }

    // Modify the query to include LIMIT and OFFSET for pagination
    const paginatedQuery = `${filterQuery} LIMIT ${limit} OFFSET ${offset}`;

    const [rows] = await pool.query<RowDataPacket[]>(paginatedQuery);

    const [totalRowsResult] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) as count FROM ${table}`,
    );
    const totalRows = totalRowsResult[0].count;

    const formattedRows = rows.map((row: any) => {
      const formattedRow: any = { ...row };

      if ('installation_date' in row) {
        formattedRow.installation_date = format(
          new Date(row.installation_date),
          'dd-MMMM-yyyy',
        );
      }

      if ('created_at' in row) {
        formattedRow.created_at = format(
          new Date(row.created_at),
          'dd-MMMM-yyyy',
        );
      }

      if ('maintenance_date' in row) {
        formattedRow.maintenance_date = row.maintenance_date
          ? format(new Date(row.maintenance_date), 'dd-MMMM-yyyy')
          : '-';
      }

      return formattedRow;
    });

    res.json({
      data: formattedRows,
      pagination: {
        totalRows,
        currentPage: page,
        totalPages: Math.ceil(totalRows / limit),
        pageSize: limit,
      },
    });
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
