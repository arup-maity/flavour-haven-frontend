import Link from 'next/link'
import React from 'react'

const Managements = () => {
   return (
      <div className='w-full bg-white rounded p-4'>
         <div className="flex items-center justify-between">
            <div className=""></div>
            <div className="">
               <Link href='/admin/users/managements/add-user' className='border border-slate-400 rounded py-1.5 px-4'>Add User</Link>
            </div>
         </div>
      </div>
   )
}

export default Managements