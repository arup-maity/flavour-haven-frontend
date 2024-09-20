'use client'
import { axiosInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import dayjs from 'dayjs'
import Image from 'next/image'

const OrderDetailsPage = () => {
   const [orderList, setOrderList] = useState<{ [key: string]: any }[]>([])
   useLayoutEffect(() => {
      getOrderList()
   }, [])
   async function getOrderList() {
      try {
         const response = await axiosInstance.get(`/user/account/order-list`)
         console.log(response)
         if (response.data.success) {
            setOrderList(response.data.orders)
         }
      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }

   return (
      <div>
         <div className="mb-2">
            <p>Order List:</p>
         </div>
         <div className="space-y-3">
            {
               orderList.map((order) => (
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
               ))
            }
         </div>
      </div>
   )
}

export default OrderDetailsPage