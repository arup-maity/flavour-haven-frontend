"use client";
import { Ability } from "@/authentication/AccessControl";
import { sessionContext } from "@/authentication/AuthSession";
import Table from "@/components/common/Table";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useLayoutEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const CategoryList = () => {
   // auth session
   const { session, sessionLoading } = useContext(sessionContext);
   const [taxonomies, setTaxonomies] = useState([]);

   useLayoutEffect(() => {
      getCategories({});
   }, []);

   async function getCategories(params: any) {
      try {
         const response = await axiosInstance.get("/taxonomy/taxonomies", {
            params
         });
         if (response.data.success) {
            setTaxonomies(response.data.taxonomies);
         }
      } catch (error) {
         handleApiError(error);
      }
   }

   const columns = [
      {
         title: "Image",
         dataIndex: "",
         className: "w-[65px]",
         render: (row: any) => (
            <Image src={`${process.env.NEXT_PUBLIC_BUCKET_URL}${row.thumbnail}`} width={50} height={50} alt="" className="w-12 aspect-square" />
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
         <div className="flex items-center justify-between gap-4 mb-4">
            <div className=""></div>
            <div className="">
               <Link href="/admin/dish-category/add-category">
                  <button className="bg-indigo-400 text-white rounded py-1.5 px-4">
                     Add New Category
                  </button>
               </Link>
            </div>
         </div>
         <div className="">
            <Table columns={columns} data={taxonomies} />
         </div>
      </div>
   );
};

export default CategoryList;
