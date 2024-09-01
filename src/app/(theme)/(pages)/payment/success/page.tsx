'use client'
import React, { useLayoutEffect } from 'react'
import { axiosInstance } from '@/config/axios'

const PaymentSuccessPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {

   const payment_intent = searchParams.payment_intent || ''
   const payment_intent_client_secret = searchParams.payment_intent_client_secret || ''
   const redirect_status = searchParams.redirect_status || ''

   useLayoutEffect(() => {
      getPayment(payment_intent)
   }, [payment_intent])

   async function getPayment(payment_intent: string) {
      try {
         const res = await axiosInstance.get(`/checkout/webhook/${payment_intent}`)
         console.log('Payment ==>', res)
         // if (res.data.intent?.status === 'succeeded') {
         //    // setPaymentDetails(res.data.intent)
         // }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='w-full h-screen flex items-center justify-center'>
         <div className="">
            <p>Don&apos;t refreshing or back the page</p>
            <p>Please wait...</p>
         </div>
      </div>
   )
}

export default PaymentSuccessPage

// http://localhost:3001/payment/success?payment_intent=pi_3PtktpSERFuCCBsc0GOb2xUE&payment_intent_client_secret=pi_3PtktpSERFuCCBsc0GOb2xUE_secret_HLs5r07XD8orXn6izFqJmGagc&redirect_status=succeeded