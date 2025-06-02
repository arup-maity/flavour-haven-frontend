import AdminLayout from '@/components/admin/layout/AdminLayout'
import React, { Suspense } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
   function SearchBarFallback() {
      return <></>
   }
   return (
      <>
         <Suspense fallback={<SearchBarFallback />}>
            <AdminLayout>
               {children}
            </AdminLayout>
         </Suspense>
      </>
   )
}

export default layout