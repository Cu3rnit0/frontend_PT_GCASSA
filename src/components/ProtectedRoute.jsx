import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Children } from "react";

export default function ProtectedRoute ({}) {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (!isAuthenticated){
        return <Navigate to="/login"replace/>
    }

    return Children;
}
