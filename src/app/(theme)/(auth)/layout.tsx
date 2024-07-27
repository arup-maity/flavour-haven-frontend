import Header from '@/components/theme/header'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Header />
         {children}
      </>
   )
}

export default RootLayout