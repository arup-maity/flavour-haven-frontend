'use client'
import { axiosInstance } from '@/config/axios'
import { sessionContext } from '@/context/Session'
import StripePayment from '@/payment/StripePayment'
import Image from 'next/image'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { PiCurrencyInr } from 'react-icons/pi'

const PlaceOrderPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
   const checkoutId = searchParams.checkoutId || ''
   const paymentId = searchParams.paymentId || ''
   const { user } = useContext(sessionContext)

   const [checkoutItems, setCheckoutItems] = useState([])
   const [shippingCharge, setShippingCharge] = useState(0)
   const [taxCharge, setTaxCharge] = useState(0)
   const [bookingDetails, setBookings] = useState<{ [key: string]: any }>({})


   useLayoutEffect(() => {
      checkoutDetails(checkoutId)
   }, [checkoutId])
   async function checkoutDetails(id: string) {
      try {
         const res = await axiosInstance.get(`/checkout/checkout-details/${id}`)
         console.log(res)
         if (res.data.success) {
            setCheckoutItems(res.data.checkoutItems)
         }
      } catch (error) {
         console.log(error)
      }
   }
   const subTotal = checkoutItems.reduce((total: number, item: { [key: string]: any }) => total + (item?.dishes?.price * item.quantity), 0);
   const totalAmount = subTotal + shippingCharge + taxCharge

   // useLayoutEffect(() => {
   //    getBookingdetails(bookingId)
   // }, [bookingId]);

   // async function getBookingdetails(bookingId: string | number) {
   //    try {
   //       const res = await axiosInstance.get(`/bookings/booking-checkout/${bookingId}`);
   //       console.log('====>', res)
   //       if (res.data.success) {
   //          setBookings(res.data.booking)
   //          calculatePrice(res.data.booking.flight)
   //       }
   //    } catch (error) {
   //       console.log(error)
   //    } finally {
   //       setLoading(false)
   //    }
   // }

   return (
      <div className='w-full min-h-[70vh] theme-container'>
         <div className="flex flex-wrap -m-4">
            <div className="w-full lg:w-8/12 p-4">
               <div className="">
                  <div className="shadow-[0_0_10px_#f1f1f1] rounded p-4">
                     <StripePayment clientSecret={paymentId} userDetails={user} />
                     <p>4000003560000008</p>
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-4/12 p-4">
               <div className="">
                  {
                     checkoutItems?.map((item: { [key: string]: any }) => {
                        return (
                           <div key={item.id} className="">
                              <div className="flex flex-nowrap gap-2">
                                 <div className="">
                                    <Image src={item.dishes?.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${item.dishes.thumbnail}` : ''} width={64} height={64} alt="" className='w-16 h-16 aspect-square rounded' />
                                 </div>
                                 <div className="">
                                    <div className='text-base leading-none line-clamp-2 break-all'>{item.dishes?.title}</div>
                                    <div>{item.quantity} x ${item.dishes?.price}</div>
                                 </div>
                              </div>
                              <hr className='my-2' />
                           </div>
                        )
                     })
                  }
                  <ul className='space-y-2 mb-2'>
                     <li>
                        <div className="flex items-center justify-between gap-2">
                           <b className="text-base">Subtotal</b>
                           <div className="flex items-center">
                              <PiCurrencyInr />
                              <span>{subTotal}</span>
                           </div>
                        </div>
                     </li>
                     <li>
                        <div className="flex items-center justify-between gap-2">
                           <p className="text-base">Shipping Charge</p>
                           <div className="flex items-center">
                              {
                                 shippingCharge > 0 ?
                                    <>
                                       <PiCurrencyInr />
                                       <span>{shippingCharge}</span>
                                    </>
                                    : 'Free'
                              }

                           </div>
                        </div>
                     </li>
                     <li className='border-t'></li>
                     <li>
                        <div className="flex items-center justify-between gap-2">
                           <b className="text-base">Total Amount</b>
                           <div className="flex items-center">
                              <PiCurrencyInr />
                              <span>{totalAmount}</span>
                           </div>
                        </div>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PlaceOrderPage