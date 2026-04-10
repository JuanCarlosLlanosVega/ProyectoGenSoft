import { registrar } from './services/api.js';

const form = document.getElementById('registroForm');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const docenteNombre = document.getElementById('docenteNombre').value.trim();
  const docenteCorreo = document.getElementById('docenteCorreo').value.trim();
  const institucionNombre = document
    .getElementById('institucionNombre')
    .value.trim();

  const payload = {
    docenteNombre,
    docenteCorreo,
    institucionNombre,
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
  };

  try {
    const data = await registrar(payload);
    resultado.innerHTML = `<p class="ok">✅ ${data.mensaje}</p>`;
  } catch (error) {
    resultado.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  }
});