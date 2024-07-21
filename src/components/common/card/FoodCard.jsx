import { Fragment } from "react";
import Image from "next/image";

const FoodCard = ({ card }) => {
   return (
      <Fragment>
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
      </Fragment>
   );
};

export default FoodCard;
