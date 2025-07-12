'use client'
import { Button } from '@/ui-components/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SecondBanner = () => {
   return (
      <div style={{ backgroundImage: 'url("/banner/home-1-hero-bg-scaled.jpg")' }} className='relative w-full flex items-center min-h-screen bg-no-repeat bg-cover bg-center'>

         <div className="container-webx w-full">
            <div className="w-full lg:w-7/12">
               <div className="text-white text-sm md:text-base font-medium uppercase tracking-widest mb-6">
                  Easy way to order your food
               </div>
               <div className="postbook text-white text-3xl md:text-5xl font-bold leading-relaxed mb-20">
                  Online Ordering System for Restaurants
               </div>
               <div className="mb-16">
                  <div className="text-sm text-gray-400 uppercase tracking-widest mb-6">
                     Popular food rider
                  </div>
                  <div className="flex flex-wrap items-center gap-8">
                     <Image src="/banner/svg-viewer-1.svg" width={200} height={100} alt="" className='w-auto h-8 opacity-80 hover:opacity-100 cursor-pointer' />
                     <Image src="/banner/svg-viewer-2.svg" width={200} height={100} alt="" className='w-auto h-7 opacity-80 hover:opacity-100 cursor-pointer' />
                     <Image src="/banner/svg-viewer-3.svg" width={200} height={100} alt="" className='w-auto h-8 opacity-80 hover:opacity-100 cursor-pointer' />
                     <Image src="/banner/svg-viewer-4.svg" width={200} height={100} alt="" className='w-auto h-8 opacity-80 hover:opacity-100 cursor-pointer' />
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Link href="/" className='bg-[#195A00] text-white border border-[#195A00] hover:bg-[#195A00] hover:bg-opacity-80 rounded-sm py-2 px-6'>Reservation</Link>
                  <Link href="/" className='bg-transparent text-white border border-[#195A00] hover:bg-[#195A00] hover:bg-opacity-80 rounded-sm py-2 px-6'>Menu</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SecondBanner