import { Router } from 'express';

import { registrarDocenteYParticipantes } from '../controllers/registroController';

const router = Router();

router.post('/', registrarDocenteYParticipantes);

export default router;