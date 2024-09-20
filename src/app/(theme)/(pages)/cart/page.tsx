'use client'
import { useCart } from '@/zustand'
import React, { useContext, useState } from 'react'
import { PiCurrencyInr } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import Image from 'next/image';
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import { axiosInstance } from '@/config/axios';
import { useRouter } from 'next/navigation';
import { sessionContext } from '@/context/Session';

const CartPage = () => {
   const router = useRouter()
   const { login, user } = useContext(sessionContext)
   const { cartItems, removeCartItem, updateCartItem } = useCart(state => state)
   const [shippingCharge, setShippingCharge] = useState(0)
   const cartTotal = cartItems.items.reduce((total: number, item: { [key: string]: any }) => total + (item.price * item.quantity), 0);
   const totalAmount = cartTotal + shippingCharge

   async function handleCheckout() {
      try {
         if (!login) {
            router.push(`/login?redirect=cart`)
         }
         const checkoutId = uuidv4()
         const checkoutItems = cartItems?.items?.map((item: { [key: string]: any }) => {
            return {
               checkoutId,
               dishId: item.id,
               quantity: item.quantity,
               price: item.price
            }
         })
         const res = await axiosInstance.post(`/checkout/create-checkout`, checkoutItems)
         if (res.data.success) {
            router.push(`/checkout?checkoutId=${checkoutId}`)
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='theme-container w-full min-h-[70vh] !py-4'>
         <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1">
               <span className='text-2xl font-medium'>Your</span>
               <span className='text-2xl font-medium text-[#FF9F0D]'>Cart</span>
            </div>
         </div>
         {
            cartItems?.items.length === 0 ?
               <div className="">
                  No Product here
               </div>
               :
               <div className="">
                  <div className="flex flex-wrap *:p-2">
                     <div className="w-5/12">Items</div>
                     <div className="w-2/12">Price</div>
                     <div className="w-2/12">Quantity</div>
                     <div className="w-2/12">Total</div>
                     <div className="w-1/12">remove</div>
                  </div>
                  <hr />
                  {
                     cartItems?.items?.map((item: { [key: string]: any }) => {
                        return (
                           <div key={item?.id}>
                              <div className="flex flex-wrap items-center *:p-2">
                                 <div className="w-5/12">
                                    <div className="flex flex-nowrap gap-2">
                                       <Image src={process.env.NEXT_PUBLIC_BUCKET_URL + item?.image} width={64} height={64} alt="" className='w-16 h-16 aspect-square rounded' />
                                       <p>{item?.name}</p>
                                    </div>
                                 </div>
                                 <div className="w-2/12">
                                    <div className="flex items-center">
                                       <PiCurrencyInr />
                                       {item?.price}
                                    </div>
                                 </div>
                                 <div className="w-2/12">
                                    <div className="flex items-center gap-1">
                                       <button type="button" className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full' onClick={() => updateCartItem(item?.id, -1)}><AiOutlineMinus size={13} /></button>
                                       <span className='w-6 flex items-center justify-center'>{item?.quantity}</span>
                                       <button type="button" className='w-6 h-6 flex items-center justify-center hover:bg-gray-200 rounded-full' onClick={() => updateCartItem(item?.id, 1)}><BsPlus size={20} /></button>
                                    </div>
                                 </div>
                                 <div className="w-2/12">
                                    <div className="flex items-center">
                                       <PiCurrencyInr />
                                       {(item?.price * item?.quantity).toFixed(2)}
                                    </div>
                                 </div>
                                 <div className="w-1/12">
                                    <button onClick={() => removeCartItem(item?.id)} className='opacity-50 hover:opacity-100 hover:text-[#FF9F0D]'><IoCloseOutline size={25} /></button>
                                 </div>
                              </div>
                              <hr />
                           </div>
                        )
                     })
                  }
                  <div className="my-5">
                     <div className="flex flex-wrap -m-4">
                        <div className="w-8/12 p-4"></div>
                        <div className="w-4/12 p-4">
                           <div className="">
                              <div className="text-xl font-medium mb-2">Total Bill</div>
                              <ul className='border border-slate-300 space-y-2 rounded-md p-4 mb-2'>
                                 <li>
                                    <div className="flex items-center justify-between gap-2">
                                       <b className="text-base">Cart Subtotal</b>
                                       <div className="flex items-center">
                                          <PiCurrencyInr />
                                          <span>{cartTotal}</span>
                                       </div>
                                    </div>
                                 </li>
                                 <li>
                                    <div className="flex items-center justify-between gap-2">
                                       <p className="text-base">Shipping Charge</p>
                                       <div className="flex items-center">
                                          <PiCurrencyInr />
                                          <span>{shippingCharge}</span>
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
                              <div className="">
                                 <button type="button" className='text-white bg-[#FF9F0D] hover:bg-opacity-80 w-full py-1.5 rounded' onClick={handleCheckout}>Proceed to Checkout</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
         }
      </div >
   )
}

export default CartPage