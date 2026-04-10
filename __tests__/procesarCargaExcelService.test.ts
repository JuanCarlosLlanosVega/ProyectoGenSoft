import { guardarDocente } from '../src/repositories/docenteRepository';
import { guardarEstudiantes } from '../src/repositories/estudianteRepository';
import {
  buscarInstitucionPorNombre,
  guardarInstitucion,
} from '../src/repositories/institucionRepository';
import { subirArchivoExcel } from '../src/repositories/storageRepository';
import { procesarCargaExcel } from '../src/services/procesarCargaExcelService';

jest.mock('../src/repositories/institucionRepository', () => ({
  buscarInstitucionPorNombre: jest.fn(),
  guardarInstitucion: jest.fn(),
}));

jest.mock('../src/repositories/docenteRepository', () => ({
  guardarDocente: jest.fn(),
}));

jest.mock('../src/repositories/estudianteRepository', () => ({
  guardarEstudiantes: jest.fn(),
}));

jest.mock('../src/repositories/storageRepository', () => ({
  subirArchivoExcel: jest.fn(),
}));

describe('procesarCargaExcel', () => {
  const headersValidos = [
    'Nombre estudiante',
    'Apellido estudiante',
    'Primaria/Secundaria',
    'Curso',
    'Fecha de nacimiento',
  ];

  const estudiantesValidos = [
    {
      nombreEstudiante: 'Ana',
      apellidoEstudiante: 'López',
      nivel: 'Primaria' as const,
      curso: 3,
      fechaNacimiento: '2015-04-10',
    },
  ];

  const archivoBuffer = Buffer.from('archivo de prueba');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('registra correctamente cuando la institución ya existe', async () => {
    (buscarInstitucionPorNombre as jest.Mock).mockResolvedValue({
      id: 'inst-001',
      nombre: 'Colegio Bolívar',
    });

    (guardarDocente as jest.Mock).mockResolvedValue(undefined);
    (guardarEstudiantes as jest.Mock).mockResolvedValue(undefined);
    (subirArchivoExcel as jest.Mock).mockResolvedValue('https://archivo-url.com');

    await expect(
      procesarCargaExcel({
        docenteNombre: 'Juan Pérez',
        docenteCorreo: 'juan@colegio.com',
        institucionNombre: 'Colegio Bolívar',
        headers: headersValidos,
        estudiantes: estudiantesValidos,
        nombreArchivo: 'estudiantes.xlsx',
        contenidoArchivo: archivoBuffer,
      }),
    ).resolves.not.toThrow();

    expect(buscarInstitucionPorNombre).toHaveBeenCalledWith('Colegio Bolívar');
    expect(guardarInstitucion).not.toHaveBeenCalled();
    expect(guardarDocente).toHaveBeenCalledTimes(1);
    expect(guardarEstudiantes).toHaveBeenCalledWith(estudiantesValidos);
    expect(subirArchivoExcel).toHaveBeenCalledWith('estudiantes.xlsx', archivoBuffer);
  });

  it('crea la institución si no existe', async () => {
    (buscarInstitucionPorNombre as jest.Mock).mockResolvedValue(null);
    (guardarInstitucion as jest.Mock).mockResolvedValue({
      id: 'inst-002',
      nombre: 'Colegio Nuevo',
    });
    (guardarDocente as jest.Mock).mockResolvedValue(undefined);
    (guardarEstudiantes as jest.Mock).mockResolvedValue(undefined);
    (subirArchivoExcel as jest.Mock).mockResolvedValue('https://archivo-url.com');

    await procesarCargaExcel({
      docenteNombre: 'María Pérez',
      docenteCorreo: 'maria@colegio.com',
      institucionNombre: 'Colegio Nuevo',
      headers: headersValidos,
      estudiantes: estudiantesValidos,
      nombreArchivo: 'estudiantes.xlsx',
      contenidoArchivo: archivoBuffer,
    });

    expect(guardarInstitucion).toHaveBeenCalledWith('Colegio Nuevo');
  });

  it('rechaza nombre de docente vacío', async () => {
    await expect(
      procesarCargaExcel({
        docenteNombre: '',
        docenteCorreo: 'juan@colegio.com',
        institucionNombre: 'Colegio Bolívar',
        headers: headersValidos,
        estudiantes: estudiantesValidos,
        nombreArchivo: 'estudiantes.xlsx',
        contenidoArchivo: archivoBuffer,
      }),
    ).rejects.toThrow('El nombre completo es obligatorio');

    expect(guardarDocente).not.toHaveBeenCalled();
    expect(guardarEstudiantes).not.toHaveBeenCalled();
    expect(subirArchivoExcel).not.toHaveBeenCalled();
  });

  it('rechaza correo inválido', async () => {
    await expect(
      procesarCargaExcel({
        docenteNombre: 'Juan Pérez',
        docenteCorreo: 'correo-malo',
        institucionNombre: 'Colegio Bolívar',
        headers: headersValidos,
        estudiantes: estudiantesValidos,
        nombreArchivo: 'estudiantes.xlsx',
        contenidoArchivo: archivoBuffer,
      }),
    ).rejects.toThrow('Correo electrónico inválido');
  });

  it('rechaza encabezados inválidos y detiene el proceso', async () => {
    await expect(
      procesarCargaExcel({
        docenteNombre: 'Juan Pérez',
        docenteCorreo: 'juan@colegio.com',
        institucionNombre: 'Colegio Bolívar',
        headers: ['Nombre', 'Apellido', 'Nivel'],
        estudiantes: estudiantesValidos,
        nombreArchivo: 'estudiantes.xlsx',
        contenidoArchivo: archivoBuffer,
      }),
    ).rejects.toThrow('Encabezados de Excel inválidos');

    expect(guardarDocente).not.toHaveBeenCalled();
    expect(guardarEstudiantes).not.toHaveBeenCalled();
    expect(subirArchivoExcel).not.toHaveBeenCalled();
  });

  it('rechaza una fila inválida y detiene el proceso', async () => {
    const estudiantesInvalidos = [
      {
        nombreEstudiante: '',
        apellidoEstudiante: 'López',
        nivel: 'Primaria' as const,
        curso: 3,
        fechaNacimiento: '2015-04-10',
      },
    ];

    await expect(
      procesarCargaExcel({
        docenteNombre: 'Juan Pérez',
        docenteCorreo: 'juan@colegio.com',
        institucionNombre: 'Colegio Bolívar',
        headers: headersValidos,
        estudiantes: estudiantesInvalidos,
        nombreArchivo: 'estudiantes.xlsx',
        contenidoArchivo: archivoBuffer,
      }),
    ).rejects.toThrow('El nombre del estudiante es obligatorio');

    expect(guardarDocente).not.toHaveBeenCalled();
    expect(guardarEstudiantes).not.toHaveBeenCalled();
    expect(subirArchivoExcel).not.toHaveBeenCalled();
  });
});
