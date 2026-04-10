import { addDoc, collection } from 'firebase/firestore';

import { db } from '../config/firebase';
import { EstudianteExcel } from '../models/EstudiantesExcel';

const COLECCION = 'estudiantes';

export async function guardarEstudiante(
  estudiante: EstudianteExcel,
): Promise<EstudianteExcel> {
  await addDoc(collection(db, COLECCION), estudiante);
  return estudiante;
}

export async function guardarEstudiantes(
  estudiantes: EstudianteExcel[],
): Promise<EstudianteExcel[]> {
  for (const estudiante of estudiantes) {
    await guardarEstudiante(estudiante);
  }

  return estudiantes;
}
