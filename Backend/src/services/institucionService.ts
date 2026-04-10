import { Institucion } from '../models/Institucion';

const instituciones: Institucion[] = [];

export function obtenerOCrearInstitucion(nombre: string): Institucion {
  const nombreLimpio = nombre.trim();

  if (!nombreLimpio) {
    throw new Error('El nombre de la institución es obligatorio');
  }

  const existente = instituciones.find(
    (inst) => inst.nombre.toLowerCase() === nombreLimpio.toLowerCase(),
  );

  if (existente) {
    return existente;
  }

  const nuevaInstitucion: Institucion = {
    id: `inst-${instituciones.length + 1}`,
    nombre: nombreLimpio,
  };

  instituciones.push(nuevaInstitucion);

  return nuevaInstitucion;
}
