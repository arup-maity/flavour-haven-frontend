"use client";
import React, { useState } from "react";
import Header from "./Header";
import AdminSidebar from "./sidebar";
// import { useTheme } from '@/ui-components/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
   const [collapseSidebar, setCollapseSidebar] = useState<boolean>(false)
   return (
      <div className={`relative w-full h-full bg-gray-200 dark:bg-dark-skin`}>
         <AdminSidebar collapseSidebar={collapseSidebar} setCollapseSidebar={() => setCollapseSidebar(prev => !prev)} />
         <div className={`main-admin-content-wapper relative flex flex-col transition-all duration-400 ease-in-out ${collapseSidebar ? 'ps-0' : 'ps-[260px]'}`}>
            <div className="sticky top-0 z-50 px-4 py-2">
               <Header setCollapseSidebar={() => setCollapseSidebar(prev => !prev)} />
            </div>
            <div className="layout-page-content flex-grow p-4">{children}</div>
            <div className="p-4">
               <p className="text-sm opacity-65">
                  &copy; {new Date().getFullYear()} Webx. All rights reserved.
               </p>
            </div>
         </div>
      </div>
   );
};

export default AdminLayout;
