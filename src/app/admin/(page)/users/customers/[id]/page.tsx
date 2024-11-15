'use client'
import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { BsArrowLeft } from 'react-icons/bs'

const CustomerDetailsPage = ({ params }) => {
   const router = useRouter()
   const id = params.id || ''
   //
   const [userDetails, setUserDetails] = useState<{ [key: string]: string }>({})
   const [notFound, setNotFound] = useState(false)
   const [pageLoading, setPageLoading] = useState<boolean>(true)

   useLayoutEffect(() => {
      getUser()
   }, [id])

   async function getUser() {
      try {
         const res = await adminInstance.get(`/user/read-user/${id}`)
         console.log(res)
         if (res.data.success) {
            setUserDetails(res.data.user)
         }
      } catch (error) {
         setNotFound(true)
         handleApiError(error)
      } finally {
         setPageLoading(false)
      }
   }
   if (pageLoading) {
      return <div>Loading...</div>
   }
   if (!id || notFound) {
      return <div>User not found.</div>
   }
   return (
      <div className='bg-white rounded p-4'>
         <div role='button' className="inline-flex flex-nowrap items-center gap-2 text-slate-400 hover:bg-gray-100 rounded-3xl px-2 py-0.5 mb-4" onClick={() => router.back()}>
            <BsArrowLeft size={20} />
            <span className='text-lg text-[#6a6a6a]'>Customer Details</span>
         </div>
         <ul className='mb-10'>
            <li><strong>Name : </strong> {userDetails?.firstName + ' ' + userDetails?.lastName}</li>
            <li><strong>Email : </strong> {userDetails?.email}</li>
            <li><strong>Role : </strong> {userDetails?.role}</li>
         </ul>
      </div>
   )
}

export default CustomerDetailsPage