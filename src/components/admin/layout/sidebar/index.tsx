'use client'
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";
import { useTheme } from "@/ui-components/sidebar";
import ClickOutside from "@/ui-components/outside-click";

const AdminSidebar = ({ collapseSidebar, setCollapseSidebar }: { collapseSidebar: boolean, setCollapseSidebar: () => void }) => {
   const { collapse, setCollapse } = useTheme();
   return (
      <>
         <div className={`main-admin-sidebar fixed bg-white flex flex-col start-0 transition-all duration-400 ease-in-out z-[8888] shadow-lg ${collapseSidebar ? 'lg:-translate-x-full' : 'max-md:-translate-x-full'} `}>
            <div className="h-full">
               <div className="w-full h-[60px] flex flex-nowrap items-center gap-1 overflow-hidden px-2 mb-0.5">
                  <Link
                     href="/webx-admin"
                     className="inline-flex w-11 items-center flex-shrink-0"
                  >
                     <Image
                        src="/logo.png"
                        alt=""
                        width={50}
                        height={50}
                        className="w-auto h-10"
                     />
                  </Link>
                  <Image
                     src="/text-logo.png"
                     alt=""
                     width={150}
                     height={40}
                     className="w-auto h-10"
                  />
                  {/* <Link
               href="/webx-admin"
               className="w-full flex items-center flex-grow"
            >
               <div className="text-xl font-montserrat font-semibold">
                  Cloud Wings
               </div>
            </Link> */}
               </div>
               <SidebarMenu />
            </div>
         </div>
         {
            collapseSidebar &&
            <div className="block lg:hidden fixed top-0 left-0 w-screen h-screen bg-[#000] transition-opacity duration-300 ease-linear z-[7777] opacity-40" onClick={setCollapseSidebar}></div>
         }
      </>
   )
}

export default AdminSidebar