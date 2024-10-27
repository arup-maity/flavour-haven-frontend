import React from 'react'
import type { Metadata } from 'next'
import Header from '@/components/theme/header'

export const metadata: Metadata = {
   title: 'Food Search || Flavour Heaven',
   description: 'This page for food search'
}

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Header />
         {children}
      </>
   )
}

export default SearchLayout