import { Request, Response } from 'express';
import connectMySQL from '../config/mySql';
import { getAllRow, getOneRow } from '../utils/getData';
import { deleteRow } from '../utils/deleteData';
import { createEntity, updateEntity } from '../utils/CreatePutDataElectrical';

export const allNetworkVendor = async (req: Request, res: Response) => {
  await getAllRow(req, res, connectMySQL, `SELECT * FROM network_vendor`);
};

export const NetworkVendor = async (req: Request, res: Response) => {
  await getOneRow(
    req,
    res,
    connectMySQL,
    `SELECT * FROM network_vendor WHERE id = ?`,
  );
};

export const deleteNetworkVendor = async (req: Request, res: Response) => {
  await deleteRow(
    req,
    res,
    connectMySQL,
    `DELETE FROM network_vendor WHERE id = ?`,
  );
};

export const createNetworkVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await createEntity(req, res, 'network_vendor', 'NIVEN', columns);
};

export const updateNetworkVendor = async (req: Request, res: Response) => {
  const columns = [`company`, `company_user_name`, `number_phone`];
  await updateEntity(req, res, 'network_vendor', columns);
};
