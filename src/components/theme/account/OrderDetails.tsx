'use client'
import { axiosInstance } from '@/config/axios'
import React from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useInfiniteQuery } from '@tanstack/react-query'

const OrderDetailsPage = () => {
   const fetchProjects = async ({ pageParam }) => {
      const res = axiosInstance.get(`/user/order-list?page=${pageParam}&limit=5`).then(res => res.data)
      return res
   }

   const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
   } = useInfiniteQuery({
      queryKey: ['orders'],
      queryFn: fetchProjects,
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
   })

   // if (isLoading) {
   //    return <div>Loading...</div>
   // }
   return (
      <div className="space-y-3">
         <div className="text-xl mb-4">Orders Details</div>
         {
            data?.pages?.map((group, i) => (
               <React.Fragment key={i}>
                  {group?.orders?.map((order) => (
                     <div key={order.id} className='border border-slate-200 rounded p-2 space-y-2'>
                        <p>#Id: {order.cuid}</p>
                        <div className="flex items-center gap-3">
                           {
                              order.orderItems.map((orderItem: { [key: string]: any }) => (
                                 <div key={orderItem.id}>
                                    <Image src={orderItem.dishes?.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${orderItem.dishes.thumbnail}` : ''} width={48} height={48} alt="" className='w-12 h-12 aspect-square rounded' />
                                 </div>
                              ))
                           }
                        </div>
                        <div className="flex items-center gap-2">
                           <p>{dayjs('2018-08-08').format("DD MMM, YYYY")},</p>
                           <p className='capitalize'>{order.status}</p>
                        </div>
                     </div>
                  ))}
               </React.Fragment>
            ))
         }

         <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
         >
            {isFetchingNextPage
               ? 'Loading more...'
               : hasNextPage
                  ? 'Load More'
                  : 'Nothing more to load'}
         </button>

      </div>
   )
}

export default OrderDetailsPage