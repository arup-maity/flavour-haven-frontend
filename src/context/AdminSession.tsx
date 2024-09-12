// 'use client'
// import { axiosInstance } from "@/config/axios";
// import { useRouter } from "next/navigation";
// import React, { useLayoutEffect, useState } from "react";

// type ContextType = {
//    login: boolean;
//    user: { [key: string]: any }
// }

// export const sessionContext = React.createContext<ContextType>({
//    login: false,
//    user: {},
// });

// export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
//    const router = useRouter()
//    const [session, setSession] = useState({ login: false, user: {} });

//    useLayoutEffect(() => {
//       getSession()
//    }, [router])

//    function getSession() {
//       const data = localStorage.getItem('userDetails') || ''
//       if (data) {
//          const payload = JSON.parse(data)
//          const currentTime = Math.floor(Date.now() / 1000);
//          if (currentTime < payload.exp) {
//             setSession({ login: true, user: payload })
//          } else {
//             storeUserDetails()
//          }
//       } else {
//          storeUserDetails()
//       }
//    }

//    async function storeUserDetails() {
//       await axiosInstance(`auth/check-token`)
//          .then((res) => {
//             if (res.data.success) {
//                setSession({ login: true, user: res.data.payload })
//                localStorage.setItem('userDetails', JSON.stringify(res.data.payload))
//             }
//          }).catch((error) => { console.log('Token expire') })
//    }

//    return (
//       <sessionContext.Provider value={session}>
//          {children}
//       </sessionContext.Provider>
//    )
// }