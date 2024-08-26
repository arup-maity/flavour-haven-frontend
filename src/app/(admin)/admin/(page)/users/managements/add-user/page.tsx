'use client'
import React, { useContext, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { sessionContext } from '@/authentication/AuthSession'
import { Ability } from '@/authentication/AccessControl'
import { useRouter } from 'next/navigation'
import { BsArrowLeft } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type Inputs = {
   firstName: string
   lastName: string
   email: string
   password: string
   role: string
}

const AddUser = () => {
   // auth session
   const { session, sessionLoading } = useContext(sessionContext)
   // route
   const router = useRouter()
   //
   const [showPassword, setShowPassword] = useState<boolean>(false)
   const [loading, setLoading] = useState<boolean>(false)
   // Define the form inputs and validation schema using Zod.
   const defaultValues = { firstName: "", lastName: "", email: "", password: '', role: 'manager' }
   const schema = z.object({
      firstName: z.string().min(2, "This field has to be filled."),
      lastName: z.string().min(2, "This field has to be filled."),
      email: z.string().email("Please enter a valid email address").min(2, "Please enter a valid email address"),
      password: z.string().min(1, "This field has to be filled.").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
         "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      ),
      role: z.string().min(2, "Selected one role."),
   })
   const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({ defaultValues, mode: 'onSubmit', resolver: zodResolver(schema) })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         setLoading(true)
         const res = await axiosInstance.post(`/user/create-admin-user`, data)
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

   if (sessionLoading && !Ability('create', 'user', session?.user)) {
      return <div>Loading...</div>
   }
   return (
      <div className='w-full bg-white rounded p-4'>
         <div role='button' className="inline-flex flex-nowrap items-center gap-2 text-slate-400 hover:bg-gray-100 rounded-3xl px-2 py-0.5 mb-4" onClick={() => router.back()}>
            <BsArrowLeft size={20} />
            <span className='text-lg text-[#6a6a6a]'>Add User</span>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className='lg:w-6/12 space-y-4'>
            <fieldset>
               <label htmlFor="firstName" className='block text-sm text-slate-600 mb-1'>FirstName</label>
               <input {...register("firstName")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.firstName && <div className="text-xs text-red-500 mt-1">{errors.firstName.message}</div>}
            </fieldset>
            <fieldset>
               <label htmlFor="lastName" className='block text-sm text-slate-600 mb-1'>LastName</label>
               <input {...register("lastName")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.lastName && <div className="text-xs text-red-500 mt-1">{errors.lastName.message}</div>}
            </fieldset>
            <fieldset>
               <label htmlFor="email" className='block text-sm text-slate-600 mb-1'>Email</label>
               <input {...register("email")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email.message}</div>}
            </fieldset>
            <fieldset>
               <label htmlFor="password" className='block text-sm text-slate-600 mb-1'>Password</label>
               <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} {...register("password")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
                  <div className="absolute top-2.5 right-2" onClick={() => setShowPassword(prev => !prev)}>
                     {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                  </div>
               </div>
               {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password.message}</div>}
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
            </fieldset>
            <button type="submit" disabled={loading} className='bg-transparent hover:bg-blue-500 hover:text-white border border-blue-500 rounded py-1 px-4'>
               {loading ? 'Adding' : 'Add New User'}
            </button>
         </form>
      </div>
   )
}

export default AddUser