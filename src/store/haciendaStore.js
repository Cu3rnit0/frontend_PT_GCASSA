import { create } from 'zustand';
import { haciendasApi } from '../services/haciendasApi';

export const useHaciendaStore = create((set) => {
  const recargar = async () => {
    try {
      const haciendas = await haciendasApi.listar();
      set({ haciendas });
    } catch {
      
    }
  };

  return {
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
      await haciendasApi.crear(datos);
      await recargar();
    },

    actualizarHacienda: async (id, datos) => {
      await haciendasApi.actualizar(id, datos);
      await recargar();
    },

    eliminarHacienda: async (id) => {
      await haciendasApi.eliminar(id);
      await recargar();
    },
  };
});
