'use client'
import { axiosInstance } from '@/config/axios'
import React, { useLayoutEffect } from 'react'

const OrderDetailsPage = () => {
   useLayoutEffect(() => {
      getOrderList()

   }, [])
   async function getOrderList() {
      try {
         const response = await axiosInstance.get(`/user/account/order-list`)
         console.log(response)
      } catch (error) {
         console.error('Error fetching order list:', error)
      }
   }

   return (
      <div>OrderDetailsPage</div>
   )
}

export default OrderDetailsPage