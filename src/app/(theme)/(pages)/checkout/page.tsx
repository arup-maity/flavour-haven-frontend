'use client'
import { axiosInstance } from '@/config/axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { PiCurrencyInr } from 'react-icons/pi'
import { GoChevronLeft } from "react-icons/go";
import { sessionContext } from '@/context/Session'
import { useRouter } from 'next/navigation'
import { useCart } from '@/zustand'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from "zod";
import { IoCloseOutline } from "react-icons/io5";

type Inputs = {
   fullName: string;
   phone: string;
   streetAddress: string;
   city: string;
   state: string;
   zipCode: string;
   country: string;
}

interface CheckoutType {
   orderItems?: { [key: string]: number | string }[]
}

const CheckoutPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
   const checkoutId = searchParams.checkoutId || ''
   const router = useRouter()
   const { user } = useContext(sessionContext)
   const { deleteCart } = useCart(state => state)
   const [checkoutItems, setCheckoutItems] = useState<CheckoutType>({})
   const [shippingCharge, setShippingCharge] = useState(0)
   const [taxCharge, setTaxCharge] = useState(0)
   const [shippingAddresses, setShippingAddresses] = useState([])
   const [selectedShippingAddress, setSelectedShippingAddress] = useState<{ [key: string]: any }>({})
   // const [totalAmount, setTotalAmount] = useState(0)
   const [loading, setLoading] = useState<boolean>(true)
   const [paymentLoading, setPaymentLoading] = useState(false)
   useLayoutEffect(() => {
      checkoutDetails(checkoutId)
      // getShippingAddresses()
      setLoading(false)
   }, [checkoutId])
   async function checkoutDetails(id: string) {
      try {
         if (!id) return
         const res = await axiosInstance.get(`/checkout/checkout-details/${id}`)
         console.log('checkout details', res)
         if (res.data.success) {
            setCheckoutItems(res.data.checkout)
            // setTotalAmount(res.data.checkout.totalAmount)
         }
      } catch (error) {
         console.log(error)
      }
   }
   async function getShippingAddresses() {
      try {
         const res = await axiosInstance.get(`/user/account/address-details`)
         console.log('address', res)
         if (res.data.success) {
            setShippingAddresses(res.data.addressDetails)
         }
      } catch (error) {
         console.log(error)
      }
   }
   const subTotal = checkoutItems?.orderItems?.reduce((total: number, item: { [key: string]: any }) => total + (item?.price * item.quantity), 0) || 0;
   const totalAmount = subTotal + shippingCharge + taxCharge

   async function handlePayment() {
      try {
         setPaymentLoading(true)
         // if (Object.values(selectedShippingAddress).length === 0) {
         //    toast.error('Please select a shipping address')
         // } else {
         const { data } = await axiosInstance.post(`/checkout/create-payment`, {
            amount: totalAmount * 100,
            checkoutId,
            shippingAddress: selectedShippingAddress
         })
         if (data.success) {
            deleteCart()
            router.push(`/place-order?checkoutId=${checkoutId}&paymentId=${data.secret}`)
         }
         // }
      } catch (error) {
         console.log(error)
      } finally {
         setPaymentLoading(false)
      }
   }
   // Address Added
   const defaultValues = { fullName: '', phone: '', streetAddress: '', city: '', state: '', zipCode: '', country: '' }
   const schemaValidation = z.object({
      fullName: z.string().min(2),
      phone: z.string().min(10),
      streetAddress: z.string().min(2),
      city: z.string().min(2),
      state: z.string().min(2),
      zipCode: z.string().min(2),
      country: z.string().min(2),
   });
   const { register, handleSubmit, setValue, formState: { errors }, } = useForm<Inputs>({
      defaultValues,
      mode: "onSubmit",
      resolver: zodResolver(schemaValidation)
   })
   const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try {
         const response = await axiosInstance.post(`/user/account/add-address`, data)
         console.log(data)
         if (response.data.success) {
         }

      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }
   // 
   if (!checkoutId) {
      return (
         <div className="">
            notFound
         </div>
      )
   }
   if (loading) {
      return (
         <div className='w-full min-h-[70vh] flex items-center justify-center'>
            <div className="">
               <span className="">Loading...</span>
            </div>
         </div>
      )
   }
   return (
      <div className='theme-container !py-10'>
         <div className="flex flex-wrap -m-4">
            <div className="w-8/12 p-4">
               <div className="">
                  <p className='text-lg font-medium mb-2'>Shipping Address</p>
                  <div className="mb-5">
                     {
                        shippingAddresses?.map((address: { [key: string]: any }) =>
                           <div key={address.id} className="border border-slate-300 rounded p-2">
                              <label htmlFor="shippingAddress" className='cursor-pointer'>
                                 <input type="radio" name="shippingAddress" id="shippingAddress" onChange={() => setSelectedShippingAddress(address)} />
                                 <span className='ms-2'>Choose</span>
                              </label>
                              <p className='text-base'>{address.fullName}</p>
                              <p className='text-sm text-gray-400'>{address.phone}</p>
                              <p className='text-sm text-gray-400'>{address.streetAddress}</p>
                              <div className="flex items-center gap-1">
                                 <p className='text-sm text-gray-400'>{address.city},</p>
                                 <p className='text-sm text-gray-400'>{address.country}</p>
                              </div>
                           </div>
                        )
                     }
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)} className=''>
                     <div className="flex flex-wrap -m-2 mb-10">
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Full Name</label>
                           <input type="text" {...register("fullName")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.fullName && <p className='text-sm text-red-500 mt-1'>{errors.fullName.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Phone Number</label>
                           <input type="text" {...register("phone")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.phone && <p className='text-sm text-red-500 mt-1'>{errors.phone.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Country</label>
                           <input type="text" {...register("country")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.country && <p className='text-sm text-red-500 mt-1'>{errors.country.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>State</label>
                           <input type="text" {...register("state")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.state && <p className='text-sm text-red-500 mt-1'>{errors.state.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>City</label>
                           <input type="text" {...register("city")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.city && <p className='text-sm text-red-500 mt-1'>{errors.city.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Postal Code</label>
                           <input type="text" {...register("zipCode")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.zipCode && <p className='text-sm text-red-500 mt-1'>{errors.zipCode.message}</p>}

                        </div>
                        <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Address 1</label>
                           <input type="text" {...register("streetAddress")} className='w-full h-9 border border-slate-300 rounded p-2' />
                           {errors.streetAddress && <p className='text-sm text-red-500 mt-1'>{errors.streetAddress.message}</p>}

                        </div>
                        {/* <div className="w-full lg:w-6/12 p-2">
                           <label htmlFor="" className='block text-sm mb-1'>Address 2</label>
                           <input type="text" name="" id="" className='w-full h-9 border border-slate-300 rounded p-2' />
                        </div> */}
                     </div>
                  </form>
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
                     checkoutItems?.orderItems?.map((item: { [key: string]: any }) => {
                        return (
                           <div key={item.id} className="">
                              <div className="flex flex-nowrap gap-2">
                                 <div className="">
                                    <Image src={item.dishes?.thumbnail ? `${process.env.NEXT_PUBLIC_BUCKET_URL}${item.dishes.thumbnail}` : ''} width={64} height={64} alt="" className='w-16 h-16 aspect-square rounded' />
                                 </div>
                                 <div className="">
                                    <div className='text-base leading-none line-clamp-2 break-all'>{item.dishes.title}</div>
                                    <div className='flex items-center text-base'>{item.quantity} <IoCloseOutline />  <PiCurrencyInr />{item?.price}</div>
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
                     {/* <Link href={`/place-order?checkoutId=${checkoutId}`} className="w-full text-white text-base bg-[#FF9F0D] hover:opacity-80 rounded px-4 py-1.5">
                        Place an order
                     </Link> */}
                     <button disabled={paymentLoading} className="w-full text-white text-base bg-[#FF9F0D] hover:opacity-80 rounded px-4 py-1.5" onClick={handlePayment}>
                        {
                           paymentLoading ? 'Loading...' : 'Place an order'
                        }
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CheckoutPage