'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDebounceValue } from 'usehooks-ts'
import { adminInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { MdClose, MdOutlineModeEditOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosSearch } from 'react-icons/io'
import Pagination from '@/components/common/Pagination'
import { Ability } from '@/authentication/AccessControl'
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { DataTable } from '@/admin-components/common/DataTable'
import { TableFilter } from '@/admin-components/common/TableFilter'
import { X, Filter } from "lucide-react"
import { sessionContext } from '@/context/Session'

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

   useLayoutEffect(() => {
      setFilter({ search: debouncedValue, page: currentPage, limit: itemsPerPage, role: roleBy, ...sort })
      getUsers({ search: debouncedValue, page: currentPage, limit: itemsPerPage, role: roleBy, ...sort })
   }, [debouncedValue, currentPage, itemsPerPage, roleBy, sort])

   async function getUsers(params: any) {
      try {
         setLoading(true)
         const res = await adminInstance.get(`/user/managements-list`, { params })
         console.log(res)
         if (res.data.success) {
            setUsersList(res.data.users)
            setTotalItems(res.data.filterCount)
            setUsersCount(res.data.totalCount)
         }
      } catch (error) {
         handleApiError(error)
      } finally {
         setLoading(false)
      }
   }
   function handleSearch(data: string) {
      setValue(data)
      setSearchValue(data)
      data === '' ? setClearSearch(false) : setClearSearch(true)
   }
   function handleClearSearch() {
      setValue('')
      setSearchValue('')
      setClearSearch(false)
   }
   const columns = [
      {
         id: 'firstName',
         name: 'Full Name',
         header: 'Full Name',
         sortable: true,
         className: 'w-[20%] min-w-[250px]',
         render: (row) => (
            <div className="flex space-x-1">
               <span>{row?.firstName}</span>
               <span>{row?.lastName}</span>
            </div>
         )
      },
      {
         id: 'email',
         name: 'Email',
         header: 'Email',
         sortable: true,
         className: 'w-[20%] min-w-[250px]',
         render: (row) => (
            <div className="">
               {row?.email}
            </div>
         )
      },
      {
         id: 'role',
         name: 'Role',
         header: 'Role',
         sortable: true,
         className: 'w-auto',
         render: (row) => (
            <div className="">
               {row?.role}
            </div>
         )
      },
      {
         id: '',
         name: 'Options',
         header: <p>Options</p>,
         className: 'min-w-[100px] w-28',
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

   // if (sessionLoading && !session?.login) {
   //    return <div>Loading...</div>
   // }
   return (
      <div className='w-full bg-white rounded p-4'>
         <div className="mb-10">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between -m-2">
               <div className="w-full md:w-full p-2">
                  <div className="w-full flex items-center border-b-2 border-slate-200">
                     <IoIosSearch size={25} />
                     <input type="text" className='w-full h-9 focus:outline-none px-4' placeholder='Search ...' onChange={event => handleSearch(event.target.value)} value={searchValue} />
                     {
                        clearSearch ? <div className='cursor-pointer' onClick={handleClearSearch}><MdClose color='#9a9b9c' /></div> : ''
                     }
                  </div>
               </div>
               <div className="w-full md:w-auto flex justify-end gap-2 p-2">

                  {/* {
                  deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4' onClick={() => { multipleDelete(deleteRows) }}>Delete Users</button>
               } */}
                  {
                     Ability('create', 'user', session?.user) &&
                     <Link href='/admin/users/managements/add-user' className=' text-base whitespace-nowrap border border-slate-400 rounded py-1 px-4'>Add New User</Link>
                  }
               </div>
            </div>
         </div>
         <div className="flex items-center mb-4">
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
         <div className="w-full">
            <PerfectScrollbar>
               <DataTable columns={columns} data={usersList} sort={(sort) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
            </PerfectScrollbar>
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
      </div>
   )
}

export default Managements