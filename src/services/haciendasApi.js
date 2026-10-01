const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.mensaje || 'Error en la solicitud');
  return data;
}

export const haciendasApi = {
  listar: () => request('/haciendas'),
  contar: () => request('/haciendas/contar'),
  crear: (hacienda) => request('/haciendas', { method: 'POST', body: JSON.stringify(hacienda) }),
  actualizar: (id, hacienda) => request(`/haciendas/${id}`, { method: 'PUT', body: JSON.stringify(hacienda) }),
  eliminar: (id) => request(`/haciendas/${id}`, { method: 'DELETE' }),
};
