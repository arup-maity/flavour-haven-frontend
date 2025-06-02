'use client'
import { cn } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from 'react'
import FoodReview from "./FoodReview";

let tabs = [
   { id: "description", label: "Description" },
   { id: "reviews", label: "Reviews" }
];

const DetailsSection = ({ description }: { description: string }) => {
   const [activeTab, setActiveTab] = useState('description');
   return (
      <div>
         <div className="mb-4">
            {tabs?.map((item, idx) => (
               <button key={idx} className={cn('relative')} onClick={() => setActiveTab(item.id)}>
                  <AnimatePresence>
                     {item?.id === activeTab && (
                        <motion.div
                           layoutId="tab-example-pointer"
                           className={cn(
                              'absolute inset-0 bottom-0 h-full w-full bg-[#FF9F0D] backdrop-blur',
                              idx === 0 && 'rounded-l-sm',
                           )}
                        />
                     )}
                  </AnimatePresence>
                  <div className={cn('relative z-[1] flex items-center space-x-2 px-3 py-1 font-light uppercase')}>
                     <span>{item.label}</span>
                  </div>
               </button>
            ))}
         </div>
         <div className="w-full">
            <AnimatePresence >
               <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  transition={{
                     type: 'spring',
                     duration: 1,
                     delay: 0.25,
                     stiffness: 260,
                     damping: 20
                  }}
                  className="h-full w-full overflow-y-auto"
               >
                  {activeTab === 'description' && <div className="whitespace-pre-wrap">{description}</div>}
                  {activeTab === 'reviews' && <FoodReview />}
               </motion.div>
            </AnimatePresence>
         </div>
         {/* </div> */}
      </div>
   )
}

export default DetailsSection