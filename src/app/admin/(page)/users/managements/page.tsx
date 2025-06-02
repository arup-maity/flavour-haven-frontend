'use client'
import React, { useContext, useState } from 'react'

import { Filter, X } from "lucide-react"
import { useDebounceValue } from 'usehooks-ts'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { handleApiError } from '@/utils'
import { IoIosSearch } from 'react-icons/io'
import { adminInstance } from '@/config/axios'
import { Button } from '@/components/ui/button'
import { AiOutlinePlus } from "react-icons/ai";
import { RiDeleteBinLine } from 'react-icons/ri'
import { sessionContext } from '@/context/Session'
import { useQueries } from '@tanstack/react-query'
import { Checkbox } from '@/components/ui/checkbox'
import Pagination from '@/components/common/Pagination'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Ability } from '@/authentication/AccessControl'
import EditUser from '@/admin-components/users/edit-user'
import { Input, SearchInput } from '@/components/ui/input'
import { DataTable } from '@/admin-components/common/DataTable'
import { MdClose, MdOutlineModeEditOutline } from 'react-icons/md'
import { TableFilter } from '@/admin-components/common/TableFilter'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


const userRole = [
   {
      label: "User",
      value: "user",
   },
   {
      label: "Administrator",
      value: "administrator",
   },
   {
      label: "Admin",
      value: "admin",
   },
   {
      label: "Author",
      value: "author",
   },
   {
      label: "Editor",
      value: "editor",
   }
]

const Managements = () => {
   const session = useContext(sessionContext)
   // 
   const [editUserForm, setEditUserForm] = useState(false)
   const [selectedAll, setSelectedAll] = useState(false)
   const [selectedRow, setSelectedRow] = useState<number[]>([]);
   // state
   const [usersList, setUsersList] = useState([])
   const [userCount, setUsersCount] = useState(0)
   // pagination
   const [totalItems, setTotalItems] = useState<number>(0)
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [itemsPerPage, setItemsPerPage] = useState<number>(5)
   // filter
   const [searchValue, setSearchValue] = useState<string>('')
   const [clearSearch, setClearSearch] = useState<boolean>(false)
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   const [roleBy, setRoleBy] = useState<string>('all')
   const [loading, setLoading] = useState<boolean>(true)
   const [deleteRows, setDeleteRows] = useState<number[]>([])
   const [filter, setFilter] = useState<{ [key: string]: any }>({})
   const [roleFilter, setRoleFilter] = React.useState<string[]>([])
   const isFiltered = [roleFilter].some(array => array.length > 0);
   function handleReset() {
      setRoleFilter([])
   }

   const [userList] = useQueries({
      queries: [
         {
            queryKey: ['user-list', debouncedValue, currentPage, itemsPerPage, sort],
            queryFn: async () => await adminInstance.get(`/user/user-list`, {
               params: {
                  search: debouncedValue, page: currentPage, limit: itemsPerPage, ...sort
               }
            }).then(res => res.data),
         }
      ]
   })

   function handleSelectedRows(id: number, status: boolean) {
      setSelectedRow((prevData) => {
         const updatedSelectedRows = status
            ? [...prevData, id] // Add if checked
            : prevData.filter((item) => item !== id); // Remove if unchecked

         // Compute selected all state based on updatedSelectedRows
         const ids = userList.data?.users?.map((item) => item.id) || [];
         setSelectedAll(ids.length === updatedSelectedRows.length &&
            ids.sort().toString() === updatedSelectedRows.sort().toString());

         return updatedSelectedRows;
      });
   }

   function handleSelectedAll(status: boolean) {
      setSelectedRow(status ? userList.data?.users?.map((item) => item.id) : [])
      setSelectedAll(status)
   }
   const columns = [
      {
         index: "name",
         title: "Name",
         className: "w-64",
         render: (row) => (
            <div className="">{row?.firstName + ' ' + row.lastName}</div>
         )
      },
      {
         index: "email",
         title: "Email",
         className: "w-auto",
         render: (row) => (
            <div className="">{row?.email}</div>
         )
      },
      {
         index: "role",
         title: "Role",
         className: "w-44",
         render: (row) => (
            <div className="">{row?.role}</div>
         )
      },
      {
         index: "option",
         title: "Option",
         className: "w-20",
         render: (row: any) => (
            <Popover>
               <PopoverTrigger asChild>
                  <Button variant="ghost"><HiOutlineDotsVertical /></Button>
               </PopoverTrigger>
               <PopoverContent className="w-40 p-2" align='end'>
                  <ul className='space-y-2'>
                     <li>
                        {
                           Ability('update', 'user', session?.user) &&
                           <Link
                              href={`/admin/users/managements/edit-user?edit=true&id=${row?.id} `}
                              className='flex items-center gap-2 whitespace-nowrap'
                           >
                              <MdOutlineModeEditOutline size={20} />
                              Update user
                           </Link>
                        }
                     </li>
                     <li>
                        {
                           Ability('detele', 'user', session?.user) &&
                           <Link
                              href={`/admin/users/managements/delete-user?delete=true&id=${row?.id}`}
                              className='flex items-center gap-2 whitespace-nowrap'
                           >
                              <RiDeleteBinLine size={17} />
                              Delete user
                           </Link>
                        }
                     </li>
                  </ul>
               </PopoverContent>
            </Popover>
         ),
      },
   ];


   return (
      <div className='w-full bg-white border border-gray-200 rounded-xl p-6'>
         <div className="mb-10">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
               <div className="">
                  <div className="text-2xl font-semibold">User List</div>
               </div>
               <div className="flex items-center gap-4">
                  {/* <div className="w-full flex items-center border-b-2 border-slate-200">
                     <IoIosSearch size={25} />
                     <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => handleSearch(event.target.value)} value={searchValue} />
                     {
                        clearSearch ? <div className='cursor-pointer' onClick={handleClearSearch}><MdClose color='#9a9b9c' /></div> : ''
                     }
                  </div> */}
                  {/* {
                  deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Users</button>
               } */}
                  {/* {
                     Ability('create', 'user', session?.user) &&
                     <Link href='/admin/users/managements/add-user' className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add New User</Link>
                  } */}
                  <Button
                     onClick={() => setEditUserForm(prev => !prev)}
                  >
                     <AiOutlinePlus />
                     Add User
                  </Button>
               </div>
            </div>
         </div>
         <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
               <div className="flex items-center gap-1 me-4">
                  <span className='text-base'>Filter</span>
                  <Filter size={16} strokeWidth={1} />
               </div>
               <TableFilter title='Role' options={userRole} value={roleFilter} setFilter={setRoleFilter} />
               {isFiltered && (
                  <Button variant="ghost" className="h-8 px-2 lg:px-3" onClick={handleReset}>
                     Reset <X />
                  </Button>
               )}
            </div>
            <SearchInput placeholder='Search ...' className='w-80' />
         </div>
         <div className="w-full">
            <div className="">
               <table className='w-full'>
                  <thead className='bg-gray-100'>
                     <tr>
                        <th className='w-14 text-left border text-lg font-normal px-3 py-1'>
                           <Checkbox
                              checked={selectedAll}
                              onCheckedChange={handleSelectedAll}
                           />
                        </th>
                        {columns.map((column) => (
                           <th key={column.title} className={cn(`text-left border text-base font-normal px-3 py-1`, column.className)}>{column.title}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {
                        userList.isLoading ?
                           [...Array(8)].map((_, index) => (
                              <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}`}>
                                 <td className="border px-3 py-2">
                                    <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 {columns.map((column) => (
                                    <td key={column.index} className='text-sm border py-1 px-3'>
                                       <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
                                    </td>
                                 ))}
                              </tr>
                           ))
                           :
                           userList.data.users?.length === 0 ?
                              <tr>
                                 <td colSpan={3}>
                                    <div className="flex justify-center p-3">
                                       No data available
                                    </div>
                                 </td>
                              </tr>
                              :
                              userList.data.users?.map((row, index) => (
                                 <tr key={row?.id} className={`border ${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}`}>
                                    <td className='border py-1 px-3'>
                                       <Checkbox
                                          checked={selectedRow.includes(row.id)}
                                          onCheckedChange={(e: boolean) => handleSelectedRows(row.id, e)}
                                       />
                                    </td>
                                    {columns.map((column) => (
                                       <td key={column.index} className='text-sm border py-1 px-3'>
                                          {column.render(row)}
                                       </td>
                                    ))}
                                 </tr>
                              ))
                     }
                  </tbody>
               </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
               {
                  totalItems !== 0 && <div className="flex items-center gap-4">
                     <select onChange={(e: any) => setItemsPerPage(e.target.value)} className='h-7 text-base border border-slate-400 focus:outline-none rounded px-1'>
                        <option value={5}>5</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                     </select>
                     <p className="text-sm text-gray-600">
                        Showing {itemsPerPage * (currentPage - 1) + 1} - {Math.min(itemsPerPage * currentPage, totalItems)} of {totalItems} results
                     </p>
                  </div>
               }
               <div className="max-md:w-full max-md:flex max-md:justify-center">
                  <Pagination totalItems={totalItems} perPage={itemsPerPage} currentPage={currentPage} onChange={(e) => setCurrentPage(e)} />
               </div>
            </div>
         </div>
         <EditUser
            open={editUserForm}
            close={() => setEditUserForm(prev => !prev)}
            userDetails={{}}
         />
      </div>
   )
}

export default Managements