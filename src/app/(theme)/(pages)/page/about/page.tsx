import Image from 'next/image'
import React from 'react'

const AboutPage = () => {
   return (
      <div className='w-full theme-container !py-20'>
         <div className="">
            <div className="mb-12">
               <h1 className='text-3xl font-bold leading-tight text-center'>Why Choose us</h1>
               <p className='w-full lg:w-6/12 text-base text-[#4f4f4f] font-normal leading-6 text-center mx-auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum.</p>
            </div>
            <div className="mb-12">
               <Image src='/about-us/img-1.png' width={1320} height={386} alt='' />
            </div>
            <div className="">
               <div className="flex flex-wrap -m-7">
                  <div className="w-full md:w-4/12 text-center p-7">
                     <div className="flex justify-center mb-5">
                        <Image src='/about-us/Student.svg' width={50} height={50} alt='' />
                     </div>
                     <p className='text-2xl text-[#333333] font-bold mb-3'>Best Chef</p>
                     <p className='text-base text-[#4f4f4f] leading-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat </p>
                  </div>
                  <div className="w-full md:w-4/12 text-center p-7">
                     <div className="flex justify-center mb-5">
                        <Image src='/about-us/Coffee.svg' width={50} height={50} alt='' />
                     </div>
                     <p className='text-2xl text-[#333333] font-bold mb-3'>120 Item food</p>
                     <p className='text-base text-[#4f4f4f] leading-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat </p>
                  </div>
                  <div className="w-full md:w-4/12 text-center p-7">
                     <div className="flex justify-center mb-5">
                        <Image src='/about-us/Person.svg' width={50} height={50} alt='' />
                     </div>
                     <p className='text-2xl text-[#333333] font-bold mb-3'>Clean Environment</p>
                     <p className='text-base text-[#4f4f4f] leading-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AboutPage