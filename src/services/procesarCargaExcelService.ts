import { EstudianteExcel } from '../models/EstudiantesExcel';
import { guardarDocente } from '../repositories/docenteRepository';
import { guardarEstudiantes } from '../repositories/estudianteRepository';
import {
  buscarInstitucionPorNombre,
  guardarInstitucion,
} from '../repositories/institucionRepository';
import { subirArchivoExcel } from '../repositories/storageRepository';
import { validarFilaExcel } from '../validators/excelRowValidator';
import { validarEncabezadosExcel } from '../validators/excelValidator';

import { crearDocente } from './docenteService';

interface ProcesarCargaExcelParams {
  docenteNombre: string;
  docenteCorreo: string;
  institucionNombre: string;
  headers: string[];
  estudiantes: EstudianteExcel[];
  nombreArchivo: string;
  contenidoArchivo: Buffer;
}

export async function procesarCargaExcel(
  params: ProcesarCargaExcelParams,
): Promise<void> {
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

  let institucion = await buscarInstitucionPorNombre(params.institucionNombre);

  if (!institucion) {
    institucion = await guardarInstitucion(params.institucionNombre);
  }

  const docente = crearDocente({
    nombreCompleto: params.docenteNombre,
    correoElectronico: params.docenteCorreo,
    institucionId: institucion.id,
  });

  await guardarDocente(docente);
  await guardarEstudiantes(params.estudiantes);
  await subirArchivoExcel(params.nombreArchivo, params.contenidoArchivo);
}
