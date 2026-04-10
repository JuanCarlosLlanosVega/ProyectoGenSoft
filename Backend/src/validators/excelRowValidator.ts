import { EstudianteExcel } from '../models/EstudiantesExcel';

export function validarFilaExcel(estudiante: EstudianteExcel): void {
  if (!estudiante.nombreEstudiante.trim()) {
    throw new Error('El nombre del estudiante es obligatorio');
  }

  if (!estudiante.apellidoEstudiante.trim()) {
    throw new Error('El apellido del estudiante es obligatorio');
  }

  if (estudiante.nivel !== 'Primaria' && estudiante.nivel !== 'Secundaria') {
    throw new Error('El nivel debe ser Primaria o Secundaria');
  }

  if (estudiante.curso < 1 || estudiante.curso > 6) {
    throw new Error('El curso debe estar entre 1 y 6');
  }

  if (Number.isNaN(Date.parse(estudiante.fechaNacimiento))) {
    throw new Error('La fecha de nacimiento es inválida');
  }
}
