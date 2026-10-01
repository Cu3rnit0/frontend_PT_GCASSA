import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const USUARIO = 'devcassa';
const CONTRASENA = 'cassa123';

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (usuario, contrasena) => {
        if (usuario === USUARIO && contrasena === CONTRASENA) {
          set({ isAuthenticated: true, user: usuario });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
        useAuthStore.persist.clearStorage(); // limpia la sesión guardada
      },
    }),
    {
      name: 'cassa-auth',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
