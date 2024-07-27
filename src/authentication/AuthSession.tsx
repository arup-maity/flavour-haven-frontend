'use client'
import { axiosInstance } from "@/config/axios";
import React, { useLayoutEffect, useMemo, useState } from "react";

type ContextType = {
   session: {
      login: boolean;
      user: { [key: string]: any }
   };
   sessionLoading: boolean;
}

export const sessionContext = React.createContext<ContextType>({ session: { login: false, user: {} }, sessionLoading: true });

const AuthSessionProvider = ({ children }: { children: React.ReactNode }) => {
   const [session, setSession] = useState({ login: false, user: {} });
   const [sessionLoading, setSessionLoading] = useState(true)
   const contextValue: any = useMemo(() => ({ session, sessionLoading }), [session, sessionLoading]);

   useLayoutEffect(() => {
      getSession()
   }, [])

   async function getSession() {
      try {
         const res = await axiosInstance.get(`/auth/check-token`)
         if (res.data.success && res.data.login) {
            setSession({ login: true, user: res.data.payload })
         }
      } catch (error) {

      } finally {
         setSessionLoading(false)
      }
   }

   return (
      <sessionContext.Provider value={contextValue}>
         {children}
      </sessionContext.Provider>
   )
}

export default AuthSessionProvider