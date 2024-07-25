'use client'
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from "zod"

const LoginPage = () => {
   const router = useRouter()
   //
   const [showPassword, setShowPassword] = useState(false)
   //
   const defaultValues = { email: '', password: '', remeberMe: false }
   const schema = z.object({
      email: z.string().email().min(1, 'Enter your email'),
      password: z.string().min(8)
   })
   const { register, handleSubmit, formState: { errors }, } = useForm({ defaultValues, mode: 'onChange', resolver: zodResolver(schema) })

   const onSubmit = async (data: any) => {
      try {
         const res = await axiosInstance.post(`/auth/admin-login`, data)
         console.log(res)
         if (res.data.success) {
            toast.success(res.data.message)
            router.push('/admin')
         }
      } catch (error) {
         handleApiError(error)
      }
   }

   return (
      <div className="w-full min-h-screen flex items-center">
         <div className="w-4/12 mx-auto">
            <div className="text-center mb-6">
               <h2 className="text-3xl md:text-4xl font-extrabold">Sign in</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-6">
                  <label className="block mb-2 font-extrabold" htmlFor="">Email</label>
                  <input {...register("email")} className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" placeholder="email" />
                  {
                     errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>
                  }
               </div>
               <div className="mb-6">
                  <label className="block mb-2 font-extrabold" htmlFor="">Password</label>
                  <input type={showPassword ? 'text' : 'password'} {...register("password")} className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" placeholder="password" />
                  {
                     errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>
                  }
               </div>
               <div className="flex flex-wrap -mx-4 mb-6 items-center justify-between">
                  <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
                     <label htmlFor="">
                        <input type="checkbox" className='w-4 h-4' />
                        <span className="ml-1 font-extrabold">Remember me</span>
                     </label>
                  </div>
                  <div className="w-full lg:w-auto px-4"><a className="inline-block font-extrabold hover:underline" href="#">Forgot your
                     password?</a></div>
               </div>
               <button type='submit' className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">Sign in</button>
            </form>
         </div>
      </div>
   )
}

export default LoginPage