export function validarCorreoElectronico(correo: string): void {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(correo)) {
    throw new Error('Correo electrónico inválido');
  }
}
