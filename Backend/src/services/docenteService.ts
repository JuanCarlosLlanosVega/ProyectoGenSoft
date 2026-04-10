import { Docente } from '../models/Docente';
import { validarCorreoElectronico } from '../validators/emailValidator';

export function crearDocente(docente: Docente): Docente {
  if (!docente.nombreCompleto.trim()) {
    throw new Error('El nombre completo es obligatorio');
  }

  if (!docente.institucionId.trim()) {
    throw new Error('La institución es obligatoria');
  }

  validarCorreoElectronico(docente.correoElectronico);

  return docente;
}
