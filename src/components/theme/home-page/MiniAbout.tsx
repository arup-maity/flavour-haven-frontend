'use client'
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image'
import React, { useState } from 'react'
import { CiPlay1 } from "react-icons/ci";

const MiniAbout = () => {
   const [showVideo, setShowVideo] = useState(false)
   return (
      <div className='flex flex-wrap items-center -m-6'>
         <div className="w-full lg:w-6/12 max-lg:order-2 p-6">
            <div className="w-full aspect-[670/735]">
               <Image src='/banner/group-img-1.png' width={670} height={735} alt='' className='w-full h-auto' />
            </div>
         </div>
         <div className="w-full lg:w-6/12 max-lg:order-1 p-6">
            <div className="">
               <div className="relative text-xl text-[#195A00] font-miniver font-normal after:absolute after:top-[18px] after:left-20 after:z-20 after:w-11 after:h-[1px] after:bg-[#195A00] mb-2">About us</div>
               <div className="text-2xl md:text-3xl text-[#0c0c0c] font-semibold font-raleway mb-6">Food is an important <br /> part Of a balanced Diet</div>
               <p className='text-[15px] font-raleway text-black opacity-60 mb-8'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis  vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.</p>
               <div className="flex items-center gap-5">
                  <button className="text-base text-white bg-[#195A00] border border-[#195A00] rounded-md py-2.5 px-5">
                     Show More
                  </button>
                  <div className="flex items-center flex-nowrap gap-2" onClick={() => setShowVideo(prev => !prev)}>
                     <button className='bg-[#195A00] text-white rounded-full p-3'>
                        <CiPlay1 size={22} strokeWidth={1} />
                     </button>
                     <div className="text-base text-[#0c0c0c] font-semibold">Watch video </div>
                  </div>
               </div>
            </div>
         </div>
         <AnimatePresence>
            {showVideo && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  id="videoDialog"
                  className="fixed z-20 inset-0 w-full h-full flex items-center justify-center bg-offblack bg-opacity-50 backdrop-blur-sm  "
                  onClick={() => {
                     setShowVideo(false);
                     document.body.style.overflow = "auto";
                  }}
               >
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     onClick={(e) => e.stopPropagation()}
                     className=" max-w-6xl w-[90%] p-3 md:p-6 text-center"
                  >
                     <video
                        className="object-cover w-full h-full"
                        width="1920"
                        height="994"
                        preload="none"
                        controls
                        autoPlay={true}
                        controlsList="nodownload"
                     >
                        <source src="/video-01.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                     </video>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

export default MiniAbout