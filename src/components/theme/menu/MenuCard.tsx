'use client';

import React, { useLayoutEffect, useState } from 'react';
import { axiosInstance } from '@/config/axios';
import Image from 'next/image';
import { handleApiError } from '@/utils';

interface Dish {
   dish: {
      title: string;
      price: number;
   };
}

interface Menu {
   name?: string;
   thumbnail?: string;
   dishes?: Dish[];
}

interface MenuCardProps {
   slug: string;
   order?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ slug, order = 1 }) => {
   const [menu, setMenu] = useState<Menu>({});

   useLayoutEffect(() => {
      getMenu(slug);
   }, [slug]);

   async function getMenu(slug: string) {
      try {
         const res = await axiosInstance.get(`/taxonomy/category-with-dishes/${slug}`, { params: { limit: 6 } });
         if (res.data.success) {
            setMenu(res.data.taxonomy);
         }
      } catch (error) {
         handleApiError(error);
      }
   }

   if (!menu?.dishes || menu.dishes.length === 0) {
      return null;
   }

   return (
      <div>
         <div className="flex flex-wrap -m-4 lg:-m-10">
            <div className={`w-full md:w-5/12 max-md:order-2 ${order === 2 ? 'md:order-2' : ''} p-4 lg:p-10`}>
               <Image
                  src={menu.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${menu.thumbnail}` : ''}
                  width={448}
                  height={626}
                  className="w-full aspect-[448/626]"
                  alt={menu.name || 'Menu Image'}
               />
            </div>
            <div className="w-full md:w-7/12 p-4 lg:p-10">
               <div>
                  <div className="text-3xl font-semibold text-gray-900 mb-8">{menu.name}</div>
                  <div>
                     {menu.dishes.map((item, index) => (
                        <div key={index} className="border-b pb-2 mb-2">
                           <div className="flex flex-nowrap justify-between gap-4">
                              <div className="text-lg lg:text-2xl break-all">{item.dish.title}</div>
                              <div className="text-xl font-semibold whitespace-nowrap">$ {item.dish.price}</div>
                           </div>
                           <p className="text-sm text-[#0c0c0c] opacity-60">Toasted French bread topped with romano, cheddar</p>
                           <p className="text-sm text-[#0c0c0c] opacity-75">560 CAL</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MenuCard;
