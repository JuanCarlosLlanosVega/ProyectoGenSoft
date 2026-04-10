import { Router } from 'express';

import {
  crearInstitucion,
  listarInstituciones,
} from '../controllers/institucionController';

const router = Router();

router.get('/', listarInstituciones);
router.post('/', crearInstitucion);

export default router;