"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
   return (
      <div className="theme-container w-full !py-10">
         <div className="flex flex-wrap items-center max-md:-m-5 lg:-m-10">
            <div className="w-full lg:w-7/12 p-5 lg:p-10">
               <h6 className="text-4xl md:text-5xl leading-normal font-bold text-[#101A24] mb-14">We provide the <br /> best food for you</h6>
               <p className="w-full lg:w-10/12 text-base text-[#5C6574] mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
               <div className="flex items-center gap-5">
                  <Link href='/menu' className="text-base text-white bg-[#101A24] rounded-[10px_4px] py-2.5 px-5">Menu</Link>
                  <Link href='/table' className="text-base text-white bg-[#195A00] rounded-[10px_4px] py-2.5 px-5">Book a table</Link>
               </div>
            </div>
            <div className="w-full lg:w-5/12 p-5 lg:p-10">
               <div className="w-8/12 lg:w-full relative aspect-[516/712] mx-auto">
                  <Image src='/banner/banner-1.png' width={516} height={712} alt="" className="w-full h-auto" />
                  <Image src='/banner/banner-2.png' width={364} height={364} alt="" className="w-32 md:w-[250px] aspect-square absolute -left-[30%] top-[55%] z-10" />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Banner;
