import { Router } from 'express';
import { upload } from '../utils/imageUpload';

import {
  Safety,
  allSafety,
  createSafety,
  deleteSafety,
  updateSafety,
} from '../controller/safetyController';

const safety = Router();

// safety
safety.get('/safetys', allSafety);
safety.get('/safety', Safety);
safety.post('/safety', upload.array('images', 3), createSafety);
safety.put('/safety', upload.array('images', 3), updateSafety);
safety.delete('/safety', deleteSafety);

export default safety;
