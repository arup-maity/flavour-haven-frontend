"use client";
import { DropDown } from "@/ui-components";
import Link from "next/link";
import React from "react";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { CiDeliveryTruck } from "react-icons/ci";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

const UserDropdown = ({ user }: { user: any }) => {
   const router = useRouter()
   const handleLogout = () => {
      Cookies.remove('token')
      localStorage.setItem('userDetails', '')
      router.push('/')
   }
   return (
      <div className="relative">
         <DropDown>
            <DropDown.Header id="mm" className="border-none">
               {/* <div className="me-1">
                  <Image src='/images/user-1.png' width={40} height={40} alt="" className="w-10 h-10" />
               </div> */}
               <p className="text-base">{user?.name ? user?.name : 'Hi User'}</p>
            </DropDown.Header>
            <DropDown.Menu id="mm" className="bg-white top-[60px] w-56 right-0 left-[unset]">
               <DropDown.Item>
                  <Link href='/account' className="flex items-center gap-2">
                     <AiOutlineUser size={18} />
                     <span className="text-base">Account</span>
                  </Link>
               </DropDown.Item>
               <DropDown.Item>
                  <Link href='/account?tab=order-details' className="flex items-center gap-2">
                     <CiDeliveryTruck size={20} />
                     <span className="text-base">Order</span>
                  </Link>
               </DropDown.Item>
               <DropDown.Item>
                  <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogout}>
                     <AiOutlineLogout size={18} />
                     <span className="text-base">Logout</span>
                  </div>
               </DropDown.Item>
            </DropDown.Menu>
         </DropDown>
      </div>
   )
};

export default UserDropdown;
