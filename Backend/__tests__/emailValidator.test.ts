import { validarCorreoElectronico } from '../src/validators/emailValidator';

describe('validarCorreoElectronico', () => {
  it('acepta un correo válido', () => {
    expect(() => validarCorreoElectronico('docente@colegio.com')).not.toThrow();
  });

  it('rechaza un correo inválido', () => {
    expect(() => validarCorreoElectronico('correo-invalido')).toThrow(
      'Correo electrónico inválido',
    );
  });
});
