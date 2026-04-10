export interface EstudianteExcel {
  nombreEstudiante: string;
  apellidoEstudiante: string;
  nivel: 'Primaria' | 'Secundaria';
  curso: number;
  fechaNacimiento: string;
}
