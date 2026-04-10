import { obtenerOCrearInstitucion } from '../src/services/institucionService';

describe('obtenerOCrearInstitucion', () => {
  it('crea una institución si no existe', () => {
    const institucion = obtenerOCrearInstitucion('Colegio Bolívar');

    expect(institucion.nombre).toBe('Colegio Bolívar');
    expect(institucion.id).toContain('inst-');
  });

  it('devuelve la misma institución si ya existe', () => {
    const inst1 = obtenerOCrearInstitucion('Colegio Sucre');
    const inst2 = obtenerOCrearInstitucion('Colegio Sucre');

    expect(inst1.id).toBe(inst2.id);
  });

  it('rechaza nombre vacío', () => {
    expect(() => obtenerOCrearInstitucion('')).toThrow(
      'El nombre de la institución es obligatorio',
    );
  });
});
