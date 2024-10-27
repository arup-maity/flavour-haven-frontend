'use client'
import { Offcanvas } from '@/ui-components'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useCart } from '@/zustand'
import { v4 as uuidv4 } from 'uuid';
import { IoBagOutline } from 'react-icons/io5'
import { PiCurrencyInr } from "react-icons/pi";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { axiosInstance } from '@/config/axios'
import { useRouter } from 'next/navigation'

const CartModel = () => {
   const router = useRouter()
   const { cartItems, removeCartItem, updateCartItem } = useCart(state => state)
   const [open, setOpen] = useState<boolean>(false)

   const totalPrice = cartItems.items.reduce((total: number, item: { [key: string]: any }) => total + (item.price * item.quantity), 0);
   const handleIncrement = (id: number) => {
      updateCartItem(id, 1)
   };
   const handleDecrement = (id: number) => {
      updateCartItem(id, -1)
   };
   async function handleCheckout() {
      try {
         const checkoutId = uuidv4()
         const checkoutItems = cartItems?.items?.map((item: { [key: string]: any }) => {
            return {
               checkoutId,
               dishId: item.id,
               quantity: item.quantity
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
      <>
         <div role="button" className="text-base text-[#0c0c0c]">
            <div className="relative" onClick={() => setOpen(prev => !prev)}>
               <IoBagOutline size={25} />
               {
                  cartItems.count !== 0 &&
                  <span className="w-[18px] h-[18px] absolute top-0 -right-1.5 flex items-center justify-center bg-white text-xs text-[#0E1927] font-medium rounded-full">{cartItems.count}</span>
               }
            </div>
         </div>
         <Offcanvas isOpen={open} toggle={() => setOpen(prev => !prev)} className='w-96'>
            <Offcanvas.Header toggle={() => setOpen(prev => !prev)}>
               <div className="flex items-center gap-2 py-2">
                  <IoBagOutline size={21} />
                  <span className="text-xl font-medium">Cart {cartItems.count}</span>
               </div>
            </Offcanvas.Header>
            <Offcanvas.Body className='overflow-hidden overflow-y-scroll'>
               <div className="">
                  {cartItems.items.map((item: { [key: string]: any }, index: number) => (
                     <div key={index}>
                        <div className="flex items-center gap-2">
                           <Image src={process.env.NEXT_PUBLIC_BUCKET_URL + item.image} width={64} height={64} alt='' className='w-16 h-16 aspect-square rounded' />
                           <div className='flex-grow'>
                              <div className="text-Base font-medium leading-none line-clamp-2 break-all mb-2">{item.name}</div>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center">
                                    <button className="w-6 h-6 flex items-center justify-center bg-[#FF9F0D] bg-opacity-40 rounded" onClick={() => handleDecrement(item.id)}><AiOutlineMinus size={14} /></button>
                                    <span className="w-6 h-6 inline-flex items-center justify-center">{item.quantity}</span>
                                    <button className="w-6 h-6 flex items-center justify-center bg-[#FF9F0D] bg-opacity-40 rounded" onClick={() => handleIncrement(item.id)}><AiOutlinePlus size={14} /></button>
                                 </div>
                                 <span className="flex items-center text-base opacity-70 leading-none"><PiCurrencyInr />{item.price}</span>
                              </div>
                           </div>
                           <div className="ms-4">
                              <button className="text-red-700 opacity-40 hover:opacity-100" onClick={() => removeCartItem(item?.id)}>
                                 <RiDeleteBinLine size={20} />
                              </button>
                           </div>
                        </div>
                        <hr className='my-2' />
                     </div>
                  ))}
               </div>
            </Offcanvas.Body>
            <Offcanvas.Footer>
               <div className="">
                  <div className="mb-2">Total: {totalPrice}</div>
                  <div className="flex items-center gap-2">
                     <Link href='/cart' className="basis-1/2 text-center bg-gray-300 text-base rounded p-1.5" onClick={() => setOpen(prev => !prev)}>View Cart</Link>
                     {/* <div className="basis-1/2 text-center bg-[#FF9F0D] text-base text-white rounded p-1.5" onClick={() => { setOpen(prev => !prev); handleCheckout }}>Checkout</div> */}
                  </div>
               </div>
            </Offcanvas.Footer>
         </Offcanvas>
      </>
   )
}

export default CartModel