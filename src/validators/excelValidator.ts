const HEADERS_ESPERADOS = [
  'Nombre estudiante',
  'Apellido estudiante',
  'Primaria/Secundaria',
  'Curso',
  'Fecha de nacimiento',
];

export function validarEncabezadosExcel(headers: string[]): void {
  const coincide =
    headers.length === HEADERS_ESPERADOS.length &&
    headers.every((header, index) => header === HEADERS_ESPERADOS[index]);

  if (!coincide) {
    throw new Error('Encabezados de Excel inválidos');
  }
}
