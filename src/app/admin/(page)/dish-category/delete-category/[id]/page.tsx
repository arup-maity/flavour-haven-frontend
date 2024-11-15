"use client";
import React, { useLayoutEffect, useState } from "react";
import { adminInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import Spinner from "@/ui-components/spinner";

const EditCategory = ({ params }: { params: { id: string } }) => {
   const id = params.id || '';
   const router = useRouter()
   const [taxonomyDetails, setTaxonomyDetails] = useState<{ [key: string]: any }>([]);
   const [apiLoading, setApiLoading] = useState(false)

   useLayoutEffect(() => {
      getCategory(id);
   }, [id]);

   async function getCategory(id: string) {
      try {
         const res = await adminInstance.get(`/taxonomy/read-taxonomy/${id}`);
         if (res.data.success) {
            setTaxonomyDetails(res.data.taxonomy);
         }
      } catch (error) {
         handleApiError(error);
      }
   }

   async function handleDelete() {
      try {
         setApiLoading(true);
         const res = await adminInstance.delete(`/taxonomy/delete-taxonomy/${id}`, { params: { thumbnail: taxonomyDetails.thumbnail } });
         if (res.data.success) {
            toast.success(res.data.message);
            router.back()
         }
      } catch (error) {
         handleApiError(error);
      } finally {
         setApiLoading(false)
      }
   }

   return (
      <div className="bg-white rounded p-4">
         <div className="flex flex-nowrap items-center gap-2 mb-4">
            <span onClick={() => router.back()} className="cursor-pointer"><BsArrowLeft size={20} /></span>
            <h2 className="text-xl font-mediun capitalize">{taxonomyDetails?.type} Details</h2>
         </div>
         <div className="w-full lg:w-8/12">
            <div className="grid gap-4 mb-4">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                  <div className="">
                     <label htmlFor="" className='block text-base text-gray-500'>Thumbnail</label>
                  </div>
                  <div className="md:col-span-2 w-full text-base">
                     <Image unoptimized src={process.env.NEXT_PUBLIC_BUCKET_URL + taxonomyDetails.thumbnail} width={100} height={150} alt="" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                  <div className="">
                     <label htmlFor="" className='block text-base text-gray-500'>Name</label>
                  </div>
                  <div className="md:col-span-2 w-full text-base">
                     {taxonomyDetails.name}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                  <div className="">
                     <label htmlFor="" className='block text-base text-gray-500'>Description</label>
                  </div>
                  <div className="md:col-span-2 w-full text-base">
                     {taxonomyDetails.description}
                  </div>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  disabled={apiLoading}
                  className="hover:bg-gray-100 border border-slate-400 rounded py-1 px-4"
                  onClick={handleDelete}
               >
                  Delete Category
               </button>
               {apiLoading && <Spinner />}
            </div>
         </div>
      </div>
   );
};

export default EditCategory;
