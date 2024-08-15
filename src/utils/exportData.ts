import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import { Pool } from 'mysql2/promise';
import { format } from 'date-fns';
import { parse } from 'json2csv';
import ExcelJS from 'exceljs';
import {
  globalFilterDevice,
  queryBigDevice,
  queryPage,
} from './idManipulation';

export const exportData = async (
  req: Request,
  res: Response,
  pool: Pool,
  query: string,
  formatType: 'csv' | 'xlsx',
) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [rows] = await connection.query<RowDataPacket[]>(query);

    if (rows.length === 0) {
      return res.status(404).send('Data not found');
    }

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

    if (formatType === 'csv') {
      // Export to CSV
      const csv = parse(formattedRows);
      res.header('Content-Type', 'text/csv');
      res.attachment('data.csv');
      return res.send(csv);
    } else if (formatType === 'xlsx') {
      // Export to XLSX
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Add header
      worksheet.columns = Object.keys(formattedRows[0]).map((key) => ({
        header: key,
        key: key,
        width: 20,
      }));

      // Add rows
      worksheet.addRows(formattedRows);

      res.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.attachment('data.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (connection) connection.release();
  }
};

export const exportBigDeviceRows = async (
  req: Request,
  res: Response,
  pool: Pool,
  newColumnsCas: string[],
  categoryName: string,
  subCategoryName: string,
  formatType: 'csv' | 'xlsx',
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

    // Modify the query to include LIMIT and OFFSET for pagination
    const paginatedQuery = `${filterQuery} LIMIT ${limit} OFFSET ${offset}`;

    const [rows] = await connection.query<RowDataPacket[]>(paginatedQuery);

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

    if (formatType === 'csv') {
      // Export to CSV
      const csv = parse(formattedRows);
      res.header('Content-Type', 'text/csv');
      res.attachment('data.csv');
      return res.send(csv);
    } else if (formatType === 'xlsx') {
      // Export to XLSX
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Data');

      // Add header
      worksheet.columns = Object.keys(formattedRows[0]).map((key) => ({
        header: key,
        key: key,
        width: 20,
      }));

      // Set header style
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true, size: 12 };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });

      // Add rows
      worksheet.addRows(formattedRows);

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        row.eachCell({ includeEmpty: false }, (cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });

      res.header(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
      res.attachment('data.xlsx');

      await workbook.xlsx.write(res);
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  } finally {
    if (connection) connection.release();
  }
};
