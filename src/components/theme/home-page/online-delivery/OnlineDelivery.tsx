'use client'
import React, { useLayoutEffect, useState } from "react";
import Image from "next/image";
import { axiosInstance } from "@/config/axios";
import Link from "next/link";
import { IoStarHalfOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";

const OnlineDelivery = () => {
   const [dishList, setDishList] = useState<{ [key: string]: any }[]>([])
   const [sort, setSort] = useState<string>('Sort By')
   const [filter, setFilter] = useState<{ [key: string]: any }>({})
   const [openSort, setOpenSort] = useState<boolean>(false)
   const appliedFilters = Object.entries(filter)
      .filter(([key, value]) => value !== false && value !== '')
      .length;

   useLayoutEffect(() => {
      getFilterDishes()
   }, [])

   async function getFilterDishes() {
      try {
         const res = await axiosInstance.get(`/dishes/filtered-dishes`)
         // console.log('dish list => ', res)
         if (res.data.success) {
            setDishList(res.data.dishes)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="w-full">
         <ul className="flex flex-wrap gap-2 lg:gap-4">
            <li className="flex items-center gap-2 text-base text-gray-400 border border-gray-300 rounded-3xl py-1 px-4">
               {
                  appliedFilters === 0 ? <IoOptionsOutline /> :
                     <span className="w-5 h-6 flex items-center justify-center bg-[#FF9F0D] text-base text-white rounded">{appliedFilters}</span>
               }
               <span>Filter</span>
            </li>
            <li role="button" className={`w-auto border text-base font-normal flex items-center gap-2 ${filter?.sort === 'lth' ? 'text-white bg-[#FF9F0D] border-[#FF9F0D]' : 'text-gray-400 border-gray-300'} transition-[width] duration-1000 rounded-3xl py-1 px-4`} onClick={() => setFilter(prev => ({ ...prev, sort: prev.sort === 'lth' ? '' : 'lth' }))}>
               <span>Low to High</span>
               {filter?.sort === 'lth' && <IoCloseOutline />}
            </li>
            <li role="button" className={`w-auto border text-base font-normal flex items-center gap-2 ${filter?.sort === 'gth' ? 'text-white bg-[#FF9F0D] border-[#FF9F0D]' : 'text-gray-400 border-gray-300'} transition-[width] duration-1000 rounded-3xl py-1 px-4`} onClick={() => setFilter(prev => ({ ...prev, sort: prev.sort === 'gth' ? '' : 'gth' }))}>
               <span>High to Low</span>
               {filter?.sort === 'gth' && <IoCloseOutline />}
            </li>

            <li role="button" className={`w-auto border text-base font-normal flex items-center gap-2 ${filter?.delivery ? 'text-white bg-[#FF9F0D] border-[#FF9F0D]' : 'text-gray-400 border-gray-300'} transition-[width] duration-1000 rounded-3xl py-1 px-4`} onClick={() => setFilter(prev => ({ ...prev, delivery: !prev.delivery }))}>
               <span>Fast Delivery</span>
               {filter?.delivery && <IoCloseOutline />}
            </li>
            <li role="button" className={`border text-base font-normal flex items-center gap-2 ${filter?.veg ? 'text-white bg-[#FF9F0D] border-[#FF9F0D]' : 'text-gray-400 border-gray-300'} transition-[width] duration-1000 rounded-3xl py-1 px-4`} onClick={() => setFilter(prev => ({ ...prev, veg: !prev.veg }))}>
               <span>Pure Vag</span>
               {filter?.veg && <IoCloseOutline />}
            </li>
         </ul>
         <div className="flex flex-wrap -mx-3">
            {dishList.length > 0 ?
               dishList?.slice(0, 9).map((card: { [key: string]: any }, index: number) =>
                  <div key={index} className="w-full md:w-6/12 lg:w-4/12 p-3">
                     <Link href={`/${card?.slug}`}>
                        <div className="relative w-full aspect-[250/150] rounded-lg overflow-hidden">
                           <Image src={`${card?.thumbnail ? process.env.NEXT_PUBLIC_BUCKET_URL + card?.thumbnail : ''}`} width={250} height={150} alt="" className="w-full h-full object-cover" />
                           <div className="absolute bottom-0 right-0 left-0 h-20 grid content-end bg-gradient-to-b  from-[#1b1e2411] to-[#0c0c0cf0] z-10 p-3">
                              <p className="text-[22px] font-bold text-white uppercase">60% off upto $120</p>
                           </div>
                        </div>
                        <div className="">
                           <h3 className="text-lg text-[#0c0c0c] font-medium line-clamp-1">{card?.title}</h3>
                           <ul className="flex items-center gap-1">
                              <li className="flex items-center gap-1 text-base"><IoStarHalfOutline color="#FF9F0D" /><span>4.2</span></li>
                              <li>&bull;</li>
                              <li className="text-base">20-30mins</li>
                           </ul>
                           <p className="text-sm text-gray-400 line-clamp-1">{card?.shortDescription}</p>
                        </div>
                     </Link>
                  </div>
               ) :
               Array(9).fill(1).map((item, index) =>
                  <div key={index} className="w-full md:w-6/12 lg:w-4/12 p-3 relative h-full">
                     <div className="block relative h-full animate-pulse rounded-lg overflow-hidden mb-2">
                        <div className="flex items-center justify-center w-full aspect-[250/150] bg-gray-300 rounded dark:bg-gray-700">
                           <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                           </svg>
                        </div>
                     </div>
                     <div className="">
                        <div className="h-4 w-10/12 bg-gray-200 rounded-full dark:bg-gray-700 mb-1.5"></div>
                        <div className="h-4 w-4/12 bg-gray-200 rounded-full dark:bg-gray-700 mb-1.5"></div>
                        <div className="h-4 w-6/12 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                     </div>
                  </div>
               )
            }
         </div>
         <div className="w-full text-center mt-5">
            <Link href="/food-list" className="text-base text-[#0c0c0c] border border-[#195A00] py-2 px-4">
               View All Foods
            </Link>
         </div>
      </div>
   );
};

export default OnlineDelivery;