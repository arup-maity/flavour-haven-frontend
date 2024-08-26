"use client";
import React from "react";
import Header from "./Header";
import AdminSidebar from "./sidebar";
// import { useTheme } from '@/ui-components/sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

   return (
      <div
         className={`relative w-full h-full bg-gray-100 dark:bg-dark-skin`}
      >
         <AdminSidebar />

         <div className="main-admin-content-wapper relative flex flex-col transition-all duration-400 ease-in-out">
            <div className="sticky top-0 z-50 px-4 py-2">
               <Header />
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
