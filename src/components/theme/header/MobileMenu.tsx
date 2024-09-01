import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
interface MobileMenuProps {
   mobileMenu: boolean;
   setMobileMenu: (value: boolean) => void;
 }
 
 const MobileMenu: React.FC<MobileMenuProps> = ({ mobileMenu, setMobileMenu }) => {
   return (
      <>
         <div className={`mobile-menu fixed bg-white w-[300px] z-[999] top-0 bottom-0 ${mobileMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out`}>
            <div className="flex flex-col h-full">
               <div className="">
                  <Link href='/' className="w-full flex items-center justify-center">
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
               <div className="grow p-4">
                  <ul className="space-y-2">
                     <li className="text-base text-[#0c0c0c] font-medium">
                        <Link href="/">Home</Link>
                     </li>
                     <li className="text-base text-[#0c0c0c] font-medium">
                        <Link href="/menu">Menu</Link>
                     </li>
                     <li className="text-base text-[#0c0c0c] font-medium">
                        <Link href="/page/offer">Offer</Link>
                     </li>
                     <li className="text-base text-[#0c0c0c] font-medium">
                        <Link href="/page/about">About</Link>
                     </li>
                     <li className="text-base text-[#0c0c0c] font-medium">
                        <Link href="/page/contact">contact</Link>
                     </li>
                  </ul>
               </div>
               <div className="">
                  <div className="p-4">
                     <ul className="*:text-[#0c0c0c]">
                        <li>Hello, Sign In / Create Account</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         {
            mobileMenu &&
            <div className="block lg:hidden fixed top-0 left-0 w-screen h-screen bg-[#000] transition-opacity duration-300 ease-linear z-[888] opacity-40" onClick={() => setMobileMenu(!mobileMenu)}></div >
         }
      </>
   )
}

export default MobileMenu