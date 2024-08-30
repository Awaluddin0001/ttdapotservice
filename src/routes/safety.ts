import { Router } from 'express';
import { upload } from '@/utils/imageUpload';

import {
  Safety,
  allSafety,
  createSafety,
  deleteSafety,
  updateSafety,
} from '../controller/safety/category/safetyController';

const safety = Router();

// safety
safety.get('/safetys', allSafety);
safety.get('/safety', Safety);
safety.post(
  '/safety',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  createSafety,
);
safety.put(
  '/safety',
  upload.fields([{ name: 'foto1' }, { name: 'foto2' }, { name: 'foto3' }]),
  updateSafety,
);
safety.delete('/safety', deleteSafety);

export default safety;
