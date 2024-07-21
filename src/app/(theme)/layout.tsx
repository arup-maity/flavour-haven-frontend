import Footer from '@/components/theme/footer'
import Header from '@/components/theme/header'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Header />
         {children}
         <Footer />
      </>
   )
}

export default RootLayout