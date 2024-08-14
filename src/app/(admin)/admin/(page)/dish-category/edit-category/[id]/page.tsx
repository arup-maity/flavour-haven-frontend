"use client";
import React, { useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { toast } from "sonner";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "@/components/thumbnail/ImageUpload";
import { uploadFile } from "@/components/admin/utils";


type CategoryFormType = {
   name: string;
   slug: string;
   description: string;
   thumbnail: string;
};

const EditCategory = ({ params }: { params: { id: string } }) => {
   const router = useRouter()
   const id = params.id;
   const [taxonomyDetails, setTaxonomyDetails] = useState<{ [key: string]: any }>([]);
   const [oldThumbnail, setThumbnail] = useState('')
   //
   const defaultValues = { name: "", slug: "", description: "", thumbnail: "" };
   const schema = z.object({
      name: z.string().min(2, "Category name must be at least 2 characters long"),
      slug: z
         .string()
         .min(2, "Category slug must be at least 2 characters long")
         .regex(/^[a-z0-9-]+$/, {
            message:
               "Category slug must contain only lowercase letters and numbers, and must not contain any whitespace or uppercase letters."
         }),
      description: z
         .string()
         .min(5, "Category description must be at least 10 characters long"),
      thumbnail: z.string()
   });
   const {
      register,
      control,
      handleSubmit,
      setValue,
      formState: { errors }
   } = useForm<CategoryFormType>({
      defaultValues,
      mode: "onChange",
      resolver: zodResolver(schema)
   });

   useLayoutEffect(() => {
      getCategory();
   }, [id]);

   const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
      try {
         let thumbnailData: { [key: string]: any } = {}
         if (data?.thumbnail.startsWith("data:image")) {
            thumbnailData = await uploadFile(data.thumbnail)
         }
         const res = await axiosInstance.put(
            `/taxonomy/update-taxonomy/${id}`,
            { ...data, thumbnail: thumbnailData?.name || oldThumbnail, oldThumbnail }
         );
         if (res.data.success) {
            toast.success(res.data.message);
            router.back();
         }
      } catch (error) {
         handleApiError(error);
      }
   };

   async function getCategory() {
      try {
         const res = await axiosInstance.get(`/taxonomy/read-taxonomy/${id}`);
         if (res.data.success) {
            setTaxonomyDetails(res.data.taxonomy);
            const taxonomy = res.data.taxonomy;
            for (const key in defaultValues) {
               setValue(
                  key as keyof CategoryFormType,
                  taxonomy[key as keyof CategoryFormType]
               );
               if (key === 'thumbnail') {
                  setThumbnail(taxonomy[key as keyof CategoryFormType])
               }
            }
         }
      } catch (error) {
         handleApiError(error);
      }
   }

   return (
      <div className="bg-white rounded p-4">
         <div className="mb-4">
            <div className="flex items-center flex-nowrap gap-2">
               <span onClick={() => router.back()} className="cursor-pointer"><BsArrowLeft size={20} /></span>
               <h1 className="text-xl font-medium capitalize">Edit {taxonomyDetails?.type}</h1>
            </div>
         </div>
         <div className="w-7/12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <fieldset>
                  <label htmlFor="" className="block text-sm text-gray-500 mb-1">
                     Thumbnail
                  </label>
                  <div className="w-36">
                     <Controller
                        name="thumbnail"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, ...rest } }) =>
                           <ImageUpload image={process.env.NEXT_PUBLIC_BUCKET_URL + value} onImage={(file) => onChange(file)} aspect={448 / 626} className="aspect-[448/626]" />
                        }
                     />

                  </div>
               </fieldset>
               <fieldset>
                  <label htmlFor="name" className="block text-sm text-gray-500 mb-1">
                     Category Name
                  </label>
                  <TextareaAutosize
                     {...register("name")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                     minRows={1}
                  />
                  {errors.name && (
                     <div className="text-xs text-red-500">{errors.name.message}</div>
                  )}
               </fieldset>
               <fieldset>
                  <label htmlFor="slug" className="block text-sm text-gray-500 mb-1">
                     Category Slug
                  </label>
                  <TextareaAutosize
                     {...register("slug")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                     minRows={1}
                  />
                  {errors.slug && (
                     <div className="text-xs text-red-500">{errors.slug.message}</div>
                  )}
               </fieldset>
               <fieldset>
                  <label htmlFor="" className="block text-sm text-gray-500 mb-1">
                     Description
                  </label>
                  <TextareaAutosize
                     {...register("description")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                     minRows={4}
                  />
                  {errors.description && (
                     <div className="text-xs text-red-500">
                        {errors.description.message}
                     </div>
                  )}
               </fieldset>
               <fieldset>
                  <button
                     type="submit"
                     className="border border-slate-400 rounded py-1 px-4"
                  >
                     Submit
                  </button>
               </fieldset>
            </form>
         </div>
      </div>
   );
};

export default EditCategory;
