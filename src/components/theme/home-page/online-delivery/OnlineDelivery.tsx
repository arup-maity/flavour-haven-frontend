import React, { Fragment } from "react";
import Image from "next/image";

const foodList = [
   {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "Pizzas, Italian, Pastas, Desserts",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-9.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-10.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-11.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-12.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   },
   {
      image: "img-13.png",
      title: "Roll Xpress",
      description: "",
      rating: 4.2,
      time: "25-30 mins"
   }
];

const OnlineDelivery = () => {
   return (
      <div className="w-full">
         <ul className="flex space-x-4">
            <li className="border border-gray-300 rounded-3xl py-1 px-5">Filter</li>
            <li className="border border-gray-300 rounded-3xl py-1 px-5">Sort By</li>
            <li className="border border-gray-300 rounded-3xl py-1 px-5">Fast Delivary</li>
            <li className="border border-gray-300 rounded-3xl py-1 px-5">Pure Vag</li>
         </ul>
         <div className="w-full flex flex-wrap -mx-3">
            {foodList &&
               foodList?.slice(0, 12).map((card, index) => {
                  return (
                     <div key={index} className="w-4/12 p-3 relative h-full">
                        <div className="block relative h-full rounded-lg overflow-hidden">
                           <div className="relative w-full aspect-[250/150]">
                              <Image src={`/${card?.image}`} width={250} height={100} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div className="absolute bottom-0 right-0 left-0 h-20 grid content-end bg-gradient-to-b  from-[#1b1e2411] to-[#0c0c0cf0] z-10 p-3">
                              <p className="text-[22px] font-bold text-white uppercase">60% off upto $120</p>
                           </div>
                        </div>
                        <div className="">
                           <h3 className="text-lg font-medium line-clamp-1">{card?.title}</h3>
                           <ul className="flex space-x-2">
                              <li className="text-base font-medium">{card?.rating}</li>
                              <li className="text-base font-medium">{card?.time}</li>
                           </ul>
                           <p className="text-sm text-gray-400 line-clamp-1">{card?.description}</p>
                        </div>
                     </div>
                  );
               })}
         </div>
      </div>
   );
};

export default OnlineDelivery;
