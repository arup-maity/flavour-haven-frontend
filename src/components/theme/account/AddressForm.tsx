'use client'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod";
import { axiosInstance } from '@/config/axios';
type Inputs = {
   fullName: string
   streetAddress: string
   country: string
   city: string
   state: string
   zipCode: string
   phone: string
}

const AddressForm = ({ selectedAddress, setFormOpen }: { selectedAddress: { [key: string]: any }, setFormOpen: () => void }) => {
   const defaultValues = { fullName: '', streetAddress: '', country: '', city: '', state: '', zipCode: '', phone: '' }
   const schemaValidation = z.object({
      fullName: z.string().min(2, "Please enter Full Name"),
      streetAddress: z
         .string()
         .min(15, "Please enter Address"),
      country: z
         .string()
         .min(2, "Please enter Country"),
      city: z
         .string()
         .min(2, "Please enter City"),
      state: z
         .string()
         .min(2, "Please enter State"),
      zipCode: z
         .string()
         .min(2, "Please enter Postal Code"),
      phone: z
         .string()
         .min(2, "Please enter Postal Code"),

   });
   const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>({
      defaultValues,
      mode: "onChange",
      resolver: zodResolver(schemaValidation)
   })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         if (selectedAddress?.id) {
            const response = await axiosInstance.put(`/user/account/update-address`, { ...data, id: selectedAddress.id })
            if (response.data.success) {
               setFormOpen()
            }
         } else {
            const response = await axiosInstance.post(`/user/account/add-address`, data)
            if (response.data.success) {
               setFormOpen()
            }
         }
      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }

   useEffect(() => {
      if (Object.keys(selectedAddress).length > 0) {
         for (const key in defaultValues) {
            setValue(key as keyof Inputs, selectedAddress[key as keyof Inputs])
         }
      }
   }, [selectedAddress])

   return (
      <div className='w-full py-5'>
         <div className="mb-4">
            <p className='text-xl'>Add New Address</p>
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div className="flex flex-wrap -m-2 mb-2">
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>FullName</label>
                  <input {...register("fullName")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.fullName && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>Phone Number</label>
                  <input {...register("phone")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.phone && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
            </div>
            <fieldset className='mb-3'>
               <label htmlFor="" className='block text-sm text-gray-500 mb-1'>streetAddress</label>
               <input {...register("streetAddress")} className='w-full h-9 border border-slate-300 rounded px-2' />
               {errors.streetAddress && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
            </fieldset>
            <div className="flex flex-wrap -m-2">
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>country</label>
                  <input {...register("country")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.country && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>state</label>
                  <input {...register("state")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.state && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
            </div>
            <div className="flex flex-wrap -m-2 mb-2">
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>city</label>
                  <input {...register("city")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.city && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
               <fieldset className='w-full lg:w-6/12 p-2'>
                  <label htmlFor="" className='block text-sm text-gray-500 mb-1'>zipCode</label>
                  <input {...register("zipCode")} className='w-full h-9 border border-slate-300 rounded px-2' />
                  {errors.zipCode && <p className='text-sm text-red-500 mt-1'>This field is required</p>}
               </fieldset>
            </div>
            <fieldset className='flex gap-4'>
               <button type="submit" className='text-base border border-slate-300 rounded py-1 px-4'>Save Address</button>
               <button type="submit" className='text-base bg-gray-200 border border-slate-300 rounded py-1 px-4' onClick={setFormOpen}>Cancel</button>
            </fieldset>
         </form>
      </div>
   )
}

export default AddressForm