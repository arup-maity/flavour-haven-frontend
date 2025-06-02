'use client'
import React from 'react'

import { z } from "zod"
import { toast } from 'sonner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { handleApiError } from '@/utils'
import { adminInstance } from '@/config/axios'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, PasswordInput } from '@/components/ui/input'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from 'lucide-react'


const schemaValidation = z.object({
   firstName: z.string().min(2, "This field has to be filled."),
   lastName: z.string().min(2, "This field has to be filled."),
   email: z.string().email("Please enter a valid email address").min(2, "Please enter a valid email address"),
   password: z.string().min(1, "This field has to be filled.").regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
      "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
   ),
   role: z.string().min(2, "Selected one role."),
})
export type UserFormType = z.infer<typeof schemaValidation>
const EditUser = ({ open, close, userDetails }) => {
   const defaultValues = { firstName: "", lastName: "", email: "", password: '', role: 'manager' }
   const { register, handleSubmit, control, formState: { errors }, } = useForm<UserFormType>({
      defaultValues,
      mode: 'onSubmit',
      resolver: zodResolver(schemaValidation)
   })
   const createMutation = useMutation({
      mutationFn: async (data: UserFormType) => await adminInstance.post(`/user/create-user`, data),
      onSuccess: (data) => {
         toast.success('User created successfully.')
         close()
      },
      onError: (error) => {
         handleApiError(error)
      },
      retry: false,
   })
   const onSubmit: SubmitHandler<UserFormType> = (data) => {
      createMutation.mutate(data)
   }
   return (
      <Sheet open={open} onOpenChange={close}>
         <SheetContent className='w-8/12 lg:w-6/12 flex flex-col px-1 py-4'>
            <SheetHeader className='px-6'>
               <SheetTitle className='text-xl'>Add New User</SheetTitle>
               <SheetDescription className='hidden'></SheetDescription>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className='flex-grow flex flex-col overflow-y-auto'>
               <PerfectScrollbar className='px-6'>
                  <div className="w-10/12 space-y-4">
                     <fieldset>
                        <label htmlFor="firstName" className='block text-sm text-slate-600 mb-1'>FirstName</label>
                        <Input {...register("firstName")} />
                        {errors.firstName && <div className="text-xs text-red-500 mt-1">{errors.firstName.message}</div>}
                     </fieldset>
                     <fieldset>
                        <label htmlFor="lastName" className='block text-sm text-slate-600 mb-1'>LastName</label>
                        <Input  {...register("lastName")} />
                        {errors.lastName && <div className="text-xs text-red-500 mt-1">{errors.lastName.message}</div>}
                     </fieldset>
                     <fieldset>
                        <label htmlFor="email" className='block text-sm text-slate-600 mb-1'>Email</label>
                        <Input {...register("email")} />
                        {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email.message}</div>}
                     </fieldset>
                     <fieldset>
                        <label htmlFor="password" className='block text-sm text-slate-600 mb-1'>Password</label>
                        <PasswordInput {...register("password")} />
                        {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password.message}</div>}
                     </fieldset>
                     <fieldset>
                        <label htmlFor="password" className='block text-sm text-slate-600 mb-1'>Role</label>
                        <Controller
                           name="role"
                           control={control}
                           render={({ field }) => (
                              <Select value={field.value} onValueChange={field.onChange}>
                                 <SelectTrigger className="w-72">
                                    <SelectValue placeholder="Select Role" />
                                 </SelectTrigger>
                                 <SelectContent className='w-64'>
                                    <SelectItem value="administrator">Administrator</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="manager">Manager</SelectItem>
                                    <SelectItem value="customerSupport">Customer Support</SelectItem>
                                    <SelectItem value="technicalSupport">Technical Support</SelectItem>
                                    <SelectItem value="salesAgent">Sales Agent</SelectItem>
                                    <SelectItem value="deliveryBoy">Delivery Boy</SelectItem>
                                 </SelectContent>
                              </Select>
                           )}
                        />
                     </fieldset>
                  </div>
               </PerfectScrollbar>
               <div className="flex items-center gap-2 px-6">
                  <Button
                     disabled={createMutation.isPending}
                     type='submit'
                  >
                     {createMutation.isPending && <Loader2 className='animate-spin' />}
                     Add User
                  </Button>
                  <Button variant='secondary'
                     disabled={createMutation.isPending}
                     onClick={close}
                  >
                     Cancel
                  </Button>
               </div>
            </form>
         </SheetContent>
      </Sheet>

   )
}

export default EditUser