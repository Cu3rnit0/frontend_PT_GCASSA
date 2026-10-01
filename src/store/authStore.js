import { create } from "zustand";

export const useAuthStore = create((set)=> ({
    isAuthenticated: false,
    login: (usuario, contrasena) => {
        if (usuario ==='devcassa' && contrasena === 'cassa123'){
            set({isAuthenticated: true});
            return true;
        }
        return false;
    },
    logout: ()=> set({isAuthenticated: false}),
}));