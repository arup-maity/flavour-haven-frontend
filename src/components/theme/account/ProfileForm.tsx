'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { axiosInstance } from '@/config/axios';
type Inputs = {
   firstName: string
   lastName: string
   email: string
   phoneNumber: string
}

const ProfileForm = ({ profileDetails, setFormOpen }: { profileDetails: { [key: string]: any }, setFormOpen: () => void }) => {
   const defaultValues = { firstName: '', lastName: '', email: '', phoneNumber: '' }
   const schemaValidation = z.object({
      firstName: z.string().min(2, "Please enter First Name"),
      lastName: z.string().min(2, "Please enter Last Name"),
      email: z.string().min(2, "Please enter  Email"),
      phoneNumber: z.string().min(10, "Please enter Phone Number"),
   });
   const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>({
      defaultValues,
      mode: "onSubmit",
      resolver: zodResolver(schemaValidation)
   })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         if (profileDetails?.id) {
            const response = await axiosInstance.put(`/user/account/update-profile`, data)
            if (response.data.success) {
               setFormOpen()
            }
         }
      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }

   useEffect(() => {
      if (Object.keys(profileDetails).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof Inputs, profileDetails[key as keyof Inputs])
         }
      }
   }, [profileDetails])

   return (
      <div className='w-full py-5'>
         <div className="mb-4">
            <p className='text-xl'>Add New Address</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className="flex flex-wrap -m-2 mb-2">
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>FirstName</label>
                  <input {...register("firstName")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.firstName && <p className='text-sm text-red-500 mt-1'>{errors.firstName.message}</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>LastName</label>
                  <input {...register("lastName")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.lastName && <p className='text-sm text-red-500 mt-1'>{errors.lastName.message}</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>Email</label>
                  <input {...register("email")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.email && <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>Phone Number</label>
                  <input {...register("phoneNumber")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.phoneNumber && <p className='text-sm text-red-500 mt-1'>{errors.phoneNumber.message}</p>}
               </fieldset>
            </div>
            <fieldset className='flex gap-4'>
               <button type="submit" className='text-base border border-slate-300 rounded py-1 px-4'>Save</button>
               <button type="submit" className='text-base bg-gray-200 border border-slate-300 rounded py-1 px-4' onClick={setFormOpen}>Cancel</button>
            </fieldset>
         </form>
      </div>
   )
}

export default ProfileForm