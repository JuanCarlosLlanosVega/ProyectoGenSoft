const API_BASE_URL = 'http://localhost:3000/api';

export async function obtenerInstituciones() {
  const response = await fetch(`${API_BASE_URL}/instituciones`);

  if (!response.ok) {
    throw new Error('No se pudieron obtener las instituciones');
  }

  return response.json();
}

export async function crearInstitucion(nombre) {
  const response = await fetch(`${API_BASE_URL}/instituciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo crear la institución');
  }

  return data;
}

export async function registrar(datosRegistro) {
  const response = await fetch(`${API_BASE_URL}/registro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datosRegistro),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo completar el registro');
  }

  return data;
}