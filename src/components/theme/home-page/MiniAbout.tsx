import Image from 'next/image'
import React from 'react'
import { CiPlay1 } from "react-icons/ci";

const MiniAbout = () => {
   return (
      <div className='flex flex-wrap items-center -m-6'>
         <div className="w-full lg:w-6/12 p-6">
            <div className="flex flex-nowrap justify-center gap-4">
               <div className="">
                  <Image src='/home-page/img3.jpg' width={336} height={536} alt='' className='w-full max-w-[336px] h-auto' />
               </div>
               <div className="pt-14 space-y-4">
                  <Image src='/home-page/img2.jpg' width={309} height={271} alt='' className='w-full max-w-[309px] h-auto' />
                  <Image src='/home-page/img1.jpg' width={309} height={382} alt='' className='w-full max-w-[309px] h-auto' />

               </div>
            </div>
         </div>
         <div className="w-full lg:w-6/12 p-6">
            <div className="">
               <div className="relative text-lg text-[#195A00] font-miniver font-normal after:absolute after:top-[18px] after:left-20 after:z-20 after:w-11 after:h-[1px] after:bg-[#195A00] mb-2">About us</div>
               <div className="text-3xl md:text-5xl font-bold mb-6">Food is an important <br /> part Of a balanced Diet</div>
               <p className='text-base text-[#4F4F4F] opacity-80 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis  vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</p>
               <div className="flex items-center gap-5">
                  <button className="text-base text-white bg-[#195A00] border border-[#195A00] rounded-md py-2.5 px-5">
                     Show More
                  </button>
                  <div className="flex items-center flex-nowrap gap-2">
                     <button className='bg-[#195A00] text-white rounded-full p-3'>
                        <CiPlay1 size={22} strokeWidth={1} />
                     </button>
                     <div className="text-base font-semibold">Watch video </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MiniAbout