'use client'
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import UserDropdown from "./UserDropdown";
import CartModel from "./CartModel";
import MobileMenu from "./MobileMenu";
import { IoMenuOutline } from "react-icons/io5";
import { sessionContext } from "@/context/Session";
import { usePathname } from "next/navigation";
import { GoSearch } from "react-icons/go";
const Header = ({ className }: { className?: string }) => {
   const pathname = usePathname()
   const { login, user } = useContext(sessionContext)
   const [mobileMenu, setMobileMenu] = useState<boolean>(false)
   const [sticky, setSticky] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 700) {
            setSticky(true);
         } else {
            setSticky(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   return (
      <>
         <div className={`theme-header theme-container bg-transparent w-full z-[999] ${sticky ? 'sticky-header' : ''} transition-[position] duration-500 ease-in-out ${className}`}>
            <div className="flex flex-nowrap items-center justify-between py-3">
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
                        className="w-auto h-8 shrink-0"
                     />
                     <Image
                        src="/text-logo.png"
                        width="137"
                        height="40"
                        alt=""
                        className="w-auto h-9 shrink-0"
                     />
                  </Link>
                  <div className="hidden lg:block ms-24">
                     <ul className="flex flex-nowrap space-x-8 *:text-[#0c0c0c]">
                        <li className="">
                           <Link href="/" className={`text-base ${pathname === '/' && 'font-semibold border-b-2 border-[#195A00]'}`}>Home</Link>
                        </li>
                        <li className="">
                           <Link href="/menu" className={`text-base ${pathname === '/menu' && 'font-semibold border-b-2 border-[#195A00]'}`}>Menu</Link>
                        </li>
                        <li className="">
                           <Link href="/page/about" className={`text-base ${pathname === '/page/about' && 'font-semibold border-b-2 border-[#195A00]'}`}>About</Link>
                        </li>
                        <li className="">
                           <Link href="/page/contact" className={`text-base ${pathname === '/page/contact' && 'font-semibold border-b-2 border-[#195A00]'}`}>contact</Link>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="flex items-center gap-8">
                  {/* <div className="">
                     <Link
                        href="/page/book-table"
                        className="text-base text-[#0c0c0c] border border-gray-500 rounded-md py-2 px-5"
                     >
                        Book a Table
                     </Link>
                  </div> */}
                  <div className="">
                     <Link href="/search" className="text-base text-[#0c0c0c]">
                        <GoSearch size={25} />
                     </Link>
                  </div>
                  <div className="hidden md:block">
                     {login
                        ? <UserDropdown user={user} />
                        : <Link href="/login" className="inline-flex items-center h-12 text-base text-[#0c0c0c]">
                           <div className="">
                              <p className="text-sm font-light leading-none">
                                 Hello, Sign In /
                              </p>
                              <p className="text-base font-light leading-none">
                                 Create Account
                              </p>
                           </div>
                        </Link>}
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
