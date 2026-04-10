import { Docente } from '../src/models/Docente';
import { crearDocente } from '../src/services/docenteService';

describe('crearDocente', () => {
  it('crea un docente válido', () => {
    const docente: Docente = {
      nombreCompleto: 'Juan Pérez',
      correoElectronico: 'juan@colegio.com',
      institucionId: 'inst-001',
    };

    expect(() => crearDocente(docente)).not.toThrow();
  });

  it('rechaza nombre vacío', () => {
    const docente: Docente = {
      nombreCompleto: '',
      correoElectronico: 'juan@colegio.com',
      institucionId: 'inst-001',
    };

    expect(() => crearDocente(docente)).toThrow('El nombre completo es obligatorio');
  });

  it('rechaza institución vacía', () => {
    const docente: Docente = {
      nombreCompleto: 'Juan Pérez',
      correoElectronico: 'juan@colegio.com',
      institucionId: '',
    };

    expect(() => crearDocente(docente)).toThrow('La institución es obligatoria');
  });

  it('rechaza correo inválido', () => {
    const docente: Docente = {
      nombreCompleto: 'Juan Pérez',
      correoElectronico: 'correo-malo',
      institucionId: 'inst-001',
    };

    expect(() => crearDocente(docente)).toThrow('Correo electrónico inválido');
  });
});
