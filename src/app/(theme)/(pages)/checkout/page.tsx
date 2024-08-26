'use client'
import { axiosInstance } from '@/config/axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { PiCurrencyInr } from 'react-icons/pi'
import { GoChevronLeft } from "react-icons/go";
import { sessionContext } from '@/authentication/AuthSession'

const CheckoutPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
   const checkoutId = searchParams.checkoutId || ''
   const session = useContext(sessionContext)
   console.log('session', session)
   const [checkoutItems, setCheckoutItems] = useState([])
   const [shippingCharge, setShippingCharge] = useState(0)
   const [taxCharge, setTaxCharge] = useState(0)
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
   return (
      <div className='theme-container !py-10'>
         <div className="flex flex-wrap -m-4">
            <div className="w-8/12 p-4">
               <div className="">
                  <p className='text-lg font-medium mb-2'>Shipping Address</p>
                  <div className="flex flex-wrap -m-2 mb-10">
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>First Name</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Last Name</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Email</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Phone Number</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Country</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Postal Code</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Address 1</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                     <div className="w-full lg:w-6/12 p-2">
                        <label htmlFor="" className='block text-sm mb-1'>Address 2</label>
                        <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                     </div>
                  </div>
                  <div className="flex -m-2">
                     <div className="w-full lg:w-6/12 p-2">
                        <Link href='/cart' className='inline-flex items-center border border-slate-300 py-1 px-4'>
                           <GoChevronLeft />
                           <span>Back to cart</span>
                        </Link>
                     </div>
                     <div className="w-full lg:w-6/12"></div>
                  </div>
               </div>
            </div>
            <div className="w-4/12 p-4">
               <div className="border border-slate-300 rounded p-3">
                  {
                     checkoutItems?.map((item) => {
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
                  <div className="flex items-center gap-2">
                     <button className="w-full text-white text-base bg-[#FF9F0D] hover:opacity-80 rounded px-4 py-1.5">
                        Place an order
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CheckoutPage