'use client'
import React, { useState } from 'react'

import { z } from "zod"
import { toast } from 'sonner'
import { useForm } from "react-hook-form"

import Link from 'next/link'
import { handleApiError } from '@/utils'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { axiosInstance } from '@/config/axios'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useMutation } from '@tanstack/react-query'

const schemaValidation = z.object({
   email: z.string().email().min(1, 'Enter your email'),
   password: z.string().min(8)
})
type formType = z.infer<typeof schemaValidation>
const LoginPage = () => {
   const router = useRouter()
   const [showPassword, setShowPassword] = useState(false)
   const defaultValues = { email: '', password: '', remeberMe: false }

   const { register, handleSubmit, formState: { errors }, } = useForm<formType>({
      defaultValues,
      mode: 'onSubmit',
      resolver: zodResolver(schemaValidation)
   })
   const loginMutation = useMutation({
      mutationKey: ["admin-login"],
      mutationFn: (data: formType) => axiosInstance.post(`/auth/admin-login`, data).then(res => res.data),
      onSuccess: (data) => {
         if (data?.success) {
            router.push("/admin")
            toast.success("Login successfully")
         }
      },
      onError: (error) => {
         handleApiError(error)
      }
   })
   const onSubmit = async (data: any) => loginMutation.mutate(data)

   return (
      <div className="w-full min-h-screen flex items-center">
         <div className="w-11/12 lg:w-4/12 mx-auto">
            <div className="text-center mb-6">
               <h2 className="text-3xl md:text-4xl font-extrabold">Sign in</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="mb-4">
                  <label className="block text-gray-600 text-base font-medium mb-1" htmlFor="">Email</label>
                  <Input {...register("email")} placeholder="" />
                  {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>}
               </div>
               <div className="mb-4">
                  <label className="block text-gray-600 text-base font-medium mb-1" htmlFor="">Password</label>
                  <div className="relative">
                     <Input type={showPassword ? 'text' : 'password'} {...register("password")} placeholder="password" />
                     <div className="absolute top-2.5 right-2" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                     </div>
                  </div>
                  {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p>}
               </div>
               <div className="flex gap-4 mb-6 items-center justify-between">
                  <div className="flex gap-1">
                     <Checkbox id="terms1" />
                     <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                     >
                        Remember me
                     </label>
                  </div>
                  <Link
                     href="/admin/forget-password"
                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                     Forgot your password?
                  </Link>
               </div>
               <Button disabled={loginMutation.isPending} className='w-full h-11 text-lg bg-[#195A00] hover:bg-[#195A00]/80'>
                  {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
               </Button>
            </form>
         </div>
      </div>
   )
}

export default LoginPage