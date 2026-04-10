import { EstudianteExcel } from '../src/models/EstudiantesExcel';
import { validarFilaExcel } from '../src/validators/excelRowValidator';

describe('validarFilaExcel', () => {
  it('acepta una fila válida', () => {
    const estudiante: EstudianteExcel = {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: 'López',
      nivel: 'Primaria',
      curso: 3,
      fechaNacimiento: '2015-04-10',
    };

    expect(() => validarFilaExcel(estudiante)).not.toThrow();
  });

  it('rechaza nombre vacío', () => {
    const estudiante: EstudianteExcel = {
      nombreEstudiante: '',
      apellidoEstudiante: 'López',
      nivel: 'Primaria',
      curso: 3,
      fechaNacimiento: '2015-04-10',
    };

    expect(() => validarFilaExcel(estudiante)).toThrow(
      'El nombre del estudiante es obligatorio',
    );
  });

  it('rechaza apellido vacío', () => {
    const estudiante: EstudianteExcel = {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: '',
      nivel: 'Primaria',
      curso: 3,
      fechaNacimiento: '2015-04-10',
    };

    expect(() => validarFilaExcel(estudiante)).toThrow(
      'El apellido del estudiante es obligatorio',
    );
  });

  it('rechaza nivel inválido', () => {
    const estudiante = {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: 'López',
      nivel: 'Inicial',
      curso: 3,
      fechaNacimiento: '2015-04-10',
    } as unknown as EstudianteExcel;

    expect(() => validarFilaExcel(estudiante)).toThrow(
      'El nivel debe ser Primaria o Secundaria',
    );
  });

  it('rechaza curso fuera de rango', () => {
    const estudiante: EstudianteExcel = {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: 'López',
      nivel: 'Primaria',
      curso: 7,
      fechaNacimiento: '2015-04-10',
    };

    expect(() => validarFilaExcel(estudiante)).toThrow('El curso debe estar entre 1 y 6');
  });

  it('rechaza fecha inválida', () => {
    const estudiante: EstudianteExcel = {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: 'López',
      nivel: 'Primaria',
      curso: 3,
      fechaNacimiento: 'fecha-mala',
    };

    expect(() => validarFilaExcel(estudiante)).toThrow(
      'La fecha de nacimiento es inválida',
    );
  });
});
