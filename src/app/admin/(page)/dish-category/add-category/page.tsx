"use client";
import { adminInstance } from "@/config/axios";
import { blobToImage, handleApiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import ImageUpload from "@/components/thumbnail/ImageUpload";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Spinner from "@/ui-components/spinner";
import { Loader2 } from "lucide-react";

type CategoryFormType = {
   name: string;
   slug: string;
   description: string;
   thumbnail: string
};

const AddCategory = () => {
   const router = useRouter()
   const [apiLoading, setApiLoading] = useState(false)
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
      description: z.string(),
      thumbnail: z.string()
   });
   const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<CategoryFormType>({
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
         let thumbnailUrl = ''
         setApiLoading(true);
         if (data?.thumbnail.startsWith("data:image")) {
            const fileUrl = await blobToImage(data.thumbnail)
            const formData = new FormData();
            formData.append("image", fileUrl);
            const response = await adminInstance.post(`/taxonomy/thumbnail-upload`, formData, {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            })
            if (response.data.success) {
               thumbnailUrl = `/taxonomy/${response.data.file.originalname}`
            }
         }
         const res = await adminInstance.post(`/taxonomy/create-taxonomy`, {
            ...data,
            thumbnail: thumbnailUrl,
            type: "category"
         });
         console.log("Successfully created category", res);
         if (res.data.success) {
            toast.success(res.data.message);
            router.back()
         }
      } catch (error) {
         handleApiError(error);
      } finally {
         setApiLoading(false);
      }
   };

   return (
      <div className="bg-white rounded p-6">
         <div className="mb-4">
            <div className="flex items-center flex-nowrap gap-2">
               {/* <span onClick={() => router.back()} className="cursor-pointer"><BsArrowLeft size={20} /></span> */}
               <h1 className="text-xl font-redHat font-medium">Add New Category</h1>
            </div>
            <p className="text-base text-gray-400">
               Add a new category to your restaurant menu. Fill out the form below to create a new category.
            </p>
         </div>
         <div className="w-7/12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <fieldset>
                  <label htmlFor="thumbnail" className="block text-base text-gray-500 font-medium mb-1">
                     Thumbnail
                  </label>
                  <div className="w-36">
                     <Controller
                        name="thumbnail"
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, ...rest } }) =>
                           <ImageUpload image={'/placeholder/file_placeholder.png'} onImage={(file) => onChange(file)} aspect={448 / 626} className="aspect-[448/626]" />
                        }
                     />
                  </div>
               </fieldset>
               <fieldset>
                  <label htmlFor="name" className="block text-base text-gray-500 font-medium mb-1">
                     Category Name
                  </label>
                  <input
                     {...register("name")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
               </fieldset>
               <fieldset>
                  <label htmlFor="slug" className="block text-base text-gray-500 font-medium mb-1">
                     Category Slug
                  </label>
                  <input
                     {...register("slug")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                  />
                  {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
               </fieldset>
               <fieldset>
                  <label htmlFor="description" className="block text-base text-gray-500 font-medium mb-1">
                     Description
                  </label>
                  <TextareaAutosize
                     {...register("description")}
                     className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                     minRows={4}
                     rows={4}
                  />
                  {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
               </fieldset>
               <div className="flex items-center gap-4">
                  <button
                     disabled={apiLoading}
                     type="submit"
                     className="flex items-center gap-4 text-base text-white bg-blue-button hover:bg-blue-hover-button rounded py-1 px-4"
                  >
                     {apiLoading && <Loader2 className="animate-spin" />}
                     Save Category
                  </button>
                  <button
                     type="button"
                     className="text-base bg-gray-200 hover:bg-gray-300 rounded py-1 px-5"
                     onClick={() => router.back()}
                  >
                     Cancel
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddCategory;
