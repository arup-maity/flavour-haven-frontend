"use client";
import React from "react";
import Image from "next/image";

const Banner = () => {
   return (
      <div className="relative w-full aspect-square md:aspect-[1920/1500] lg:aspect-[1920/1000] flex items-center overflow-hidden">
         <div className="theme-container flex flex-wrap items-center">
            <div className="w-9/12 md:w-8/12 lg:w-5/12">
               <p className="text-lg text-[#195A00] font-miniver">Healthy & Testy Food</p>
               <div className="mb-4 md:mb-8">
                  <p className="text-xl md:text-4xl lg:text-5xl text-[#33333] font-bold">Enjoy Healthy Life & Testy Food.</p>
               </div>
               <p className="text-base text-[#4f4f4f] max-md:line-clamp-2 mb-5 md:mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</p>
               <div className="flex items-center gap-4">
                  <button type="button" className="text-base md:text-lg text-white bg-[#195A00] rounded py-1.5 md:py-2 px-4 md:px-8">Show More</button>
                  <button type="button" className="text-base md:text-lg text-[#195A00] bg-transparent border border-[#195A00] rounded py-1.5 md:py-2 px-4 md:px-8">Place an order</button>
               </div>
            </div>
            <div className="w-8/12 lg:w-7/12 absolute lg:relative -z-10 max-md:translate-x-[95%] max-lg:translate-x-3/4">
               <Image src='/banner-01.png' width={870} height={800} alt="" />
            </div>
         </div>

         <div className="absolute top-0 right-0 w-36 md:w-[400px] lg:w-[775px] aspect-[870/800] bg-[url('/banner-02.png')] bg-cover bg-center -z-20"></div>
      </div>
   );
};

export default Banner;
