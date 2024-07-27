'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { sessionContext } from '@/authentication/AuthSession'
import { useRouter, useSearchParams } from 'next/navigation'
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { toast } from 'sonner'
import { Ability } from '@/authentication/AccessControl'

const DeleteUser = () => {
   // auth session
   const { session, sessionLoading } = useContext(sessionContext)
   // route
   const router = useRouter()
   const search = useSearchParams()
   const id: string = search.get('id') || ''
   //
   const [userDetails, setUserDetails] = useState<any>([])
   const [notFound, setNotFound] = useState(false)
   const [loading, setLoading] = useState<boolean>(false)

   useLayoutEffect(() => {
      getUser()
   }, [id])

   async function getUser() {
      try {
         const res = await axiosInstance.get(`/user/read-admin-user/${id}`)
         console.log(res)
         if (res.data.success) {
            setUserDetails(res.data.user)
         }
      } catch (error) {
         setNotFound(true)
         handleApiError(error)
      }
   }
   async function deleteUser() {
      try {
         setLoading(true)
         const res = await axiosInstance.delete(`/user/delete-admin-user/${id}`)
         console.log(res)
         if (res.data.success) {
            toast.success(res.data.message)
            router.back()
         }
      } catch (error) {
         handleApiError(error)
      } finally {
         setLoading(false)
      }
   }
   if (sessionLoading && !Ability('delete', 'user', session?.user)) {
      return <div>Loading...</div>
   }
   return (
      <div>
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