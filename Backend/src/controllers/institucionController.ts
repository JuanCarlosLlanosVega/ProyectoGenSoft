import { Request, Response } from 'express';

import { obtenerOCrearInstitucion } from '../services/institucionService';

const institucionesMock = [
  { id: 'inst-1', nombre: 'Colegio Bolívar' },
  { id: 'inst-2', nombre: 'Colegio Sucre' },
];

export function listarInstituciones(_req: Request, res: Response): void {
  res.status(200).json(institucionesMock);
}

export function crearInstitucion(req: Request, res: Response): void {
  try {
    const { nombre } = req.body as { nombre?: string };

    if (!nombre || !nombre.trim()) {
      res.status(400).json({
        error: 'El nombre de la institución es obligatorio',
      });
      return;
    }

    const institucion = obtenerOCrearInstitucion(nombre);
    res.status(201).json(institucion);
  } catch (error) {
    const mensaje =
      error instanceof Error ? error.message : 'Error al crear institución';

    res.status(400).json({ error: mensaje });
  }
}