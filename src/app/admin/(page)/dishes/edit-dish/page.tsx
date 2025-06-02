"use client";
import React, { useLayoutEffect, useState } from "react";

import { z } from "zod";
import { toast } from "sonner";
import TextareaAutosize from "react-textarea-autosize";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useRouter, useSearchParams } from "next/navigation";
import { adminInstance } from "@/config/axios";
import { Button } from "@/components/ui/button";
import { useMutation, useQueries } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { blobToImage, handleApiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUpload from "@/components/thumbnail/ImageUpload";
import { MultiSelect } from "@/components/common/multi-select";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const schemaValidation = z.object({
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

type DishFormType = z.infer<typeof schemaValidation>

const AddCategory = () => {
   const router = useRouter();
   const query = useSearchParams()
   const dishId = query?.get("id") || ""
   //
   const [categoryList, setCategoryList] = useState([]);
   const defaultValues = { title: "", slug: "", description: "", shortDescription: "", price: 0, costPrice: 0, nonVeg: false, category: [], thumbnail: "" };

   const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<DishFormType>({
      defaultValues,
      mode: "onSubmit",
      resolver: zodResolver(schemaValidation)
   });
   const dishTitle = watch("title");
   useLayoutEffect(() => {
      function formatSlug(input: string) {
         let formatted = input.replace(/[^\w\s-]/g, "");
         formatted = formatted.replace(/\s+/g, "-");
         formatted = formatted.toLowerCase();
         return formatted;
      }
      const CategorySlug = formatSlug(dishTitle);
      setValue("slug", CategorySlug);
   }, [dishTitle]);

   const createDishMutation = useMutation({
      mutationKey: ["create-dish"],
      mutationFn: (data: DishFormType) => adminInstance.post(`/dishes/create-dish`, data).then(res => res.data),
      onSuccess: (data) => {
         if (data.success) {
            toast.success(data?.message)
         }
      },
      onError: (error) => {
         console.log(error)
      }
   })
   const updateDishMutation = useMutation({
      mutationKey: ["update-dish"],
      mutationFn: (data: DishFormType) => adminInstance.put(`/dishes/update-dish/${dishId}`, data).then(res => res.data),
      onSuccess: (data) => {
         if (data.success) {
            toast.success(data?.message)
         }
      },
      onError: (error) => {
         console.log(error)
      }
   })

   const onSubmit: SubmitHandler<DishFormType> = async (data) => {
      var dishData = data
      if (data?.thumbnail.startsWith("data:image")) {
         try {
            const fileUrl = await blobToImage(data.thumbnail);
            const formData = new FormData();
            formData.append("image", fileUrl);
            const response = await adminInstance.post(`/dishes/thumbnail-upload`, formData,
               { headers: { "Content-Type": "multipart/form-data" } }
            );
            if (response.data.success) {
               const thumbnailUrl = response.data.file?.key;
               dishData = { ...data, thumbnail: thumbnailUrl }
            }
         } catch (error) {
            console.log(error)
         }
      }
      const action = dishId ? updateDishMutation.mutate(dishData) : createDishMutation.mutate(dishData)
   };

   const [categoryQuery, dishDetails] = useQueries({
      queries: [
         {
            queryKey: ["dish-category"],
            queryFn: () => adminInstance.get(`/taxonomy/dishes-category`).then(res => {
               const category_list: any = [];
               res.data.categories?.map(function (item: {
                  [key: string]: string | number;
               }) {
                  category_list.push({ label: item.name, value: item.id });
               });
               setCategoryList(category_list);
               return res.data
            })
         },
         {
            queryKey: ["dish-details"],
            queryFn: () => adminInstance.get(`/dishes/read-dish/${dishId}`).then(res => {
               if (res.data.success) {
                  for (const key in defaultValues) {
                     switch (key) {
                        case "category":
                           const taxonomy = res.data?.dish?.categories.map((item: any) => item.taxonomyId);
                           // setOldCategory(taxonomy)
                           setValue("category", taxonomy);
                           break;
                        case "thumbnail":
                           // setThumbnail(res.data.dish['thumbnail'])
                           setValue("thumbnail", res.data.dish['thumbnail']);
                           break;
                        default:
                           setValue(
                              key as keyof DishFormType,
                              res.data.dish[key as keyof DishFormType]
                           );
                           break;
                     }
                  }
               }
               return res.data
            }),
            enabled: !!dishId
         }
      ]
   })
   return (
      <div className="bg-white border rounded-xl p-4">
         <div className="text-lg font-medium mb-4">Add Dish</div>
         <div className="">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div className="flex flex-wrap -m-4">
                  <div className="w-9/12 space-y-4 p-4">
                     <fieldset>
                        <Controller
                           name="nonVeg"
                           control={control}
                           render={({ field }) => (
                              <div className="flex items-center space-x-2">
                                 <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    id="nonVeg"
                                    className="w-5 h-5"
                                 />
                                 <label htmlFor="nonVeg" className="text-base">
                                    Non-Veg
                                 </label>
                              </div>
                           )}
                        />
                     </fieldset>
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
                              <label htmlFor="price" className="block text-sm text-gray-500 mb-1">
                                 Selling Price
                              </label>
                              <Input type="number" min={0} {...register("price", { valueAsNumber: true })}
                                 className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                              />
                              {errors.price && <div className="text-xs text-red-500">{errors.price.message}</div>}
                           </fieldset>
                           <fieldset>
                              <label htmlFor="costPrice" className="block text-sm text-gray-500 mb-1">
                                 Cost Price
                              </label>
                              <Input type="number" min={0} {...register("costPrice", { valueAsNumber: true })}
                                 className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                              />
                              {errors.costPrice && <div className="text-xs text-red-500">{errors.costPrice.message}</div>}
                           </fieldset>
                        </div>
                        <div className="w-6/12 space-y-4 p-2">
                           <fieldset>
                              <label htmlFor="description" className="block text-sm text-gray-500 mb-1">
                                 Category
                              </label>
                              <Controller
                                 name="category"
                                 control={control}
                                 render={({ field: { onChange, value, ...rest } }) => (
                                    <MultiSelect
                                       options={categoryList}
                                       selected={value}
                                       onChange={onChange}
                                       placeholder="Select category..."
                                    />
                                 )}
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
                  <div className="w-3/12 p-4">
                     <fieldset>
                        <label htmlFor="thumbnail" className="block text-sm text-gray-500 mb-1" >
                           Thumbnail
                        </label>
                        <div className="w-full">
                           <Controller
                              name="thumbnail"
                              control={control}
                              render={({ field: { value, onChange, ...rest } }) => (
                                 <ImageUpload
                                    image={value ? process.env.NEXT_PUBLIC_BUCKET_URL + value : ""}
                                    onImage={onChange}
                                    aspect={500 / 600}
                                    className="aspect-[500/600]"
                                 />
                              )}
                           />
                           {errors.thumbnail && (
                              <p className="text-sm text-red-500 mt-1">
                                 {errors.thumbnail.message}
                              </p>
                           )}
                        </div>
                     </fieldset>
                  </div>
               </div>
               <div className="flex items-center gap-2">
                  <Button
                     type="submit"
                     disabled={createDishMutation.isPending || updateDishMutation.isPending}
                  >
                     {(createDishMutation.isPending || updateDishMutation.isPending) && <Loader2 className="animate-spin" />}
                     Save Dish
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddCategory;
