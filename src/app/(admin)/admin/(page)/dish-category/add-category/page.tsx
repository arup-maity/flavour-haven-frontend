"use client";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "@/components/thumbnail/ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/components/admin/utils";

type CategoryFormType = {
   name: string;
   slug: string;
   description: string;
   thumbnail: string
};

const AddCategory = () => {
   const router = useRouter()
   const defaultValues = { name: "", slug: "", description: "", thumbnail: '' };
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
         .min(10, "Category description must be at least 10 characters long"),
      thumbnail: z.string()
   });
   const {
      register,
      handleSubmit,
      control,
      setValue,
      watch,
      formState: { errors }
   } = useForm<CategoryFormType>({
      defaultValues,
      mode: "onChange",
      resolver: zodResolver(schema)
   });
   const CategoryName = watch("name");

   useEffect(() => {
      function formatSlug(input: string) {
         let formatted = input.replace(/[^\w\s-]/g, "");
         formatted = formatted.replace(/\s+/g, "-");
         formatted = formatted.toLowerCase();
         return formatted;
      }
      const CategorySlug = formatSlug(CategoryName);
      setValue("slug", CategorySlug);
   }, [CategoryName]);

   const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
      try {
         let thumbnailData: { [key: string]: any } = {}
         if (data?.thumbnail.startsWith("data:image")) {
            thumbnailData = await uploadFile(data.thumbnail)
         }
         const res = await axiosInstance.post(`/taxonomy/create-taxonomy`, {
            ...data,
            thumbnail: thumbnailData?.name,
            type: "category"
         });
         console.log("Successfully created category", res);
         if (res.data.success) {
            toast.success(res.data.message);
            router.back()
         }
      } catch (error) {
         handleApiError(error);
      }
   };

   return (
      <div className="bg-white rounded p-4">
         <div className="mb-4">
            <div className="flex items-center flex-nowrap gap-2">
               <span onClick={() => router.back()} className="cursor-pointer"><BsArrowLeft size={20} /></span>
               <h1 className="text-xl font-medium">Add New Category</h1>
            </div>
            <p className="text-sm text-gray-500">
               Add a new category to your restaurant menu. Fill out the form below to create a new category.
            </p>
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
                     rows={1}
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
                     rows={1}
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
                     rows={4}
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

export default AddCategory;
