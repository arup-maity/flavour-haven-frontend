'use client'
import React, { useState } from 'react'
import { adminInstance } from '@/config/axios';
import Image from 'next/image';
import { Offcanvas, OffcanvasContent, OffcanvasHeader, OffcanvasTitle } from "@/components/ui/offcanvas";

interface PropsType {
   selectOrderId: number | null;
   open: boolean
   close: () => void;
}
const OrderUpdate: React.FC<PropsType> = ({ selectOrderId, open, close }) => {
   const [orderItemList, setOrderItemList] = useState<{ [key: string]: any }[]>([])
   const [orderDetails, setOrderDetails] = useState<{ [key: string]: any }>({})

   async function getUpdateStatus(id: number | null, status: string) {
      try {
         const res = await adminInstance.put(`/order/update-status/${id}`, { status })
         if (res.data.success) {
            setOrderDetails(res.data.updatedOrder)
            close()
         }
      } catch (error) {
         console.log(error)
      }
   }

   const onOpen = async () => {
      try {
         if (!selectOrderId) return;
         const res = await adminInstance.get(`/order/read-order/${selectOrderId}`)
         console.log('order', res)
         if (res.data.success) {
            setOrderItemList(res.data.order.orderItems)
            setOrderDetails(res.data.order)
         }
      } catch (error) {
         console.log(error)
      }
   }
   const onClose = () => {
      setOrderItemList([])
      setOrderDetails({})
   }

   return (
      <div>
         <Offcanvas open={open} onOpenChange={close}>
            <OffcanvasContent onOpenAutoFocus={onOpen} onCloseAutoFocus={onClose} className="flex flex-col w-5/12 min-w-[600px] rounded-l-xl">
               <OffcanvasHeader className='p-4'>
                  <OffcanvasTitle>Update Order</OffcanvasTitle>
               </OffcanvasHeader>
               <div className="flex-grow custom-scrollbar px-2">
                  <div className="px-2">
                     <div className="capitalize mb-4">Order Status : {orderDetails?.status}</div>
                     <div className='divide-y'>
                        {orderItemList.map((item) => (
                           <div key={item.itemId} className='flex flex-wrap gap-4 py-2'>
                              <div className="">
                                 <Image unoptimized src={item?.dishes?.thumbnail && process.env.NEXT_PUBLIC_BUCKET_URL + item.dishes.thumbnail} width={100} height={100} alt="" className='w-20 h-20 rounded-lg' />
                              </div>
                              <div className="">
                                 <div className='text-base leading-none line-clamp-2 break-all'>{item.dishes?.title}</div>
                                 <div>Qty: {item.quantity}</div>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
               <div className="w-full flex gap-4 p-4">
                  {
                     orderDetails.status === 'pending' &&
                     <div className="space-x-2">
                        <button className=' bg-blue-500 hover:bg-opacity-75 text-base text-white py-1.5 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'confirmed')}>
                           Order Accept
                        </button>
                        <button className=' bg-red-500 hover:bg-opacity-75 text-base text-white py-1.5 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'rejected')}>
                           Order Reject
                        </button>
                     </div>
                  }
                  {
                     orderDetails.status === 'confirmed' &&
                     <button className=' bg-blue-500 hover:bg-opacity-75 text-base text-white py-1.5 px-4 rounded-md' onClick={() => getUpdateStatus(selectOrderId, 'placed')}>
                        Place Order
                     </button>
                  }
               </div>
            </OffcanvasContent>
         </Offcanvas >
      </div>
   )
}

export default OrderUpdate