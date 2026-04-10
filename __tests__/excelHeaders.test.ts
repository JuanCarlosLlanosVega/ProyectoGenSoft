import { validarEncabezadosExcel } from '../src/validators/excelValidator';

describe('validarEncabezadosExcel', () => {
  it('acepta encabezados válidos', () => {
    const headers = [
      'Nombre estudiante',
      'Apellido estudiante',
      'Primaria/Secundaria',
      'Curso',
      'Fecha de nacimiento',
    ];

    expect(() => validarEncabezadosExcel(headers)).not.toThrow();
  });

  it('rechaza encabezados incorrectos', () => {
    const headers = ['Nombre', 'Apellido', 'Nivel', 'Curso', 'Fecha'];

    expect(() => validarEncabezadosExcel(headers)).toThrow(
      'Encabezados de Excel inválidos',
    );
  });

  it('rechaza cuando falta una columna', () => {
    const headers = [
      'Nombre estudiante',
      'Apellido estudiante',
      'Primaria/Secundaria',
      'Curso',
    ];

    expect(() => validarEncabezadosExcel(headers)).toThrow(
      'Encabezados de Excel inválidos',
    );
  });
});
