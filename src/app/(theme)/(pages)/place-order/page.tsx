'use client'

import { axiosInstance } from '@/config/axios';
import { sessionContext } from '@/context/Session';
import StripePayment from '@/payment/StripePayment';
import Image from 'next/image';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { PiCurrencyInr } from 'react-icons/pi';

interface SearchParams {
   searchParams: {
      [key: string]: string | undefined;
   };
}

interface CheckoutItem {
   id: string;
   quantity: number;
   dishes: {
      title: string;
      thumbnail?: string;
      price: number;
   };
}

const PlaceOrderPage = ({ searchParams }: SearchParams) => {
   const checkoutId = searchParams.checkoutId || '';
   const paymentId = searchParams.paymentId || '';
   const { user } = useContext(sessionContext);

   const [checkoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
   const [shippingCharge, setShippingCharge] = useState(0);
   const [taxCharge, setTaxCharge] = useState(0);

   useLayoutEffect(() => {
      checkoutDetails(checkoutId);
   }, [checkoutId]);

   async function checkoutDetails(id: string) {
      try {
         const res = await axiosInstance.get(`/checkout/checkout-details/${id}`);
         console.log(res);
         if (res.data.success) {
            setCheckoutItems(res.data.checkout.orderItems);
         }
      } catch (error) {
         console.error(error);
      }
   }

   const subTotal = checkoutItems.reduce(
      (total, item) => total + item.dishes.price * item.quantity,
      0
   );
   const totalAmount = subTotal + shippingCharge + taxCharge;

   return (
      <div className="w-full min-h-[70vh] theme-container">
         <div className="flex flex-wrap -m-4">
            <div className="w-full lg:w-8/12 p-4">
               <div className="shadow-[0_0_10px_#f1f1f1] rounded p-4">
                  <StripePayment clientSecret={paymentId} userDetails={user} />
                  <p>4000003560000008</p>
               </div>
            </div>
            <div className="w-full lg:w-4/12 p-4">
               <div>
                  {checkoutItems.map((item) => (
                     <div key={item.id} className="mb-4">
                        <div className="flex flex-nowrap gap-2">
                           <div>
                              <Image
                                 src={item.dishes.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${item.dishes.thumbnail}` : ''}
                                 width={64}
                                 height={64}
                                 alt={item.dishes.title}
                                 className="w-16 h-16 aspect-square rounded"
                              />
                           </div>
                           <div>
                              <div className="text-base leading-none line-clamp-2 break-all">
                                 {item.dishes.title}
                              </div>
                              <div>
                                 {item.quantity} x <PiCurrencyInr /> {item.dishes.price}
                              </div>
                           </div>
                        </div>
                        <hr className="my-2" />
                     </div>
                  ))}
                  <ul className="space-y-2 mb-2">
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
                              {shippingCharge > 0 ? (
                                 <>
                                    <PiCurrencyInr />
                                    <span>{shippingCharge}</span>
                                 </>
                              ) : (
                                 'Free'
                              )}
                           </div>
                        </div>
                     </li>
                     <li className="border-t"></li>
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
   );
};

export default PlaceOrderPage;
