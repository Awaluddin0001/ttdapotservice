import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { format } from 'date-fns';
import {
  globalFilterAsset,
  globalFilterDevice,
  queryBigAsset,
  queryBigDevice,
  queryBigNetwork,
  queryPage,
  querySmallAsset,
} from '@/utils/idManipulation';

// for table category number #1 rows
export const getBigAssetRows = async (
  req: Request,
  res: Response,
  pool: Pool,
  newColumnsCa: string[],
  categoryName: string,
) => {
  let connection;
  try {
    connection = await pool.getConnection();
    let otherCategoryName;
    let query;

    const { globalFilter } = req.query;
    const { page, limit, offset } = queryPage(req);

    query = queryBigAsset(categoryName, newColumnsCa);

    if (categoryName === `network_it`) {
      otherCategoryName = `network`;
      query = queryBigNetwork(otherCategoryName, categoryName, newColumnsCa);
    }

    // Base query
    let filterQuery = query;

    // Global filter
    if (globalFilter) {
      const globalFilterQuery = globalFilterAsset(req, newColumnsCa);
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

// for table category number #1 row
export const getBigAssetRow = async (
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

// for table sub category number #1 row
export const getBigDeviceRows = async (
  req: Request,
  res: Response,
  pool: Pool,
  newColumnsCas: string[],
  categoryName: string,
  subCategoryName: string,
  newJoin?: string[] | null,
) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const { globalFilter } = req.query;
    const { page, limit, offset } = queryPage(req);

    const query = queryBigDevice(
      categoryName,
      subCategoryName,
      newColumnsCas,
      newJoin,
    );

    // Base query
    let filterQuery = query;

    // Global filter
    if (globalFilter) {
      const globalFilterQuery = globalFilterDevice(req, newColumnsCas);
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

// for table sub category number #1 row
export const getBigDeviceRow = async (
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

export const getSmallAssetRows = async (
  req: Request,
  res: Response,
  pool: Pool,
  newColumnsCa: string[],
  categoryName: string,
  newJoin?: string[] | null,
) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const { globalFilter } = req.query;
    const { page, limit, offset } = queryPage(req);

    const query = querySmallAsset(categoryName, newColumnsCa, newJoin);

    // Base query
    let filterQuery = query;

    // Global filter
    if (globalFilter) {
      const globalFilterQuery = globalFilterAsset(req, newColumnsCa);
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

export const getSmallAssetRow = async (
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
      return res.status(404).send('Asset not found');
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

export const getSmallDeviceRows = async (
  req: Request,
  res: Response,
  pool: Pool,
  newColumnsCas: string[],
  categoryName: string,
  subCategoryName: string,
  newJoin?: string[] | null,
) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const { globalFilter } = req.query;
    const { page, limit, offset } = queryPage(req);

    const query = queryBigDevice(
      categoryName,
      subCategoryName,
      newColumnsCas,
      newJoin,
    );

    // Base query
    let filterQuery = query;

    // Global filter
    if (globalFilter) {
      const globalFilterQuery = globalFilterDevice(req, newColumnsCas);
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

export const getSmallDeviceRow = async (
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

// untuk brand, sub category, maintenance, type, vonder dan link

export const getRowQuery = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  type?: Boolean,
) => {
  const { id } = req.query;
  let connection;
  try {
    connection = await pool.getConnection();
    const { globalFilter } = req.query;

    const { page, limit, offset } = queryPage(req);
    // Base query
    let filterQuery = query;

    let rows;
    if (id) {
      [rows] = await connection.query<RowDataPacket[]>(filterQuery, id);
      res.json({
        data: rows[0],
      });
    } else {
      if (!type) {
        filterQuery += ` LEFT JOIN user u ON cas.user_id = u.id`;
        filterQuery += ` WHERE 1 = 1`;
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
      [rows] = await connection.query<RowDataPacket[]>(paginatedQuery);

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
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (connection) connection.release();
  }
};
