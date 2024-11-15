'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { Ability } from '@/authentication/AccessControl'
import { useRouter } from 'next/navigation'
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { sessionContext } from '@/context/Session'

type Inputs = {
   firstName: string
   lastName: string
   email: string
   role: string
}

const ManageUser = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
   // auth session
   const session = useContext(sessionContext)
   // route
   const router = useRouter()
   const id = searchParams.id || ''
   //
   const [notFound, setNotFound] = useState(false)
   const [loading, setLoading] = useState<boolean>(false)
   // Define the form inputs and validation schema using Zod.
   const defaultValues = { firstName: "", lastName: "", email: "", role: 'manager' }
   const schema = z.object({
      firstName: z.string().min(2, "This field has to be filled."),
      lastName: z.string().min(2, "This field has to be filled."),
      email: z.string().email("Please enter a valid email address").min(2, "Please enter a valid email address"),
      role: z.string().min(2, "Selected one role."),
   })
   const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>({ defaultValues, mode: 'onChange', resolver: zodResolver(schema) })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         setLoading(true)
         const res = await adminInstance.put(`/user/update-user/${id}`, data)
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

   useLayoutEffect(() => {
      getUser()
   }, [id])

   async function getUser() {
      try {
         const res = await adminInstance.get(`/user/read-user/${id}`)
         console.log(res)
         if (res.data.success) {
            for (const key in defaultValues) {
               setValue(key as keyof Inputs, res.data.user[key])
            }
         }
      } catch (error) {
         setNotFound(true)
         handleApiError(error)
      }
   }
   if (session?.loading && !Ability('update', 'user', session?.user)) {
      return <div>Loading...</div>
   }
   if (notFound) {
      return <div>User not found.</div>
   }
   return (
      <div className='w-full bg-white rounded p-4'>
         <div className="flex flex-nowrap items-center gap-2 text-slate-400 mb-4" onClick={() => router.back()}>
            <MdOutlineKeyboardBackspace />
            <span className='text-sm'>Back</span>
         </div>
         <div className="text-xl font-medium mb-4">Update User</div>
         <form onSubmit={handleSubmit(onSubmit)} className='lg:w-6/12 space-y-4'>
            <fieldset>
               <label htmlFor="firstName" className='block text-sm text-slate-600 mb-1'>FirstName</label>
               <input {...register("firstName")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' readOnly />
            </fieldset>
            <fieldset>
               <label htmlFor="lastName" className='block text-sm text-slate-600 mb-1'>LastName</label>
               <input {...register("lastName")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' readOnly />
            </fieldset>
            <fieldset>
               <label htmlFor="email" className='block text-sm text-slate-600 mb-1'>Email</label>
               <input {...register("email")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email.message}</div>}
            </fieldset>
            <fieldset>
               <label htmlFor="password" className='block text-sm text-slate-600 mb-1'>Role</label>
               <select  {...register("role")} className='w-6/12 h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3'>
                  <option value="administrator">Administrator</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="customerSupport">Customer Support</option>
                  <option value="technicalSupport">Technical Support</option>
                  <option value="salesAgent">Sales Agent</option>
                  <option value="deliveryBoy">Delivery Boy</option>
               </select>
               {/* <input type='password' {...register("password")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password.message}</div>} */}
            </fieldset>
            <button type="submit" disabled={loading} className='bg-transparent border border-indigo-500 rounded py-1 px-4'>
               {loading ? 'Updating...' : 'Update User'}
            </button>
         </form>
      </div>
   )
}

export default ManageUser