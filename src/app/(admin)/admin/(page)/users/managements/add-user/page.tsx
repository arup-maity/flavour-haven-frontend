'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { toast } from 'sonner';
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'

type Inputs = {
   firstName: string
   lastName: string
   email: string
   password: string
}

const ManageUser = () => {
   const defaultValues = { firstName: "", lastName: "", email: "", password: '' }
   const schema = z.object({
      firstName: z.string().min(2, "This field has to be filled."),
      lastName: z.string().min(2, "This field has to be filled."),
      email: z.string().email("Please enter a valid email address").min(2, "Please enter a valid email address"),
      password: z.string().min(1, "This field has to be filled.").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
         "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
      ),
   })
   const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({ defaultValues, mode: 'onChange', resolver: zodResolver(schema) })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const res = await axiosInstance.post(`/user/create-admin-user`, data)
         console.log(res)
         if (res.data.success) {
            toast.success(res.data.message)
         }
      } catch (error) {
         handleApiError(error)
      }
      // const { isPending, error, data } = useQuery({
      //    queryKey: ['repoData'],
      //    queryFn: () =>
      //       axiosInstance.post(`/user/create-admin-user`, { ...data }).then((res) => res.data)
      // })
      // if (error) {
      //    console.error(error)
      // } else if (isPending) {
      //    // Render a loading state
      //    return <div>Loading...</div>
      // } else {
      //    // Render the result
      //    console.log(data)
      // }
   }

   return (
      <div className='w-full bg-white rounded p-4'>
         <div className="text-lg font-medium mb-4">Add User</div>
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
               <input type='password' {...register("password")} className='w-full h-10 text-base bg-transparent border border-slate-400 rounded py-1 px-3' autoComplete='off' />
               {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password.message}</div>}
            </fieldset>
            <button type="submit" className='bg-transparent border border-indigo-500 rounded py-1 px-4'>Add User</button>
         </form>
      </div>
   )
}

export default ManageUser