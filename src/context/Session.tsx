'use client'
import { axiosInstance } from "@/config/axios";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect, useState } from "react";

type ContextType = {
   loading: boolean;
   login: boolean;
   user: { [key: string]: any }
}

export const sessionContext = React.createContext<ContextType>({
   loading: true,
   login: false,
   user: {},
});

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter()
   const [session, setSession] = useState({ loading: true, login: false, user: {} });

   useLayoutEffect(() => {
      getSession()
   }, [router])

   function getSession() {
      const data = localStorage.getItem('userDetails') || ''
      if (data) {
         try {
            const payload = JSON.parse(data);
            const currentTime = Math.floor(Date.now() / 1000);
            const oneMinuteBeforeExp = payload.exp - 60; // Subtract 60 seconds (1 minute)

            if (currentTime < oneMinuteBeforeExp) {
               setSession(prev => ({ ...prev, login: true, user: payload }));
            } else {
               storeUserDetails();
            }
         } catch (error) {
            storeUserDetails();
         }
      } else {
         storeUserDetails();
      }
      setSession(prev => ({ ...prev, loading: false }))
   }

   async function storeUserDetails() {
      await axiosInstance(`auth/verify-token`)
         .then((res) => {
            if (res.data.success) {
               setSession(prev => ({ ...prev, login: true, user: res.data.decoded }))
               localStorage.setItem('userDetails', JSON.stringify(res.data.decoded))
            }
         }).catch((error) => { console.log('Token expire') })
   }

   return (
      <sessionContext.Provider value={session}>
         {children}
      </sessionContext.Provider>
   )
}