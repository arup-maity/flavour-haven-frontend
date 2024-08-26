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

const menuItems = [
   {
      id: 1,
      category: "Breakfast",
      items: [
         {
            id: 1,
            name: "Poori Aloo / Choley",
            additionalDesc: "4 Pcs",
            nonVeg: false,
            price: 115
         },
         {
            id: 2,
            name: "Aloo Parantha",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 125
         },
         {
            id: 3,
            name: "Choley Kulcha",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 155
         },
         {
            id: 4,
            name: "Bread Rolls",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 95
         },
         {
            id: 5,
            name: "Bun Anda Bhurjee",
            nonVeg: true,
            price: 105
         },
         {
            id: 6,
            name: "Bun Omlette Plain",
            nonVeg: true,
            price: 105
         },
         {
            id: 7,
            name: "Bun Masala Omlette Plain",
            nonVeg: true,
            price: 115
         },
         {
            id: 8,
            name: "Parantha Egg Roll Plain",
            nonVeg: true,
            price: 125
         },
         {
            id: 9,
            name: "Masala Egg Sandwich Plain",
            nonVeg: true,
            price: 155
         },
      ]
   },
   {
      id: 2,
      category: "Lunch",
      items: [
         {
            id: 10,
            name: "Chicken Tikka Masala",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 215
         },
         {
            id: 11,
            name: "Chicken Tikka Kashmiri",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 225
         },
         {
            id: 12,
            name: "Chicken Tikka Makhani",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 235
         },
         {
            id: 13,
            name: "Chicken Tikka Masala with Rice",
            additionalDesc: "2 Pcs",
            nonVeg: true,
         }
      ]
   },
   {
      id: 3,
      category: "Dinner",
      items: [
         {
            id: 14,
            name: "Chicken Tikka Masala",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 215
         },
         {
            id: 15,
            name: "Chicken Tikka Kashmiri",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 225
         },
         {
            id: 16,
            name: "Chicken Tikka Makhani",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 235
         },
         {
            id: 17,
            name: "Chicken Tikka Masala with Rice",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 245
         }
      ]
   },
   {
      id: 4,
      category: "Snacks",
      items: [
         {
            id: 18,
            name: "Butter Chicken",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 155
         },
         {
            id: 19,
            name: "Butter Chicken Masala",
            additionalDesc: "2 Pcs",
            nonVeg: true,
            price: 165
         },
         {
            id: 20,
            name: "French Fries",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 95
         },
         {
            id: 21,
            name: "Chapati",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 75
         },
         {
            id: 22,
            name: "Roti",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 65
         }
      ]
   },
   {
      id: 5,
      category: "Beverages",
      items: [
         {
            id: 23,
            name: "Cappuccino",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 125
         },
         {
            id: 24,
            name: "Tea",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 85
         },
         {
            id: 25,
            name: "Milkshake",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 115
         },
         {
            id: 26,
            name: "Hot Chocolate",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 105
         }
      ]
   },
   {
      id: 6,
      category: "Deserts",
      items: [
         {
            id: 27,
            name: "Ice Cream",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 155
         },
         {
            id: 28,
            name: "Mousse Cake",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 165
         },
         {
            id: 29,
            name: "Brownie",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 135
         },
         {
            id: 30,
            name: "Cookies",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 95
         }
      ]
   },
   {
      id: 7,
      category: "Drinks",
      items: [
         {
            id: 31,
            name: "Coke",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 75
         },
         {
            id: 32,
            name: "Pepsi",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 75
         },
         {
            id: 33,
            name: "Sprite",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 75
         },
         {
            id: 34,
            name: "Fanta",
            additionalDesc: "2 Pcs",
            nonVeg: false,
            price: 75
         }
      ]
   }
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
         const res = await axiosInstance.get(`/taxonomy/taxonomy-menu`)
         // console.log(res)
         if (res.data.success) {
            setAllMenu(res.data.taxonomies)
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
                  className={`${activeTab === tab.id ? "text-[#195A00]" : "hover:text-[#195A00]"} relative  px-3 py-2 text-base font-medium text-gray-500 transition`}
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
               <Link href="/menu" className="text-base border border-[#195A00] py-2 px-4">
                  View menu
               </Link>
            </div>
         </div>
      </div>
   );
};

export default FoodMenu;

