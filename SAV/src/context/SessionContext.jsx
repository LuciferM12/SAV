import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['session_token']);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPrivileges = async () => {
            try {
                setLoading(true);
                if (cookies.session_token) {
                    // En React podríamos necesitar ajustar la URL base de la API
                    const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
                    const { session_token } = cookies;
                    const response = await axios.get(`${URL}/decode`, {
                        headers: { Authorization: session_token }
                    });
                    setUser(response.data);
                }
            } catch (error) {
                console.log(error);
                // Si hay un error de autenticación, podrías querer descomentar esto:
                // removeCookie('session_token', { path: '/' });
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        getPrivileges();
    }, [cookies, removeCookie]);

    const logout = () => {
        // Aseguramos que la cookie se elimine correctamente
        removeCookie('session_token', { path: '/' });
        setUser(null);
    };

    // El valor del contexto que será accesible para los componentes hijos
    const contextValue = {
        user,
        loading,
        logout,
        isAuthenticated: !!user // Helper para verificar si hay un usuario autenticado
    };

    return (
        <SessionContext.Provider value={contextValue}>
            {children}
        </SessionContext.Provider>
    );
};

// Hook personalizado para usar el contexto
export const useSession = () => {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession debe ser usado dentro de un SessionProvider');
    }
    return context;
};

export default SessionContext;