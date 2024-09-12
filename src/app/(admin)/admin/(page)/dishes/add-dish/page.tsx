"use client";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useLayoutEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/thumbnail/ImageUpload";
import { uploadFile } from "@/components/admin/utils";

type CategoryFormType = {
   title: string;
   slug: string;
   description: string;
   shortDescription: string;
   price: number;
   costPrice: number;
   nonVeg: boolean;
   category: number[];
   thumbnail: string
};

const AddCategory = () => {
   const router = useRouter();
   //
   const [categoryList, setCategoryList] = useState([]);
   const defaultValues = {
      title: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      costPrice: 0,
      nonVeg: false,
      category: [],
      thumbnail: ''
   };
   const schema = z.object({
      title: z.string().min(2, "Please enter title"),
      slug: z
         .string()
         .min(2, "Slug must be at least 2 characters long")
         .regex(/^[a-z0-9-]+$/, {
            message:
               "Slug must contain only lowercase letters, hyphen and numbers, and must not contain any whitespace or uppercase letters."
         }),
      description: z
         .string()
         .min(10, "Description must be at least 10 characters long"),
      shortDescription: z
         .string()
         .min(10, "Description must be at least 10 characters long"),
      price: z.number().gt(0),
      costPrice: z.number().gt(0),
      nonVeg: z.boolean(),
      category: z.array(z.number()).optional(),
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

   useLayoutEffect(() => {
      getCategories();
   }, []);

   const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
      try {
         let thumbnailData: { [key: string]: any } = {}
         if (data?.thumbnail.startsWith("data:image")) {
            thumbnailData = await uploadFile(data.thumbnail)
         }
         const res = await axiosInstance.post(`/dishes/create-dish`, { ...data, thumbnail: thumbnailData?.name });
         console.log('submit', res)
         if (res.data.success) {
            toast.success(res.data.message);
            router.back();
         }
      } catch (error) {
         handleApiError(error);
      }
   };

   async function getCategories() {
      try {
         const res = await axiosInstance.get(`/taxonomy/taxonomies/category`);
         // console.log(res.data);
         if (res.data.success) {
            const category_list: any = [];
            res.data.taxonomies?.map(function (item: {
               [key: string]: string | number;
            }) {
               category_list.push({ label: item.name, value: item.id });
            });
            setCategoryList(category_list);
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="bg-white rounded p-4">
         <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="flex flex-wrap -m-4">
                  <div className="w-3/12 p-4">
                     <div className="">
                        <label
                           htmlFor="thumbnail"
                           className="block text-sm text-gray-500 mb-1"
                        >
                           Thumbnail
                        </label>
                        <div className="w-full">
                           <Controller
                              name="thumbnail"
                              control={control}
                              rules={{ required: true }}
                              render={({ field: { value, onChange, ...rest } }) =>
                                 <ImageUpload image={process.env.NEXT_PUBLIC_BUCKET_URL + value} onImage={(file) => onChange(file)} aspect={500 / 600} className="aspect-[448/626]" />
                              }
                           />
                        </div>
                     </div>
                  </div>
                  <div className="w-9/12 space-y-4 p-4">
                     <fieldset>
                        <label
                           htmlFor="title"
                           className="block text-sm text-gray-500 mb-1"
                        >
                           Dish Name
                        </label>
                        <TextareaAutosize
                           {...register("title")}
                           className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                           rows={1}
                        />
                        {errors.title && (
                           <div className="text-xs text-red-500">
                              {errors.title.message}
                           </div>
                        )}
                     </fieldset>
                     <fieldset>
                        <label htmlFor="" className="block text-sm text-gray-500 mb-1">
                           Slug
                        </label>
                        <TextareaAutosize
                           {...register("slug")}
                           className="w-full !bg-transparent text-base border border-slate-400 rounded p-2"
                           rows={1}
                        />
                        {errors.slug && (
                           <div className="text-xs text-red-500">
                              {errors.slug.message}
                           </div>
                        )}
                     </fieldset>
                     <fieldset>
                        <label
                           htmlFor="shortDescription"
                           className="block text-sm text-gray-500 mb-1"
                        >
                           Short Description
                        </label>
                        <TextareaAutosize
                           {...register("shortDescription")}
                           className="w-full !bg-transparent text-base border border-slate-400 rounded px-2"
                           minRows={4}
                           rows={4}
                        />
                        {errors.shortDescription && (
                           <div className="text-xs text-red-500">
                              {errors.shortDescription.message}
                           </div>
                        )}
                     </fieldset>
                     <div className="flex flex-wrap -m-2">
                        <div className="w-6/12 space-y-4 p-2">
                           <fieldset>
                              <label
                                 htmlFor="price"
                                 className="block text-sm text-gray-500 mb-1"
                              >
                                 Selling Price
                              </label>
                              <input
                                 type="number"
                                 min={0}
                                 {...register("price", {
                                    valueAsNumber: true
                                 })}
                                 className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                              />
                              {errors.price && (
                                 <div className="text-xs text-red-500">
                                    {errors.price.message}
                                 </div>
                              )}
                           </fieldset>
                           <fieldset>
                              <label
                                 htmlFor="costPrice"
                                 className="block text-sm text-gray-500 mb-1"
                              >
                                 Cost Price
                              </label>
                              <input
                                 type="number"
                                 min={0}
                                 {...(register("costPrice", {
                                    valueAsNumber: true
                                 }))}
                                 className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                              />
                              {errors.costPrice && (
                                 <div className="text-xs text-red-500">
                                    {errors.costPrice.message}
                                 </div>
                              )}
                           </fieldset>
                        </div>
                        <div className="w-6/12 space-y-4 p-2">
                           <fieldset>
                              <label
                                 htmlFor="description"
                                 className="block text-sm text-gray-500 mb-1"
                              >
                                 Category
                              </label>
                              <Controller
                                 name="category"
                                 control={control}
                                 render={({ field: { onChange, value, ...rest } }) => (
                                    <Select
                                       instanceId="blog-category"
                                       isMulti
                                       options={categoryList}
                                       value={categoryList?.filter((obj: { [key: string]: any }) =>
                                          value.includes(obj.value)
                                       )}
                                       onChange={(e) =>
                                          onChange(Array.isArray(e) ? e.map((x: { [key: string]: any }) => x.value) : [])
                                       }
                                    />
                                 )}
                              />
                           </fieldset>
                           <fieldset>
                              <label
                                 htmlFor="description"
                                 className="block text-sm text-gray-500 mb-1"
                              >
                                 Non-Veg
                              </label>
                              <input
                                 {...register("nonVeg")}
                                 type="checkbox"
                                 className="w-5 h-5 text-indigo-400"
                              />
                           </fieldset>
                        </div>
                     </div>
                     <fieldset>
                        <label
                           htmlFor="description"
                           className="block text-sm text-gray-500 mb-1"
                        >
                           Description
                        </label>
                        <TextareaAutosize
                           {...register("description")}
                           className="w-full !bg-transparent text-base border border-slate-400 rounded px-2"
                           minRows={10}
                           rows={10}
                        />
                        {errors.description && (
                           <div className="text-xs text-red-500">
                              {errors.description.message}
                           </div>
                        )}
                     </fieldset>
                  </div>
               </div>
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
