require('dotenv').config();

const {
  procesarRegistroLocal,
} = require('./dist/src/services/procesarRegistroLocalService');

async function main() {
  try {
    const resultado = await procesarRegistroLocal({
      docenteNombre: 'Juan Pérez',
      docenteCorreo: 'juan@colegio.com',
      institucionNombre: 'Colegio Bolívar',
      headers: [
        'Nombre estudiante',
        'Apellido estudiante',
        'Primaria/Secundaria',
        'Curso',
        'Fecha de nacimiento',
      ],
      estudiantes: [
        {
          nombreEstudiante: 'Ana',
          apellidoEstudiante: 'López',
          nivel: 'Primaria',
          curso: 3,
          fechaNacimiento: '2015-04-10',
        },
      ],
      nombreArchivo: 'estudiantes.xlsx',
    });

    console.log('✅', resultado.mensaje);
    console.log('Docente:', resultado.docente);
    console.log('Institución:', resultado.institucion);
    console.log('Estudiantes:', resultado.estudiantes);
    console.log('Archivo:', resultado.archivo);
  } catch (error) {
    console.error('❌ Error en el registro:', error.message);
  }
}

main();
