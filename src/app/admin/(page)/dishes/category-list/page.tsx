"use client";
import React, { useContext, useState } from "react";

import { useDebounceValue } from 'usehooks-ts'

import Link from "next/link";
import { cn } from "@/utils";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { adminInstance } from "@/config/axios";
import { IoEyeOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { RiDeleteBinLine } from "react-icons/ri";
import { sessionContext } from "@/context/Session";
import { useQueries } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import Pagination from "@/components/common/Pagination";
import { Ability } from "@/authentication/AccessControl";
import { MdClose, MdOutlineModeEditOutline } from "react-icons/md";
import AddDishCategory from "@/admin-components/food-dish/add-category";
import DetailsCategory from "@/admin-components/food-dish/details-category";

const CategoryList = () => {
   // auth session
   const session = useContext(sessionContext);
   // 
   const [openEditForm, setOpenEditForm] = useState(false)
   const [openDetails, setOpenDetails] = useState(false)
   const [selectedCategoryId, setSelectedCategoryId] = useState(null)
   // pagination
   const [totalItems, setTotalItems] = useState(0)
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setItemsPerPage] = useState(5)
   // filter
   const [clearSearch, setClearSearch] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [debouncedValue, setValue] = useDebounceValue('', 1000)
   const [sort, setSort] = useState<{ column?: string, sortOrder?: string }>({})
   // delete rows
   const [deleteRows, setDeleteRows] = useState<number[]>([])

   const [selectedAll, setSelectedAll] = useState(false)
   const [selectedRow, setSelectedRow] = useState<number[]>([]);
   const [categories] = useQueries({
      queries: [
         {
            queryKey: ["admin-dish-categories", debouncedValue],
            queryFn: () => adminInstance.get("/taxonomy/all-taxonomies", {
               params: {
                  page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort
               }
            }).then(res => res.data)
         }
      ]
   })

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
         title: "Image",
         dataIndex: "",
         className: "w-16",
         render: (row: any) => (
            <Image unoptimized src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${row.thumbnail}`} width={50} height={50} alt="" className="w-10 h-10 aspect-square rounded" />
         )
      },
      {
         index: "name",
         title: "Name",
         sortable: true,
         className: "w-60",
         render: (row: any) => (
            <div className="">{row?.name}</div>
         )
      },
      {
         index: "slug",
         title: "Slug",
         className: "w-60",
         render: (row: any) => (
            <div className="">{row?.slug}</div>
         )
      },
      {
         title: "Description",
         dataIndex: "",
         className: "w-auto",
         render: (row: any) => (
            <p className="text-base line-clamp-2">{row.description}</p>
         )
      },
      {
         title: "Options",
         className: "w-40",
         dataIndex: "",
         render: (row: any) => (
            <div className="flex items-center justify-center gap-4">
               <button onClick={() => { setOpenDetails(prev => !prev); setSelectedCategoryId(row?.id) }}>
                  <IoEyeOutline size={20} />
               </button>
               {Ability("update", "user", session?.user) && (
                  <button onClick={() => { setOpenEditForm(prev => !prev); setSelectedCategoryId(row?.id) }}>
                     <MdOutlineModeEditOutline size={20} />
                  </button>
               )}
               {/* {Ability("detele", "user", session?.user) && (
                  <Link href={`/admin/dish-category/delete-category/${row?.id} `}>
                     <RiDeleteBinLine size={17} />
                  </Link>
               )} */}
            </div>
         )
      }
   ];
   function handleSelectedRows(id: number, status: boolean) {
      setSelectedRow((prevData) => {
         const updatedSelectedRows = status
            ? [...prevData, id] // Add if checked
            : prevData.filter((item) => item !== id); // Remove if unchecked

         // Compute selected all state based on updatedSelectedRows
         const ids = categories?.data?.taxonomies?.map((item) => item.id) || [];
         setSelectedAll(ids.length === updatedSelectedRows.length &&
            ids.sort().toString() === updatedSelectedRows.sort().toString());

         return updatedSelectedRows;
      });
   }
   function handleSelectedAll(status: boolean) {
      setSelectedRow(status ? categories?.data?.taxonomies?.map((item) => item.id) : [])
      setSelectedAll(status)
   }
   return (
      <>
         <div className="bg-white border rounded-xl p-4">
            <div className="mb-5">
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
                     {
                        Ability('delete', 'city', session?.user) &&
                        deleteRows?.length > 0 && <button className=' text-base text-white font-montserrat font-medium whitespace-nowrap bg-red-500 border border-red-500 rounded py-1 px-4'>Delete Users</button>
                     }
                     {
                        Ability('create', 'city', session?.user) &&
                        <Button onClick={() => setOpenEditForm(prev => !prev)}>
                           Add Category
                        </Button>
                     }
                  </div>
               </div>
            </div>
            <div className="">
               <table className='w-full border rounded-lg'>
                  <thead className='bg-[#E6EAEE]'>
                     <tr>
                        <th className='w-14 text-left border-r last:border-none border-[#B0BFCB] text-lg font-normal px-3 py-1.5'>
                           <Checkbox
                              checked={selectedAll}
                              onCheckedChange={handleSelectedAll}
                           />
                        </th>
                        {columns.map((column, index) => (
                           <th key={index} className={cn(`text-left border-r last:border-none border-[#B0BFCB] text-lg font-normal px-3 py-1.5`, column.className)}>{column.title}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody className=''>
                     {
                        categories?.isLoading ?
                           [...Array(10)].map((_, index) => (
                              <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}`}>
                                 <td className="border-r border-[#B0BFCB] p-2 py-3">
                                    <div className="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 <td className="border-r border-[#B0BFCB] p-2 py-3">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 <td className="border-r border-[#B0BFCB] p-2 py-3">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 <td className="border-r border-[#B0BFCB] p-2 py-3">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 <td className="border-r border-[#B0BFCB] p-2 py-3">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                                 <td className="p-2 py-3">
                                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                 </td>
                              </tr>
                           ))
                           :
                           categories?.data?.taxonomies?.length === 0 ?
                              <tr>
                                 <td colSpan={3}>
                                    <div className="flex justify-center p-3">
                                       No data available
                                    </div>
                                 </td>
                              </tr>
                              :
                              categories?.data?.taxonomies?.map((row, index) => (
                                 <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#FBFBFB]'}`}>
                                    <td className='border-r last:border-none border-[#B0BFCB] p-3'>
                                       <Checkbox
                                          checked={selectedRow.includes(row.id)}
                                          onCheckedChange={(e: boolean) => handleSelectedRows(row.id, e)}
                                          className='data-[state=checked]:bg-[#FFE1DD] data-[state=checked]:text-black data-[state=checked]:border-[#FFE1DD]'
                                       />
                                    </td>
                                    {columns.map((column, index) => (
                                       <td key={index} className='border-r last:border-none border-[#B0BFCB] p-3'>
                                          {column.render(row)}
                                       </td>
                                    ))}
                                 </tr>
                              ))
                     }
                  </tbody>
               </table>
               <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
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
         <AddDishCategory
            open={openEditForm}
            close={() => { setOpenEditForm(prev => !prev); setSelectedCategoryId(null) }}
            categoryId={selectedCategoryId}
         />
         <DetailsCategory
            open={openDetails}
            close={() => { setOpenDetails(prev => !prev); setSelectedCategoryId(null) }}
            categoryId={selectedCategoryId}
         />
      </>
   );
};

export default CategoryList;
