'use client'
import { adminInstance } from '@/config/axios';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import Image from 'next/image';


const DetailsCategory = ({ open, close, categoryId }: { open: boolean, close: () => void, categoryId: number | null }) => {
   const { data, isLoading } = useQuery({
      queryKey: ["admin-get-taxonomy"],
      queryFn: () => adminInstance.get(`/taxonomy/read-taxonomy/${categoryId}`).then(res => res.data),
      enabled: !!categoryId && open
   })
   return (
      <Sheet open={open} onOpenChange={close}>
         <SheetContent className='w-full lg:w-10/12'>
            <SheetHeader className='px-4'>
               <SheetTitle>Category Details</SheetTitle>
               <SheetDescription className='hidden'></SheetDescription>
            </SheetHeader>
            <div className="p-4">
               {
                  isLoading ?
                     <div className="space-y-5 animate-pulse">
                        <div className="">
                           <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                           <div className="">
                              <div className="w-40  bg-gray-200 aspect-[448/626]"></div>
                           </div>
                        </div>
                        <div className="">
                           <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                           <div className="w-80 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="">
                           <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                           <div className="w-80 h-4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="">
                           <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                           <div className="w-6/12 h-4 bg-gray-200 rounded mb-1"></div>
                           <div className="w-6/12 h-4 bg-gray-200 rounded mb-1"></div>
                           <div className="w-4/12 h-4 bg-gray-200 rounded"></div>
                        </div>
                     </div> :
                     <div className="space-y-5">
                        <div className="">
                           <div className="text-sm text-gray-600 mb-2">Thumbnail</div>
                           <div className="">
                              <Image unoptimized src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${data?.taxonomy?.thumbnail}`} width={448} height={626} alt="" className="w-40 aspect-[448/626]" />
                           </div>
                        </div>
                        <div className="">
                           <div className="text-sm text-gray-600 mb-2">Name</div>
                           <div className="text-base">{data?.taxonomy?.name}</div>
                        </div>
                        <div className="">
                           <div className="text-sm text-gray-600 mb-2">Slug</div>
                           <div className="">{data?.taxonomy?.slug}</div>
                        </div>
                        <div className="">
                           <div className="text-sm text-gray-600 mb-2">Description</div>
                           <div className="">{data?.taxonomy?.description}</div>
                        </div>
                     </div>
               }
            </div>
         </SheetContent>
      </Sheet>

   )
}

export default DetailsCategory