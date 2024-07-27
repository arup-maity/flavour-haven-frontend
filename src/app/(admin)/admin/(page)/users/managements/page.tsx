'use client'
import React, { useContext, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDebounceValue } from 'usehooks-ts'
import Table from '@/components/common/Table'
import { axiosInstance } from '@/config/axios'
import { handleApiError } from '@/utils'
import { IoEyeOutline } from 'react-icons/io5'
import { MdClose, MdOutlineModeEditOutline } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosSearch } from 'react-icons/io'
import Pagination from '@/components/common/Pagination'
import { Ability } from '@/authentication/AccessControl'
import { sessionContext } from '@/authentication/AuthSession'


const Managements = () => {
   //
   const { session, sessionLoading } = useContext(sessionContext)
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

   useLayoutEffect(() => {
      setFilter({ search: debouncedValue, page: currentPage, limit: itemsPerPage, role: roleBy, ...sort })
      getUsers({ search: debouncedValue, page: currentPage, limit: itemsPerPage, role: roleBy, ...sort })
   }, [debouncedValue, currentPage, itemsPerPage, roleBy, sort])

   async function getUsers(params: any) {
      try {
         setLoading(true)
         const res = await axiosInstance.get(`/user/admin-users-list`, { params })
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
         index: 'firstName',
         title: 'Name',
         dataIndex: '',
         sortable: true,
         className: 'w-[20%] min-w-[250px]',
         render: (record: any) => (
            <div key={record.id}>{record.firstName && record.firstName + ' ' + record.lastName}</div>
         )
      },
      {
         index: 'email',
         title: 'Email',
         dataIndex: 'email',
         sortable: true,
         className: 'w-auto min-w-[300px]',
      },
      {
         index: 'role',
         title: 'Role',
         dataIndex: 'role',
         sortable: true,
         className: 'w-[20%] min-w-[250px]',
      },
      {
         title: 'Options',
         className: 'min-w-[150px] w-[200px]',
         dataIndex: '',
         render: (row: any) => (
            <div className='flex items-center justify-center gap-4'>
               <button >
                  <IoEyeOutline size={20} />
               </button>
               {
                  Ability('update', 'user', session?.user) &&
                  <Link href={`/admin/users/managements/edit-user?edit=true&id=${row?.id} `}><MdOutlineModeEditOutline size={20} /></Link>
               }
               {
                  Ability('detele', 'user', session?.user) &&
                  <Link href={`/admin/users/managements/delete-user?delete=true&id=${row?.id}`}><RiDeleteBinLine size={17} /></Link>
               }
            </div>
         ),
      },
   ];

   if (sessionLoading && !session?.login) {
      return <div>Loading...</div>
   }
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
         <div className="overflow-hidden">
            <div className="text-sm text-gray-400 mb-1">Total User : {userCount}</div>
            <PerfectScrollbar>
               <Table columns={columns} data={usersList} sort={(sort: any) => setSort(sort)} loading={loading} deleteRows={(data) => setDeleteRows(data)} />
            </PerfectScrollbar>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
               {
                  totalItems !== 0 && <div className="flex items-center gap-4">
                     <select onChange={(e: any) => setItemsPerPage(e.target.value)} className='h-7 text-base border border-slate-400 focus:outline-none rounded px-1'>
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