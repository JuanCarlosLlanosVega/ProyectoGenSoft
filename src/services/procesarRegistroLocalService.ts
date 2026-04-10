import { EstudianteExcel } from '../models/EstudiantesExcel';
import { validarFilaExcel } from '../validators/excelRowValidator';
import { validarEncabezadosExcel } from '../validators/excelValidator';

import { crearDocente } from './docenteService';
import { obtenerOCrearInstitucion } from './institucionService';

interface ProcesarRegistroLocalParams {
  docenteNombre: string;
  docenteCorreo: string;
  institucionNombre: string;
  headers: string[];
  estudiantes: EstudianteExcel[];
  nombreArchivo: string;
}

export async function procesarRegistroLocal(
  params: ProcesarRegistroLocalParams,
): Promise<{
  mensaje: string;
  docente: {
    nombreCompleto: string;
    correoElectronico: string;
    institucionId: string;
  };
  institucion: {
    id: string;
    nombre: string;
  };
  estudiantes: EstudianteExcel[];
  archivo: string;
}> {
  if (!params.docenteNombre.trim()) {
    throw new Error('El nombre completo es obligatorio');
  }

  if (!params.institucionNombre.trim()) {
    throw new Error('La institución es obligatoria');
  }

  validarEncabezadosExcel(params.headers);

  for (const estudiante of params.estudiantes) {
    validarFilaExcel(estudiante);
  }

  const institucion = obtenerOCrearInstitucion(params.institucionNombre);

  const docente = crearDocente({
    nombreCompleto: params.docenteNombre,
    correoElectronico: params.docenteCorreo,
    institucionId: institucion.id,
  });

  return {
    mensaje: 'Registro completado correctamente',
    docente,
    institucion,
    estudiantes: params.estudiantes,
    archivo: params.nombreArchivo,
  };
}
