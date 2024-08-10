import { Request, Response } from 'express';
import path from 'path';

export const downloadController = (req: Request, res: Response) => {
  const subdirectory = req.params.subdirectory;
  const filename = req.params.filename;
  const filePath = path.resolve(
    __dirname,
    `documents/maintenance/${subdirectory}`,
    filename,
  );

  res.download(filePath, filename, (err) => {
    if (err) {
      res.status(500).send('Error downloading the file');
    }
  });
};
