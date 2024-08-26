'use client'
import { useCart } from '@/zustand'
import React, { useState } from 'react'

const AddCart = ({ foodDetails }: { foodDetails: { [key: string]: any } }) => {
   const { addCartItem } = useCart(state => state)
   const [qty, setQty] = useState(1)
   function handleCart() {
      const item = {
         id: foodDetails.id,
         name: foodDetails.title,
         price: foodDetails.price,
         quantity: qty,
         image: foodDetails.thumbnail,
      }
      addCartItem(item)
      // console.log(item)
   }
   const handleIncrement = () => {
      if (qty < 10) {
         setQty(qty + 1);
      }
   };
   const handleDecrement = () => {
      if (qty > 1) {
         setQty(qty - 1);
      }
   };
   return (
      <div>
         <ul className="flex flex-nowrap space-x-5">
            <li>
               <div className="border h-9 bg-[#FF9F0D] text-white inline-block rounded">
                  <button className="w-8 h-8 text-2xl" onClick={handleDecrement}>-</button>
                  <span className="w-8 h-8 inline-flex items-center justify-center">{qty}</span>
                  <button className="w-8 h-8" onClick={handleIncrement}>+</button>
               </div>
            </li>
            <li className="inline-block">
               <button className="bg-[#FF9F0D] h-9 text-white px-5 rounded" onClick={handleCart}>
                  Add to Cart
               </button>
            </li>
         </ul>
      </div>
   )
}

export default AddCart