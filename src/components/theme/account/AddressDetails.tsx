'use client'
import { axiosInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import AddressForm from './AddressForm'
import { CiEdit } from "react-icons/ci";

const AddressDetailsPage = () => {
   const [addressDetails, setAddressDetails] = useState<{ [key: string]: any }[]>([])
   const [formOpen, setFormOpen] = useState<boolean>(false)
   const [selectedAddress, setSelectedAddress] = useState<{ [key: string]: any }>({})
   useLayoutEffect(() => {
      getOrderList()
   }, [formOpen])
   async function getOrderList() {
      try {
         const response = await axiosInstance.get(`/user/account/address-details`)
         // console.log(response)
         if (response.data.success) {
            setAddressDetails(response.data.addressDetails)
         }
      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }

   return (
      <div>
         <div className="flex justify-end">
            {
               !formOpen && <button type="button" className='text-base border border-slate-300 rounded py-1 px-4' onClick={() => setFormOpen(prev => !prev)}>Add New Address</button>
            }
         </div>
         <div className="mt-5">
            {
               formOpen ? <AddressForm selectedAddress={selectedAddress} setFormOpen={() => setFormOpen(prev => !prev)} /> :
                  <div className="">
                     <div className="flex flex-wrap -m-2">
                        {
                           addressDetails?.map((address: { [key: string]: any }, index: number) => (
                              <div key={address.id} className='relative w-full lg:w-6/12 border border-slate-200 rounded p-2'>
                                 <p className='underline'>Address {index + 1}</p>
                                 <div className="absolute top-2 right-2 z-10">
                                    <button type="button" onClick={() => { setSelectedAddress(address); setFormOpen(prev => !prev) }}><CiEdit size={20} /></button>
                                 </div>
                                 <p>{address.fullName}</p>
                                 <p>{address.streetAddress}</p>
                                 <div className="flex items-center gap-2">
                                    <p>{address.city}</p>
                                    <p>{address.country}</p>
                                    <p>{address.zipCode}</p>
                                 </div>

                              </div>
                           ))
                        }
                     </div>
                  </div>
            }
         </div>
      </div>
   )
}

export default AddressDetailsPage