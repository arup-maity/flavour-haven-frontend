'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import { adminInstance } from '@/config/axios'
import Table from '@/components/common/Table'
import { IoEyeOutline } from 'react-icons/io5'
import { Ability } from '@/authentication/AccessControl'
import Link from 'next/link'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { sessionContext } from '@/context/Session'
import RestaurantUpdate from '@/components/admin/order/RestaurantUpdate'

const OrderRequetsPage = () => {
   const { user } = useContext(sessionContext);

   const [orderList, setOrderList] = useState<{ [key: string]: any }[]>([])
   const [selectOrderId, setSelectOrderId] = useState<number | null>(null)
   const [showOrderModal, setShowOrderModal] = useState(false)
   const [pageRefresh, setPageRefresh] = useState(false)
   useLayoutEffect(() => {
      getOrderRequest()
   }, [pageRefresh])

   async function getOrderRequest() {
      try {
         const response = await adminInstance.get(`/order/order-request`)
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
               <button>
                  <IoEyeOutline size={20} />
               </button>
               {Ability("update", "user", user) && (
                  <button onClick={() => { setSelectOrderId(row.id); setShowOrderModal(prev => !prev) }}>
                     <MdOutlineModeEditOutline size={20} />
                  </button>
               )}
            </div>
         )
      }
   ];

   return (
      <div className='bg-white rounded p-4'>
         <Table columns={columns} data={orderList} />
         <RestaurantUpdate selectOrderId={selectOrderId} showOrderModal={showOrderModal} setShowOrderModal={() => { setShowOrderModal(prev => !prev); setPageRefresh(prev => !prev) }} />
      </div>
   )
}

export default OrderRequetsPage