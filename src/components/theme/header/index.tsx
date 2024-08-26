'use client'
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/authentication/Session";
import UserDropdown from "./UserDropdown";
import CartModel from "./CartModel";
import MobileMenu from "./MobileMenu";
import { IoMenuOutline } from "react-icons/io5";

const Header = () => {
   // const session = await getSession();
   const [mobileMenu, setMobileMenu] = useState<boolean>(false)

   return (
      <>
         <div className="theme-container bg-transparent w-full">
            <div className="flex flex-nowrap items-center justify-between py-4">
               <div className="flex items-center gap-4">
                  <div className="block lg:hidden" onClick={() => setMobileMenu(prev => !prev)}>
                     <IoMenuOutline size={30} />
                  </div>
                  <Link href='/' className="flex items-center">
                     <Image
                        src="/logo.png"
                        width="137"
                        height="40"
                        alt=""
                        className="w-auto h-10 shrink-0"
                     />
                     <Image
                        src="/text-logo.png"
                        width="137"
                        height="40"
                        alt=""
                        className="w-auto h-10 shrink-0"
                     />
                  </Link>
               </div>
               <div className="hidden lg:block">
                  <ul className="flex flex-nowrap space-x-8 *:text-[#0c0c0c]">
                     <li className="text-base font-medium">
                        <Link href="/">Home</Link>
                     </li>
                     <li className="text-base font-medium">
                        <Link href="/menu">Menu</Link>
                     </li>
                     <li className="text-base font-medium">
                        <Link href="/page/offer">Offer</Link>
                     </li>
                     <li className="text-base font-medium">
                        <Link href="/page/about">About</Link>
                     </li>
                     <li className="text-base font-medium">
                        <Link href="/page/contact">contact</Link>
                     </li>
                  </ul>
               </div>
               <div className="flex items-center gap-5">
                  {/* <div className="">
                  <Link
                     href="/page/book-table"
                     className="text-base text-[#0c0c0c] border border-gray-500 rounded-md py-2 px-5"
                  >
                     Book a Table
                  </Link>
               </div> */}
                  <div className="hidden md:block">
                     <Link href="/login" className="text-base text-[#0c0c0c]">
                        <p className="text-sm font-light leading-none">
                           Hello, Sign In /
                        </p>
                        <p className="text-base font-light leading-none">
                           Create Account
                        </p>
                     </Link>
                     {/* {session.login
                        ? <UserDropdown user={{}} />
                        : <Link href="/login" className="text-base text-[#0c0c0c]">
                           <p className="text-sm font-light leading-none">
                              Hello, Sign In /
                           </p>
                           <p className="text-base font-light leading-none">
                              Create Account
                           </p>
                        </Link>} */}
                  </div>
                  <div className="">
                     <CartModel />
                  </div>
               </div>
            </div>
         </div>
         {/* mobile menu */}
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   );
};

export default Header;
