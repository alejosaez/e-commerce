"use client"

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";
import { getCookie } from "cookies-next";

// Definimos el tipo para el estado del contexto
type AppContextType = {
    token?: string;
    setToken: Dispatch<SetStateAction<string | undefined>>
    userId?: string;
    setUserId: Dispatch<SetStateAction<string | undefined>>
    userRole?: string;
};

const AppContext = createContext<AppContextType>({token: "", setToken: () => "", userId: "", setUserId: () => "",  userRole: ""});

// Esta funcion permite configurar el contexto en toda la aplicacion
export function AppWrapper({ children }: {
    children: React.ReactNode
}) {
   
    const [token, setToken] = useState<string | undefined>(getCookie("access-token" as string))
    const [userId, setUserId] = useState<string | undefined>(getCookie("user-id" as string))
    const [userRole, setUserRole] = useState<string | undefined>(getCookie("user-role" as string))

    const value : AppContextType = {
        token, userId, userRole, setToken, setUserId
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Esta funcion accede al valor del value del Contexto, recupera el contexto
export function useAppContext(){
    return useContext(AppContext)
}
