'use cllient'
import React from 'react'

const AdminDashBoard = () => {
   return (
      <div className="">
         <h1>Admin Dashboard</h1>
         <div className="flex flex-wrap -m-2">
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-2">
                  <div className="">Total Dishes</div>
                  <div className="">120</div>
               </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-2">
                  <div className="">Total Categories</div>
                  <div className="">120</div>
               </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-4/12 p-2">
               <div className="bg-white rounded p-2">
                  <div className="">Total Tables</div>
                  <div className="">120</div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default AdminDashBoard