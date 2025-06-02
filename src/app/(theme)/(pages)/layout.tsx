import Footer from '@/components/theme/footer'
import Header from '@/components/theme/header'
import React from 'react'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Header />
         <div className='max-w-[1920px] mx-auto'>
            {children}
         </div>
         <Footer />
      </>
   )
}

export default RootLayout