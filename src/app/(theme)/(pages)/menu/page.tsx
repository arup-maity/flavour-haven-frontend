'use client'
import React from 'react'
import MenuCard from '@/components/theme/menu/MenuCard';
import Image from 'next/image';
const Menu = () => {
   return (
      <div className='w-full'>
         <div className="bg-[#195A00] bg-opacity-20 aspect-[3/2] md:aspect-[3/1] lg:aspect-[9/2] bg-cover bg-no-repeat max-lg:mt-10">
            <div className="theme-container flex flex-col justify-center items-center h-full">
               <p className='postbook text-4xl md:text-5xl text-[#195A00] font-bold'>OUR MENU</p>
            </div>
         </div>
         <div className="!py-10">
            <div className="theme-container mb-20">
               <MenuCard slug='starters' />
               <MenuCard slug='main-courses' order={2} />
            </div>
            <div style={{ backgroundImage: 'url("/menu/menu-divider.png")', }} className='relative w-full bg-cover bg-center'>
               <div className="absolute inset-0 bg-black opacity-80 z-0"></div>
               <div className="relative theme-container grid grid-cols-2 lg:grid-cols-4 items-center justify-around !py-20 z-10">
                  <div className="p-6">
                     <Image src="/menu/menu-svg-01.png" width={40} height={40} alt="" className='size-20 mx-auto mb-5' />
                     <div className="text-white text-center">
                        <p className='text-xl font-bold'>420</p>
                        <p className='text-base font-semibold'>Professional Chefs</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <Image src="/menu/menu-svg-02.png" width={40} height={40} alt="" className='size-20 mx-auto mb-5' />
                     <div className="text-white text-center">
                        <p className='text-xl font-bold'>420</p>
                        <p className='text-base font-semibold'>Professional Chefs</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <Image src="/menu/menu-svg-03.png" width={40} height={40} alt="" className='size-20 mx-auto mb-5' />
                     <div className="text-white text-center">
                        <p className='text-xl font-bold'>420</p>
                        <p className='text-base font-semibold'>Professional Chefs</p>
                     </div>
                  </div>
                  <div className="p-6">
                     <Image src="/menu/menu-svg-04.png" width={40} height={40} alt="" className='size-20 mx-auto mb-5' />
                     <div className="text-white text-center">
                        <p className='text-xl font-bold'>420</p>
                        <p className='text-base font-semibold'>Professional Chefs</p>
                     </div>
                  </div>
               </div>
            </div>
            <div className="theme-container !py-20">
               <MenuCard slug='desserts' />
               <MenuCard slug='drinks' order={2} />
            </div>
         </div>
      </div>
   )
}

export default Menu