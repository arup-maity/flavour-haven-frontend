'use client'
import AddressDetailsPage from '@/components/theme/account/AddressDetails'
import OrderDetailsPage from '@/components/theme/account/OrderDetails'
import ProfileDetailsPage from '@/components/theme/account/ProfileDetails'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { IoCameraOutline, IoCloudUploadOutline } from 'react-icons/io5'

const AccountPage = ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
   const router = useRouter()
   const pathname = usePathname()
   const currentTab = searchParams.tab || 'profile-details'
   const [profileDetails, setProfileDetails] = useState<{ [key: string]: any }>({})
   const createQueryString = useCallback(
      (name: string, value: string) => {
         const params = new URLSearchParams(searchParams.toString())
         params.set(name, value)

         return params.toString()
      },
      [searchParams]
   )
   function handleTab(id: string) {
      router.push(pathname + '?' + createQueryString('tab', id))
   }
   return (
      <div className='w-full theme-container'>
         <div className="py-5">
            <div style={{ backgroundImage: 'url("/images/img-36.jpg")', }} className='relative w-full aspect-[1440/300] bg-cover bg-center'>
               <div className="absolute right-0 bottom-0 p-4">
                  <button type="button" className='inline-flex items-center gap-1 whitespace-nowrap bg-theme-blue bg-opacity-30 text-sm text-[#112211] font-medium font-montserrat rounded py-2 px-4'><IoCloudUploadOutline /> <span>Upload new cover</span></button>
               </div>
            </div>
            <div className="relative -mt-20 z-10">
               <div className="text-center">
                  <div className="relative w-36 h-36 mx-auto rounded-full">
                     <Image src={'/images/user-1.png'} width={160} height={160} alt='' className='w-36 h-36' />
                     <div className="absolute right-1 top-[60%] w-7 h-7 bg-gray-200 rounded-full p-1">
                        <button className='text-[#666]'><IoCameraOutline /></button>
                     </div>
                  </div>
                  <p className='text-2xl text-theme-black font-semibold font-montserrat mb-2'>{profileDetails?.fullName}</p>
               </div>
            </div>
         </div>
         <div className="flex flex-wrap -m-4">
            <div className="w-full lg:w-3/12 p-4">
               <div className="">
                  <ul className='flex lg:block max-lg:gap-4 max-lg:justify-center *:text-base lg:space-y-1'>
                     <li role='button' className={`${currentTab === 'profile-details' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => handleTab('profile-details')}>Account Details</li>
                     <li role='button' className={`${currentTab === 'order-details' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => handleTab('order-details')}>Order Details</li>
                     <li role='button' className={`${currentTab === 'address' ? 'bg-theme-blue font-medium' : 'bg-gray-100'} rounded py-1.5 px-4`} onClick={() => handleTab('address-details')}>Address</li>
                  </ul>
               </div>
            </div>
            <div className="w-full lg:w-9/12 p-4">
               {
                  currentTab === 'profile-details' ? <ProfileDetailsPage /> : currentTab === 'order-details' ? <OrderDetailsPage /> : <AddressDetailsPage />
               }
            </div>
         </div>
      </div>
   )
}

export default AccountPage