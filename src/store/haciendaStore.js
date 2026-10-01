import { create } from 'zustand';
import { haciendasApi } from '../services/haciendasApi';

export const useHaciendaStore = create((set) => ({
  haciendas: [],
  loading: false,
  error: null,

  fetchHaciendas: async () => {
    set({ loading: true, error: null });
    try {
      const haciendas = await haciendasApi.listar();
      set({ haciendas, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  crearHacienda: async (datos) => {
    const nueva = await haciendasApi.crear(datos);
    set((s) => ({ haciendas: [nueva, ...s.haciendas] }));
  },

  actualizarHacienda: async (id, datos) => {
    const actualizada = await haciendasApi.actualizar(id, datos);
    set((s) => ({ haciendas: s.haciendas.map((h) => (h.id === id ? actualizada : h)) }));
  },

  eliminarHacienda: async (id) => {
    await haciendasApi.eliminar(id);
    set((s) => ({ haciendas: s.haciendas.filter((h) => h.id !== id) }));
  },
}));
