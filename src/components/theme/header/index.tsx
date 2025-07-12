'use client'
import React from 'react'

import { Calendar, ShoppingCart, UserRoundPlus } from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import { IoMenuOutline } from "react-icons/io5";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { axiosInstance } from '@/config/axios'
import { useRouter } from 'next/navigation'
import { useCart } from '@/zustand'
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { PiCurrencyInr } from 'react-icons/pi'
import { RiDeleteBinLine } from 'react-icons/ri'


const Header = () => {
   const [opencart, setOpencart] = React.useState(false)
   const [openmenu, setOpenmenu] = React.useState(false)
   return (
      <>
         <div className='fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md'>
            <div className="h-20 flex justify-between items-center px-4 md:px-10">
               <div className="">
                  <div className="">
                     <Image src="/logo/logo-03.png" width={137} height={40} alt="" className="w-auto h-8 md:h-10 shrink-0" />
                  </div>
               </div>
               <div className="hidden lg:block">
                  <ul className='flex items-center gap-10'>
                     <li className='border-b-2 border-[#195A00]'>
                        <Link href="/" className="text-lg font-semibold">Home</Link>
                     </li>
                     <li className='border-b-2 border-transparent'>
                        <Link href="/menu" className="text-lg font-semibold">Menu</Link>
                     </li>
                     <li className='border-b-2 border-transparent'>
                        <Link href="/" className="text-lg font-semibold">About</Link>
                     </li>
                     <li className='border-b-2 border-transparent'>
                        <Link href="/" className="text-lg font-semibold">Contacts</Link>
                     </li>
                  </ul>
               </div>
               <div className="flex items-center gap-5">
                  <div className="hidden lg:flex items-center gap-2">
                     <div className="">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="50" height="50" viewBox="0 0 256 256" className='fill-[#195A00]'>
                           <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                              <path d="M 24.342 65.261 H 8.063 c -0.557 0 -1.009 -0.451 -1.009 -1.009 c 0 -0.558 0.452 -1.009 1.009 -1.009 h 16.279 c 0.557 0 1.009 0.451 1.009 1.009 C 25.351 64.81 24.899 65.261 24.342 65.261 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 24.77 57.374 H 1.009 C 0.452 57.374 0 56.923 0 56.365 c 0 -0.557 0.452 -1.009 1.009 -1.009 H 24.77 c 0.557 0 1.009 0.452 1.009 1.009 C 25.779 56.923 25.327 57.374 24.77 57.374 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 14.65 49.487 H 1.009 C 0.452 49.487 0 49.036 0 48.478 c 0 -0.557 0.452 -1.009 1.009 -1.009 H 14.65 c 0.557 0 1.009 0.452 1.009 1.009 C 15.659 49.036 15.207 49.487 14.65 49.487 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 14.65 41.6 H 8.063 c -0.557 0 -1.009 -0.452 -1.009 -1.009 c 0 -0.557 0.452 -1.009 1.009 -1.009 h 6.587 c 0.557 0 1.009 0.452 1.009 1.009 C 15.659 41.148 15.207 41.6 14.65 41.6 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 44.983 52.424 H 25.049 c -2.364 0 -4.288 -1.924 -4.288 -4.289 V 37.088 c 0 -2.364 1.924 -4.288 4.288 -4.288 h 15.646 c 2.364 0 4.288 1.924 4.288 4.288 V 52.424 z M 25.049 34.796 c -1.264 0 -2.293 1.029 -2.293 2.293 v 11.046 c 0 1.265 1.029 2.294 2.293 2.294 h 17.939 v -13.34 c 0 -1.264 -1.029 -2.293 -2.293 -2.293 H 25.049 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 77.874 46.638 h -0.539 c -2.738 0 -4.967 -2.228 -4.967 -4.966 c 0 -2.739 2.229 -4.967 4.967 -4.967 h 0.539 c 1.204 0 2.185 0.98 2.185 2.185 v 5.563 C 80.059 45.657 79.079 46.638 77.874 46.638 z M 77.335 38.701 c -1.638 0 -2.971 1.333 -2.971 2.971 c 0 1.638 1.333 2.971 2.971 2.971 h 0.539 c 0.104 0 0.189 -0.085 0.189 -0.189 V 38.89 c 0 -0.104 -0.085 -0.189 -0.189 -0.189 H 77.335 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 72.705 70.122 c -0.034 0 -0.069 -0.002 -0.103 -0.006 c -0.37 -0.038 -0.687 -0.279 -0.824 -0.625 c -0.932 -2.349 -0.905 -4.925 0.074 -7.251 c 0.994 -2.358 2.847 -4.188 5.217 -5.153 c 2.372 -0.964 4.975 -0.949 7.334 0.045 c 2.578 1.086 4.547 3.245 5.401 5.923 c 0.114 0.354 0.02 0.742 -0.242 1.006 c -0.261 0.264 -0.647 0.361 -1.004 0.25 c -5.6 -1.734 -11.778 0.473 -15.022 5.364 C 73.35 69.957 73.037 70.122 72.705 70.122 z M 80.69 58.378 c -2.961 0 -5.779 1.743 -6.999 4.639 c -0.524 1.244 -0.704 2.579 -0.537 3.89 c 3.47 -3.918 8.779 -5.82 13.943 -4.981 c -0.82 -1.308 -2.024 -2.343 -3.471 -2.953 C 82.667 58.569 81.672 58.378 80.69 58.378 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 58.685 31.156 c -4.865 0 -9.446 -6.178 -9.446 -10.966 c 0 -2.383 1.227 -6.382 9.446 -6.382 c 4.783 0 8.674 3.891 8.674 8.674 S 63.468 31.156 58.685 31.156 z M 58.685 15.803 c -4.944 0 -7.45 1.476 -7.45 4.386 c 0 3.706 3.853 8.971 7.45 8.971 c 3.682 0 6.679 -2.996 6.679 -6.678 S 62.367 15.803 58.685 15.803 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 59.367 31.173 l -1.889 -6.443 c -0.274 -0.935 -0.036 -1.916 0.635 -2.622 c 0.673 -0.706 1.643 -0.989 2.588 -0.765 l 6.693 1.607 l -0.146 0.913 c -0.58 3.619 -3.392 6.492 -6.997 7.149 L 59.367 31.173 z M 60.062 23.262 c -0.26 0 -0.433 0.148 -0.503 0.221 c -0.085 0.088 -0.269 0.333 -0.166 0.685 l 1.366 4.661 c 2.061 -0.671 3.675 -2.314 4.31 -4.385 l -4.834 -1.161 C 60.174 23.269 60.115 23.262 60.062 23.262 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 70.875 41.508 c -0.231 0 -0.463 -0.05 -0.681 -0.151 c -0.781 -0.362 -1.72 -0.57 -2.876 -0.639 c -0.527 -0.031 -0.938 -0.468 -0.938 -0.996 v -3.441 c 0 -0.551 0.446 -0.998 0.998 -0.998 h 2.058 c 1.675 0 3.037 1.362 3.037 3.037 v 1.593 c 0 0.546 -0.274 1.047 -0.733 1.341 C 71.477 41.423 71.177 41.508 70.875 41.508 z M 68.376 38.815 c 0.773 0.1 1.468 0.267 2.102 0.501 v -0.995 c 0 -0.574 -0.468 -1.041 -1.042 -1.041 h -1.06 V 38.815 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 54.901 46.866 c -0.149 0 -0.299 -0.033 -0.438 -0.101 c -0.927 -0.452 -1.924 -0.682 -2.965 -0.682 h -7.513 c -0.551 0 -0.998 -0.447 -0.998 -0.998 V 40.77 c 0 -6.643 5.405 -12.057 12.048 -12.068 c 3.748 0 6.846 2.985 7.86 5.793 c 0.171 0.472 0.613 0.788 1.101 0.788 h 3.381 c 0.552 0 0.998 0.447 0.998 0.998 v 3.649 c 0 1.688 -1.373 3.061 -3.061 3.061 h -4.468 c -1.021 0 -1.986 -0.248 -2.837 -0.686 c -1.424 1.229 -2.134 2.42 -2.112 3.543 c 0.007 0.347 -0.168 0.673 -0.461 0.86 C 55.275 46.813 55.088 46.866 54.901 46.866 z M 44.983 44.087 h 6.515 c 0.892 0 1.759 0.131 2.593 0.389 c 0.33 -1.151 1.095 -2.284 2.286 -3.386 c -1.079 -1.119 -1.743 -2.639 -1.743 -4.312 c 0 -0.551 0.446 -0.998 0.998 -0.998 s 0.998 0.447 0.998 0.998 c 0 2.325 1.892 4.218 4.217 4.218 h 4.468 c 0.588 0 1.065 -0.478 1.065 -1.065 v -2.651 h -2.383 c -1.326 0 -2.524 -0.847 -2.978 -2.107 c -0.67 -1.858 -2.97 -4.475 -5.981 -4.475 c -5.544 0.009 -10.054 4.528 -10.054 10.072 V 44.087 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 59.272 61.939 H 54.95 c -2.015 0 -3.655 -1.64 -3.655 -3.655 v -2.541 c 0 -1.83 -1.489 -3.319 -3.32 -3.319 h -3.989 c -0.551 0 -0.998 -0.446 -0.998 -0.998 v -6.341 c 0 -0.551 0.447 -0.998 0.998 -0.998 h 7.513 c 4.837 0 8.772 3.935 8.772 8.771 v 8.083 C 60.27 61.493 59.824 61.939 59.272 61.939 z M 44.983 50.428 h 2.991 c 2.931 0 5.315 2.384 5.315 5.315 v 2.541 c 0 0.915 0.744 1.659 1.659 1.659 h 3.325 v -7.085 c 0 -3.736 -3.04 -6.776 -6.776 -6.776 h -6.515 V 50.428 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 43.232 72.36 c -2.694 0 -4.886 -2.192 -4.886 -4.887 c 0 -0.357 0.045 -0.723 0.139 -1.121 l 1.942 0.458 c -0.057 0.246 -0.086 0.462 -0.086 0.663 c 0 1.594 1.297 2.891 2.891 2.891 s 2.891 -1.297 2.891 -2.891 c 0 -0.201 -0.028 -0.417 -0.086 -0.662 l 1.941 -0.46 c 0.095 0.397 0.14 0.764 0.14 1.122 C 48.118 70.167 45.927 72.36 43.232 72.36 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 43.232 76.192 c -4.807 0 -8.719 -3.911 -8.719 -8.719 c 0 -0.34 0.024 -0.674 0.062 -1.006 l 1.983 0.228 c -0.03 0.255 -0.049 0.514 -0.049 0.778 c 0 3.708 3.016 6.724 6.723 6.724 s 6.723 -3.016 6.723 -6.724 c 0 -0.263 -0.019 -0.521 -0.049 -0.777 l 1.982 -0.23 c 0.039 0.331 0.062 0.666 0.062 1.007 C 51.951 72.281 48.039 76.192 43.232 76.192 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 81.281 76.192 c -4.593 0 -8.411 -3.593 -8.692 -8.179 l 1.992 -0.123 c 0.216 3.536 3.16 6.306 6.7 6.306 c 3.708 0 6.724 -3.016 6.724 -6.724 c 0 -1.388 -0.425 -2.724 -1.228 -3.864 l 1.631 -1.15 C 89.449 63.938 90 65.671 90 67.473 C 90 72.281 86.089 76.192 81.281 76.192 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 81.281 72.36 c -2.694 0 -4.886 -2.192 -4.886 -4.887 s 2.191 -4.886 4.886 -4.886 s 4.887 2.191 4.887 4.886 S 83.975 72.36 81.281 72.36 z M 81.281 64.583 c -1.593 0 -2.89 1.297 -2.89 2.89 c 0 1.594 1.297 2.891 2.89 2.891 c 1.594 0 2.891 -1.297 2.891 -2.891 C 84.172 65.88 82.875 64.583 81.281 64.583 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                              <path d="M 73.202 67.579 h -40.58 c -1.143 0 -2.215 -0.56 -2.868 -1.5 c -0.653 -0.939 -0.804 -2.14 -0.405 -3.212 l 1.929 -5.185 c 1.615 -4.339 5.811 -7.255 10.441 -7.255 h 6.257 c 2.931 0 5.315 2.384 5.315 5.315 v 2.541 c 0 0.915 0.744 1.659 1.659 1.659 h 12.403 c 0.575 0 1.114 -0.254 1.477 -0.699 c 0.372 -0.452 0.516 -1.039 0.395 -1.611 l -3.402 -16.07 l 1.953 -0.413 l 3.402 16.07 c 0.248 1.169 -0.046 2.369 -0.805 3.292 c -0.744 0.906 -1.845 1.427 -3.02 1.427 H 54.95 c -2.015 0 -3.655 -1.64 -3.655 -3.655 v -2.541 c 0 -1.83 -1.489 -3.319 -3.32 -3.319 h -6.257 c -3.801 0 -7.245 2.393 -8.571 5.955 l -1.929 5.185 c -0.173 0.467 -0.11 0.969 0.174 1.377 c 0.284 0.409 0.732 0.643 1.229 0.643 h 38.489 c 0.041 -1.15 0.289 -2.269 0.741 -3.342 c 1.415 -3.355 4.617 -5.577 8.157 -5.829 l -9.4 -16.486 l 1.734 -0.988 l 11.263 19.755 l -1.98 -0.249 c -3.356 -0.428 -6.622 1.457 -7.935 4.574 c -0.468 1.109 -0.659 2.283 -0.569 3.49 L 73.202 67.579 z" transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                           </g>
                        </svg>
                     </div>
                     <div className="">
                        <p className='text-sm text-[#02060c]'>Call And Order In</p>
                        <a href="tel:7908078976" className='text-base text-[#02060c] font-bold'>+91 790 807 8976</a>
                     </div>
                  </div>
                  <div className="">
                     <div className="relative border border-[#195A00] rounded-full p-2.5"
                        onClick={() => setOpencart(prev => !prev)}
                     >
                        <ShoppingCart size={16} className='text-[#195A00]' />
                        <span className='absolute -top-1 -right-1 bg-[#195A00] text-xs text-white w-5 h-5 flex items-center justify-center rounded-full'>0</span>
                     </div>
                  </div>
                  <div className="">
                     <div className="relative border border-[#195A00] rounded-full p-2.5">
                        <UserRoundPlus size={20} className='text-[#195A00]' />
                     </div>
                  </div>
                  <div className="hidden lg:block">
                     <div className="relative flex items-center gap-2 border border-[#195A00] rounded-full p-2.5 px-6">
                        <Calendar size={20} className='text-[#195A00]' />
                        Reservation
                     </div>
                  </div>
                  <div className="lg:hidden">
                     <div className="relative flex items-center gap-2 border border-[#195A00] rounded-full p-2"
                        onClick={() => setOpenmenu(prev => !prev)}
                     >
                        <IoMenuOutline size={22} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <CartModel open={opencart} close={() => setOpencart(false)} />
         <MobileMenu open={openmenu} close={() => setOpenmenu(false)} />
      </>
   )
}

export default Header

const CartModel = ({ open, close }: { open: boolean, close: () => void }) => {

   const router = useRouter()
   const { cartItems, removeCartItem, updateCartItem } = useCart(state => state)

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
      <Sheet open={open} onOpenChange={close}>
         <SheetContent className='w-80'>
            <SheetHeader>
               <SheetTitle>
                  <div className="flex items-center gap-2">
                     <span className="text-lg font-medium">Cart Itms: {cartItems.count}</span>
                  </div>
               </SheetTitle>
               <SheetDescription className='hidden'></SheetDescription>
            </SheetHeader>
            <div className="">
               <div className="py-6">
                  {
                     cartItems.items.length === 0 ?
                        <div className="text-base font-redHat text-center">No Food here</div>
                        :
                        cartItems.items.map((item: { [key: string]: any }, index: number) => (
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
                        ))
                  }
               </div>
            </div>
         </SheetContent>
      </Sheet>
   )
}


const MobileMenu = ({ open, close }: { open: boolean, close: () => void }) => {
   return (
      <Sheet open={open} onOpenChange={close}>
         <SheetContent className='w-80'>
            <SheetHeader>
               <SheetTitle>
                  <Image src="/logo/logo-03.png" width={137} height={40} alt="" className="w-auto h-8 md:h-10 shrink-0" />
               </SheetTitle>
               <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="mt-6">
               <ul className='space-y-3'>
                  <li onClick={close}>
                     <Link href="/" className="text-lg font-semibold">Home</Link>
                  </li>
                  <li onClick={close}>
                     <Link href="/" className="text-lg font-semibold">Menu</Link>
                  </li>
                  <li onClick={close}>
                     <Link href="/" className="text-lg font-semibold">About</Link>
                  </li>
                  <li onClick={close}>
                     <Link href="/" className="text-lg font-semibold">Contacts</Link>
                  </li>
               </ul>
            </div>
         </SheetContent>
      </Sheet>
   )
}



















// import React, { useContext, useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import UserDropdown from "./UserDropdown";
// import CartModel from "./CartModel";
// import MobileMenu from "./MobileMenu";
// import { IoMenuOutline } from "react-icons/io5";
// import { sessionContext } from "@/context/Session";
// import { usePathname } from "next/navigation";
// import { GoSearch } from "react-icons/go";
// const Header = ({ className }: { className?: string }) => {
//    const pathname = usePathname()
//    const { login, user } = useContext(sessionContext)
//    const [mobileMenu, setMobileMenu] = useState<boolean>(false)
//    const [sticky, setSticky] = useState(false);

//    useEffect(() => {
//       const handleScroll = () => {
//          if (window.scrollY > 700) {
//             setSticky(true);
//          } else {
//             setSticky(false);
//          }
//       };

//       window.addEventListener("scroll", handleScroll);
//       return () => {
//          window.removeEventListener("scroll", handleScroll);
//       };
//    }, []);

//    return (
//       <>
//          <div className={`theme-header theme-container w-full h-[75px] bg-white flex items-center z-[999] ${sticky ? 'sticky-header' : 'fixed'} transition-[position] duration-500 ease-in-out ${className}`}>
//             <div className="w-full flex flex-nowrap items-center justify-between py-4">
//                <div className="flex items-center gap-4">
//                   <div className="block lg:hidden" onClick={() => setMobileMenu(prev => !prev)}>
//                      <IoMenuOutline size={30} />
//                   </div>
//                   <Link href='/' className="flex items-center">
//                      <Image
//                         src="/logo.png"
//                         width="137"
//                         height="40"
//                         alt=""
//                         className="w-auto h-8 shrink-0"
//                      />
//                      <Image
//                         src="/text-logo.png"
//                         width="137"
//                         height="40"
//                         alt=""
//                         className="w-auto h-9 shrink-0"
//                      />
//                   </Link>

//                </div>
//                <div className="hidden lg:block">
//                   <ul className="flex flex-nowrap space-x-8 ">
//                      <li className="">
//                         <Link href="/" className={`text-base ${pathname === '/' && 'font-semibold text-lg border-b-2 border-[#195A00]'}`}>Home</Link>
//                      </li>
//                      <li className="">
//                         <Link href="/menu" className={`text-base ${pathname === '/menu' && 'font-semibold text-lg border-b-2 border-[#195A00]'}`}>Menu</Link>
//                      </li>
//                      <li className="">
//                         <Link href="/page/about" className={`text-base ${pathname === '/page/about' && 'font-semibold text-lg border-b-2 border-[#195A00]'}`}>About</Link>
//                      </li>
//                      <li className="">
//                         <Link href="/page/contact" className={`text-base ${pathname === '/page/contact' && 'font-semibold text-lg border-b-2 border-[#195A00]'}`}>Contact</Link>
//                      </li>
//                   </ul>
//                </div>
//                <div className="flex items-center gap-8">
//                   <div className="">
//                      <Link href="/search" className="text-base">
//                         <GoSearch size={25} />
//                      </Link>
//                   </div>
//                   <div className="hidden md:block">
//                      {login
//                         ? <UserDropdown user={user} />
//                         : <Link href="/login" className="inline-flex items-center h-12 text-base">
//                            <div className="">
//                               <p className="text-sm font-light leading-none">
//                                  Hello, Sign In /
//                               </p>
//                               <p className="text-base font-light leading-none">
//                                  Create Account
//                               </p>
//                            </div>
//                         </Link>}
//                   </div>
//                   <div className="">
//                      <CartModel />
//                   </div>
//                </div>
//             </div>
//          </div>
//          {/* mobile menu */}
//          <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
//       </>
//    );
// };

// export default Header;
