import React from 'react'
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import Image from 'next/image'


async function getMenu(slug: string) {
   try {
      const res = await axiosInstance.get(`/taxonomy/read-taxonomy-with-dishes/${slug}`)
      // console.log('res ==>', res.data.taxonomy)
      if (res.data.success) {
         return res.data.taxonomy  // Return first item as menu category for now. Later we can adjust it to fetch all categories.
      }
   } catch (error) {
      // console.log(error)
   }
}

const MenuCard = async ({ slug, order = 1 }: { slug: string, order?: number }) => {
   const menu = await getMenu(slug)
   // console.log(menu)

   return (
      <div>
         <div className="flex flex-wrap max-lg:-m-10">
            <div className={`w-5/12 ${order === 2 ? 'order-2' : ''} p-10`}>
               <Image src={menu?.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${menu.thumbnail}` : ''} width={448} height={626} className='w-full aspect-[448/626]' alt='' />
            </div>
            <div className={`w-7/12 p-10`}>
               <div className="">
                  <div className="text-3xl font-semibold text-gray-900 mb-8">{menu?.name}</div>
                  <div className="">
                     {
                        menu?.dishes?.map((item: { [key: string]: any }, index: number) => (
                           <div key={index} className="border-b pb-2 mb-2">
                              <div className="flex flex-nowrap justify-between gap-4">
                                 <div className="text-lg lg:text-2xl break-all">{item?.dish?.title}</div>
                                 <div className="text-xl">$ {item?.dish?.price}</div>
                              </div>
                              <p className='text-sm text-[#0c0c0c] opacity-60'>Toasted French bread topped with romano, cheddar</p>
                              <p className='text-sm text-[#0c0c0c] opacity-75'>560 CAL</p>
                           </div>
                        ))
                     }
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default MenuCard