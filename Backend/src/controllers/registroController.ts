import { Request, Response } from 'express';

import { procesarRegistroLocal } from '../services/procesarRegistroLocalService';

export async function registrarDocenteYParticipantes(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const resultado = await procesarRegistroLocal(req.body);

    res.status(201).json(resultado);
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : 'Error en el proceso de registro';

    res.status(400).json({ error: mensaje });
  }
}