'use client'
import Table from '@/components/common/Table'
import { adminInstance } from '@/config/axios'
import React, { useLayoutEffect, useState } from 'react'
import { IoEyeOutline } from 'react-icons/io5'
import { MdOutlineModeEditOutline } from 'react-icons/md'

const OrderListPage = () => {
   const [orderList, setOrderList] = useState<{ [key: string]: any }[]>([])

   useLayoutEffect(() => {
      getOrderList()
   }, [])

   async function getOrderList() {
      try {
         const response = await adminInstance.get(`/order/orders-list`)
         console.log(response)
         if (response.data.success) {
            setOrderList(response.data.orders)
         }
      } catch (error) {
         console.log(error)
      }
   }

   const columns = [
      {
         index: "cuid",
         title: "Id",
         dataIndex: "cuid",
         sortable: true,
         className: "w-[20%] min-w-[250px]"
      },
      {
         index: "status",
         title: "Status",
         dataIndex: "status",
         sortable: true,
         className: "w-auto min-w-[200px]"
      },
      {
         index: "totalAmount",
         title: "Amount",
         dataIndex: "totalAmount",
         sortable: true,
         className: "w-auto min-w-[200px]"
      },
      {
         title: "Options",
         className: "min-w-[150px] w-[200px]",
         dataIndex: "",
         render: (row: any) => (
            <div className="flex items-center justify-center gap-4">
               <button className='flex items-center gap-2 border rounded py-1 px-2'>
                  <span className='text-sm'>View</span>
                  <IoEyeOutline size={16} />
               </button>
               {/* {Ability("update", "user", user) && (
                  <button onClick={() => { setSelectOrderId(row.id); setShowOrderModal(prev => !prev) }}>
                     <MdOutlineModeEditOutline size={20} />
                  </button>
               )} */}
            </div>
         )
      }
   ];

   return (
      <div className='bg-white rounded p-4'>
         <Table columns={columns} data={orderList} />

      </div>
   )
}

export default OrderListPage