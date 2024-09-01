import AdminLayout from '@/components/admin/layout/AdminLayout'
import React, { Suspense } from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
   function SearchBarFallback() {
      return <>placeholder</>
    }
   return (
      <AdminLayout>
          <Suspense fallback={<SearchBarFallback />}>
         {children}
         </Suspense>
      </AdminLayout>
   )
}

export default layout