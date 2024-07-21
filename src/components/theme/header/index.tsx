import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoBagOutline } from "react-icons/io5";

const Header = () => {
   return (
      <div className="container-webx bg-[#0e1927]">
         <div className="flex flex-nowrap items-center justify-between p-4">
            <div className="flex items-center gap-14">
               <div className="">
                  <Image src="/logo.svg" width="137" height="32" alt="" className="w-full h-8" />
               </div>
               <ul className="flex flex-nowrap space-x-8 *:text-white">
                  <li className="text-base">
                     <Link href="/">Home</Link>
                  </li>
                  <li className="text-base">
                     <Link href="/page/offer">Offer</Link>
                  </li>
                  <li className="text-base">
                     <Link href="/page/about">About</Link>
                  </li>
               </ul>
            </div>
            <div className="flex items-center gap-4">
               <div className="">
                  <Link href="/page/book-table" className="text-base text-white border border-gray-500 rounded-md py-2 px-5">
                     Book a Table
                  </Link>
               </div>
               <div className="">
                  <button type="button" className="text-base text-white">Sign In</button>
               </div>
               <div className="">
                  <button type="button" className="text-base text-white"><IoBagOutline size={25} /></button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
