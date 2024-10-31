'use client'
import { axiosInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import ProfileForm from './ProfileForm'

const ProfileDetailsPage = () => {
   const [profileDetails, setProfileDetails] = useState<{ [key: string]: any }>({})
   const [formOpen, setFormOpen] = useState<boolean>(false)
   const [loading, setLoading] = useState(true)
   useLayoutEffect(() => {
      getProfileDetails()
   }, [])
   async function getProfileDetails() {
      try {
         setLoading(true)
         const response = await axiosInstance.get(`/user/profile-details`)
         if (response.data.success) {
            setProfileDetails(response.data.profileDetails)
         }
      } catch (error) {
         console.error('Error fetching order list:', error)
      } finally {
         setLoading(false)
      }
   }
   if (loading) {
      return <div>Loading ...</div>
   }
   return (
      <div className='space-y-4'>
         {
            formOpen ?
               <ProfileForm profileDetails={profileDetails} setFormOpen={() => setFormOpen(prev => !prev)} /> :
               <div className="">
                  <div className="flex items-center flex-nowrap justify-between gap-4 mb-5">
                     <div className='text-xl text-theme-black font-montserrat text-opacity-75'>Profile Details</div>
                     <button className="text-sm flex items-center text-theme-blue flex-nowrap border border-slate-300 rounded py-1 px-2 gap-2" onClick={() => setFormOpen(prev => !prev)} ><CiEdit /> Edit</button>
                  </div>
                  <div className="">
                     <p className='text-sm text-gray-400'>FullName</p>
                     <p>{profileDetails?.firstName}  {profileDetails?.lastName}</p>
                  </div>
                  <div className="">
                     <p className='text-sm text-gray-400'>Email</p>
                     <p>{profileDetails?.email}</p>
                  </div>
                  <div className="">
                     <p className='text-sm text-gray-400'>Phone Number</p>
                     <p>{profileDetails?.phoneNumber}</p>
                  </div>
               </div>
         }
      </div>
   )
}

export default ProfileDetailsPage