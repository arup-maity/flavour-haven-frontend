"use client";
import { Ability } from "@/authentication/AccessControl";
import Pagination from "@/components/common/Pagination";
import Table from "@/components/common/Table";
import { adminInstance } from "@/config/axios";
import { sessionContext } from "@/context/Session";
import { handleApiError } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useLayoutEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdClose, MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDebounceValue } from 'usehooks-ts'

const CategoryList = () => {
   // auth session
   const session = useContext(sessionContext);
   const [taxonomies, setTaxonomies] = useState([]);
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

   useLayoutEffect(() => {
      getCategories({ page: currentPage, limit: itemsPerPage, search: debouncedValue, ...sort });
   }, [currentPage, itemsPerPage, debouncedValue, sort]);

   async function getCategories(params: { [key: string]: any }) {
      try {
         const response = await adminInstance.get("/taxonomy/all-taxonomies", {
            params
         });
         if (response.data.success) {
            setTaxonomies(response.data.taxonomies);
            setTotalItems(response.data.total);
         }
      } catch (error) {
         handleApiError(error);
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
         title: "Image",
         dataIndex: "",
         className: "w-[65px]",
         render: (row: any) => (
            <Image unoptimized src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${row.thumbnail}`} width={50} height={50} alt="" className="w-12 aspect-square" />
         )
      },
      {
         index: "name",
         title: "Name",
         dataIndex: "name",
         sortable: true,
         className: "w-[20%] min-w-[300px]"
      },
      {
         index: "slug",
         title: "Slug",
         dataIndex: "slug",
         className: "w-[20%] min-w-[250px]"
      },
      {
         title: "Description",
         dataIndex: "",
         className: "w-auto min-w-[300px]",
         render: (row: any) => (
            <p className="text-base line-clamp-2">{row.description}</p>
         )
      },
      {
         title: "Options",
         className: "w-[150px]",
         dataIndex: "",
         render: (row: any) => (
            <div className="flex items-center justify-center gap-4">
               <button>
                  <IoEyeOutline size={20} />
               </button>
               {Ability("update", "user", session?.user) && (
                  <Link href={`/admin/dish-category/edit-category/${row?.id} `}>
                     <MdOutlineModeEditOutline size={20} />
                  </Link>
               )}
               {Ability("detele", "user", session?.user) && (
                  <Link href={`/admin/dish-category/delete-category/${row?.id} `}>
                     <RiDeleteBinLine size={17} />
                  </Link>
               )}
            </div>
         )
      }
   ];

   return (
      <div className="bg-white rounded p-4">
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
                     <Link href="/admin/dish-category/add-category">
                        <button className="bg-indigo-400 text-base text-white whitespace-nowrap rounded py-1.5 px-4">
                           Add Category
                        </button>
                     </Link>
                  }
               </div>
            </div>
         </div>
         <div className="">
            <Table columns={columns} data={taxonomies} sort={setSort} deleteRows={setDeleteRows} />
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
   );
};

export default CategoryList;
