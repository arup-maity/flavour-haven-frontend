'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { sessionContext } from '@/authentication/AuthSession'
import { useRouter } from 'next/navigation'
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { toast } from 'sonner'
import { Ability } from '@/authentication/AccessControl'
import { BsArrowLeft } from 'react-icons/bs'

const DeleteUser = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
   // auth session
   const { session, sessionLoading } = useContext(sessionContext)
   // route
   const router = useRouter()
   const id = searchParams.id || ''
   //
   const [userDetails, setUserDetails] = useState<{ [key: string]: string }>({})
   const [notFound, setNotFound] = useState(false)
   const [loading, setLoading] = useState<boolean>(false)
   const [pageLoading, setPageLoading] = useState<boolean>(false)

   useLayoutEffect(() => {
      getUser()
   }, [id])

   async function getUser() {
      try {
         setPageLoading(true)
         const res = await adminInstance.get(`/user/read/${id}`)
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
   async function deleteUser() {
      try {
         setLoading(true)
         const res = await adminInstance.delete(`/user/delete/${id}`)
         console.log(res)
         if (res.data.success) {
            toast.success(res.data.message)
            router.push('/admin/users/managements')
         }
      } catch (error) {
         handleApiError(error)
      } finally {
         setLoading(false)
      }
   }
   if (sessionLoading && !Ability('delete', 'user', session?.user)) return <div>Loading...</div>
   return (
      <div className='bg-white rounded p-4'>
         <div role='button' className="inline-flex flex-nowrap items-center gap-2 text-slate-400 hover:bg-gray-100 rounded-3xl px-2 py-0.5 mb-4" onClick={() => router.back()}>
            <BsArrowLeft size={20} />
            <span className='text-lg text-[#6a6a6a]'>Delete User</span>
         </div>
         <ul className='mb-10'>
            <li><strong>Name : </strong> {userDetails?.firstName + ' ' + userDetails?.lastName}</li>
            <li><strong>Email : </strong> {userDetails?.email}</li>
            <li><strong>Role : </strong> {userDetails?.role}</li>
         </ul>
         <div className="">
            <button type="button" className='text-base border border-slate-400 rounded py-1 px-4' onClick={deleteUser}>
               {loading ? 'Deleting' : 'Delete User'}
            </button>
         </div>
      </div>
   )
}

export default DeleteUser