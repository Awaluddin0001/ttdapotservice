import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { format } from 'date-fns';

export const getAllRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  table: string,
) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const { nopage, globalFilter } = req.query;

    let page;
    let limit;

    if (nopage === 'no') {
      // When nopage is 'no', fetch all records
      page = 1;
      limit = 1000000;
    } else {
      // Get pagination parameters from the query string
      page = parseInt(req.query.page as string) || 1;
      limit = parseInt(req.query.limit as string) || 100;
    }
    const offset = (page - 1) * limit;

    // Get filter parameters from the query string
    const vendorId = req.query.vendor_id as string;
    const brandId = req.query.brand_id as string;
    const userId = req.query.user_id as string;

    // Base query
    let filterQuery = query;

    // Adding filters if the respective columns are present in the base query
    if (vendorId) {
      filterQuery += ` AND r.vendor_id = '${vendorId}'`;
    }
    if (brandId) {
      filterQuery += ` AND r.brand_id = '${brandId}'`;
    }
    if (userId) {
      filterQuery += ` AND r.user_id = '${userId}'`;
    }

    // Global filter
    if (globalFilter) {
      const globalFilterQuery = `
        AND (
          v.company LIKE '%${globalFilter}%'
          OR b.name LIKE '%${globalFilter}%'
          OR r.name LIKE '%${globalFilter}%'
          OR r.type LIKE '%${globalFilter}%'
          OR r.role LIKE '%${globalFilter}%'
          OR r.system_device LIKE '%${globalFilter}%'
          OR u.name LIKE '%${globalFilter}%'
        )
      `;
      filterQuery += globalFilterQuery;
    }

    // Query to get the total count
    const countQuery = `
      SELECT COUNT(*) as count FROM (
        ${filterQuery}
      ) as total
    `;

    // Modify the query to include LIMIT and OFFSET for pagination
    const paginatedQuery = `${filterQuery} LIMIT ${limit} OFFSET ${offset}`;

    const [rows] = await connection.query<RowDataPacket[]>(paginatedQuery);
    const [totalRowsResult] =
      await connection.query<RowDataPacket[]>(countQuery);
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
  } finally {
    if (connection) connection.release();
  }
};

export const getOneRow = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query<RowDataPacket[]>(query, [id]);
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
  } finally {
    if (connection) connection.release();
  }
};
