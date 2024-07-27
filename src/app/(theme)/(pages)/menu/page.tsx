import Image from 'next/image';
import React from 'react'

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

const Menu = () => {
   const menus = [55, 55, 55, 55, 55, 55]
   return (
      <div className='w-full'>
         <div style={{ backgroundImage: 'url("/banner.png")', }} className="aspect-[6/1] bg-cover bg-no-repeat"></div>
         <div className="theme-container !py-20">
            {
               menuItems?.map((category, index) => (
                  <div key={index} className="flex flex-wrap max-lg:-m-10">
                     <div className={`w-5/12 ${index % 2 === 0 ? 'order-1' : 'order-2'} p-10`}>
                        <Image src={`/img1.jpg`} width={150} height={150} className='w-full h-auto' alt='' />
                     </div>
                     <div className={`w-7/12 ${index % 2 === 0 ? 'order-2' : 'order-1'} p-10`}>
                        <div className="">
                           <div className="text-2xl font-bold text-gray-900 mb-8">Starter Menu</div>
                           <div className="">
                              {
                                 category?.items?.map((menu, index) => (
                                    <div key={index} className="border-b pb-2 mb-2">
                                       <div className="flex flex-nowrap justify-between gap-4">
                                          <div className="text-xl">{menu?.name}</div>
                                          <div className="">$ {menu?.price}</div>
                                       </div>
                                       <p className='text-sm text-[#4F4F4F]'>Toasted French bread topped with romano, cheddar</p>
                                       <p className='text-sm text-[#4F4F4F]'>560 CAL</p>
                                    </div>
                                 ))
                              }
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            }

         </div>
      </div>
   )
}

export default Menu