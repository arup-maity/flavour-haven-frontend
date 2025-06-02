'use client';

import React from 'react';
import { axiosInstance } from '@/config/axios';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

interface MenuCardProps {
   slug: string;
   order?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ slug, order = 1 }) => {
   const { data, isLoading } = useQuery({
      queryKey: ['menu', slug],
      queryFn: () => axiosInstance.get(`/taxonomy/category-with-dishes/${slug}`, { params: { limit: 6 } }).then(res => res.data),
      enabled: !!slug,
   })

   return (
      <>
         {
            isLoading ?
               <div className="animate-pulse flex flex-wrap -m-4 lg:-m-10">
                  <div className={`w-full md:w-5/12 max-md:order-2 ${order === 2 ? 'md:order-2' : ''} p-4 lg:p-10`}>
                     <div className="w-full bg-gray-100 aspect-[448/626]" />
                  </div>
                  <div className="w-full md:w-7/12 p-4 lg:p-10">
                     <div>
                        <div className="w-4/12 h-7 bg-gray-100 rounded-full mb-4"></div>
                        <div className="border-b pb-2 mb-6">
                           <div className="flex flex-nowrap justify-between gap-4 mb-3">
                              <div className="w-8/12 h-6 bg-gray-100 rounded-full"></div>
                              <div className="w-40 h-6 bg-gray-100 rounded-full"></div>
                           </div>
                           <p className="w-full h-3 bg-gray-100 rounded-full mb-2"></p>
                           <p className="w-6/12 h-3 bg-gray-100 rounded-full mb-3"></p>
                           <p className="w-40 h-4 bg-gray-100 rounded-full"></p>
                        </div>
                        <div className="border-b pb-2 mb-6">
                           <div className="flex flex-nowrap justify-between gap-4 mb-3">
                              <div className="w-8/12 h-6 bg-gray-100 rounded-full"></div>
                              <div className="w-40 h-6 bg-gray-100 rounded-full"></div>
                           </div>
                           <p className="w-full h-3 bg-gray-100 rounded-full mb-2"></p>
                           <p className="w-6/12 h-3 bg-gray-100 rounded-full mb-3"></p>
                           <p className="w-40 h-4 bg-gray-100 rounded-full"></p>
                        </div>
                        <div className="border-b pb-2 mb-6">
                           <div className="flex flex-nowrap justify-between gap-4 mb-3">
                              <div className="w-8/12 h-6 bg-gray-100 rounded-full"></div>
                              <div className="w-40 h-6 bg-gray-100 rounded-full"></div>
                           </div>
                           <p className="w-full h-3 bg-gray-100 rounded-full mb-2"></p>
                           <p className="w-6/12 h-3 bg-gray-100 rounded-full mb-3"></p>
                           <p className="w-40 h-4 bg-gray-100 rounded-full"></p>
                        </div>
                     </div>
                  </div>
               </div> :
               <div className="flex flex-wrap -m-4 lg:-m-10">
                  <div className={`w-full md:w-5/12 max-md:order-2 ${order === 2 ? 'md:order-2' : ''} p-4 lg:p-10`}>
                     <Image
                        src={data?.taxonomy?.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${data?.taxonomy?.thumbnail}` : ''}
                        width={448}
                        height={626}
                        className="w-full aspect-[448/626]"
                        alt={data?.taxonomy?.name || 'Menu Image'}
                     />
                  </div>
                  <div className="w-full md:w-7/12 p-4 lg:p-10">
                     <div>
                        <div className="text-3xl font-semibold text-gray-900 mb-8">{data?.taxonomy?.name}</div>
                        <div>
                           {data?.taxonomy?.dishes?.map((item, index) => (
                              <div key={index} className="border-b pb-2 mb-2">
                                 <div className="flex flex-nowrap justify-between gap-4">
                                    <div className="text-lg lg:text-2xl break-all">{item?.dish?.title}</div>
                                    <div className="text-xl font-semibold whitespace-nowrap">$ {item?.dish?.price}</div>
                                 </div>
                                 <p className="text-sm text-[#0c0c0c] opacity-60">Toasted French bread topped with romano, cheddar</p>
                                 <p className="text-sm text-[#0c0c0c] opacity-75">560 CAL</p>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
         }
      </>
   );
};

export default MenuCard;
