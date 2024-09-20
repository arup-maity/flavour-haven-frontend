'use client'
import { adminInstance } from '@/config/axios';
import { Model } from '@/ui-components'
import Image from 'next/image';
import React, { useLayoutEffect, useState } from 'react'
interface PropsType {
   selectOrderId: number | null;
   showOrderModal: boolean
   setShowOrderModal: () => void;
}
const RestaurantUpdate: React.FC<PropsType> = ({ selectOrderId, showOrderModal, setShowOrderModal }) => {
   const [orderItemList, setOrderItemList] = useState<{ [key: string]: any }[]>([])
   const [orderDetails, setOrderDetails] = useState<{ [key: string]: any }>({})
   useLayoutEffect(() => {
      getOrderDetails(selectOrderId)
   }, [selectOrderId])

   async function getOrderDetails(id: number | null) {
      try {
         if (!id) return;
         const res = await adminInstance.get(`/order/read-order/${id}`)
         console.log('order', res)
         if (res.data.success) {
            setOrderItemList(res.data.order.orderItems)
            setOrderDetails(res.data.order)
         }
      } catch (error) {
         console.log(error)
      }
   }

   async function getUpdateStatus(id: number | null, status: string) {
      try {
         const res = await adminInstance.put(`/order/update-status/${id}`, { status })
         console.log('upedate status', res)
         if (res.data.success) {
            setOrderDetails(res.data.updatedOrder)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div>
         <Model isOpen={showOrderModal} toggle={setShowOrderModal} className=''>
            <Model.Body className='w-10/12'>
               <Model.Header toggle={setShowOrderModal}>
                  <p>Order Details</p>
               </Model.Header>
               <div className="py-4">
                  <div>
                     {orderItemList.map((item) => (
                        <div key={item.itemId} className='flex flex-wrap gap-4'>
                           <div className="">
                              <Image src={item?.dishes?.thumbnail && process.env.NEXT_PUBLIC_BUCKET_URL + item.dishes.thumbnail} width={100} height={100} alt="" />
                           </div>
                           <div className="">
                              <div className='text-base leading-none line-clamp-2 break-all'>{item.dishes?.title}</div>
                              <div>Qty: {item.quantity}</div>
                           </div>
                        </div>
                     ))}
                  </div>
                  <div className="flex justify-end">
                     {
                        orderDetails.status === 'pending' &&
                        <div className="">
                           <button className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'confirmed')}>
                              Order Accept
                           </button>
                           <button className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'rejected')}>
                              Order Reject
                           </button>
                        </div>
                     }
                     {
                        orderDetails.status === 'confirmed' &&
                        <button className=' bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'placed')}>
                           Place Order
                        </button>
                     }

                  </div>
               </div>
            </Model.Body>
         </Model>
      </div>
   )
}

export default RestaurantUpdate