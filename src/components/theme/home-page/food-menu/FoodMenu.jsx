"use client";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { axiosInstance } from "@/config/axios";

let tabs = [
   { id: "starters", label: "Starters" },
   { id: "main-dishes", label: "Main Dishes" },
   { id: "desserts", label: "Desserts" },
   { id: "drinks", label: "Drinks" },
];

const FoodMenu = () => {
   const [activeTab, setActiveTab] = useState('starters');
   const [menuList, setMenuList] = useState([])
   // console.log('menuList ===>', menuList)
   const [allMenu, setAllMenu] = useState([])
   // console.log('all menu ==>', allMenu)

   useEffect(() => {
      findByCategory(activeTab)
   }, [activeTab, allMenu]);

   useLayoutEffect(() => {
      getAllMenu()
   }, [])

   function findByCategory(category) {
      // Find the category object
      const categoryObj = allMenu.find(menuCategory => menuCategory.slug === category);
      // If the category exists, return its items; otherwise, return an empty array
      const filterList = categoryObj ? categoryObj.dishes : [];
      setMenuList(filterList)
   }

   async function getAllMenu() {
      try {
         const categories = tabs.map((item) => item.id)
         const res = await axiosInstance.get(`/taxonomy/tab-menu`, { params: { categories } });
         console.log(res)
         if (res.data.success) {
            setAllMenu(res.data.tabMenu)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className="w-full py-11">
         <div className="flex justify-center space-x-1 border-b-2 border-gray-200">
            {tabs.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id ? "text-[#195A00]" : "hover:text-[#195A00]"} relative whitespace-nowrap px-2.5 md:px-5 py-2 text-base font-medium text-gray-500 transition`}
                  style={{
                     WebkitTapHighlightColor: "transparent"
                  }}>
                  {activeTab === tab.id && (
                     <motion.span layoutId="bubble" className="absolute w-full left-0 -bottom-[2px] z-10 border-b-2 border-gray-800" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                  )}
                  {tab.label}
               </button>
            ))}
         </div>
         <div className="">
            <motion.div animate={{ x: 100 }} transition={{ delay: 1 }} />
            <div className="flex flex-wrap -m-2 py-4">
               {
                  menuList.length > 0 ?
                     menuList?.map((item, index) =>
                        <div key={index} className="w-full lg:w-6/12 p-2">
                           <div className="flex flex-nowrap items-center gap-3">
                              <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                                 <Image src={`${item?.dish.thumbnail ? process.env.NEXT_PUBLIC_BUCKET_URL + item?.dish.thumbnail : ''}`} width={80} height={80} className="w-full h-full" alt="" />
                              </div>
                              <div className="w-full">
                                 <div className="flex flex-nowrap justify-between">
                                    <h2 className="text-xl font-medium">{item?.dish.title}</h2>
                                    <p className="text-2xl text-[#195A00] font-medium">$ {item?.dish.price}</p>
                                 </div>
                                 <p className="text-sm text-gray-400">Toasted French bread topped with romano, cheddar</p>
                                 <span className="text-xs text-gray-400">560 CAL</span>
                              </div>
                           </div>
                        </div>
                     ) :

                     Array(6).fill(1).map((item, index) =>
                        <div key={index} className="w-full lg:w-6/12 p-2">
                           <div className="flex flex-nowrap items-center gap-3">
                              <div className="flex items-center justify-center w-20 h-20 aspect-square flex-shrink-0 bg-gray-300 rounded dark:bg-gray-700">
                                 <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                                 </svg>
                              </div>
                              <div className="w-full">
                                 <div className="flex flex-nowrap justify-between">
                                    <div className="h-4 w-10/12 bg-gray-200 rounded dark:bg-gray-700 mb-2"></div>
                                 </div>
                                 <div className="h-3 w-3/12 bg-gray-200 rounded dark:bg-gray-700 mb-2"></div>
                                 <div className="h-3 w-6/12 bg-gray-200 rounded dark:bg-gray-700"></div>
                              </div>
                           </div>
                        </div>
                     )
               }
            </div>
            <div className="w-full text-center mt-5">
               <Link href="/menu" className="text-base text-[#0c0c0c] border border-[#195A00] py-2 px-4">
                  View menu
               </Link>
            </div>
         </div>
      </div>
   );
};

export default FoodMenu;

