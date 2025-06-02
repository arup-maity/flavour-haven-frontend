'use client'
import React from 'react'

import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { Controller, SubmitHandler, useForm } from "react-hook-form"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import ImageUpload from '@/components/thumbnail/ImageUpload';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminInstance } from '@/config/axios';
import { toast } from 'sonner';
import { blobToImage, handleApiError } from '@/utils';
import { Loader2 } from 'lucide-react';

const schemaValidation = z.object({
   name: z.string().min(2, "Category name must be at least 2 characters long"),
   slug: z
      .preprocess((val) => {
         if (typeof val === "string") {
            return val
               .toLowerCase()
               .trim()
               .replace(/\s+/g, "-")          // Replace whitespace with hyphen
               .replace(/[^a-z0-9-]/g, "");   // Remove invalid characters
         }
         return val;
      },
         z.string()
            .min(2, "Category slug must be at least 2 characters long")
            .regex(/^[a-z0-9-]+$/, {
               message:
                  "Category slug must contain only lowercase letters, numbers, and hyphens.",
            })
      ),
   description: z.string(),
   thumbnail: z.string(),
   type: z.string()
});
type AddCategoryFormType = z.infer<typeof schemaValidation>
const AddDishCategory = ({ open, close, categoryId }: { open: boolean, close: () => void, categoryId: number | null }) => {
   const defaultValues = { name: "", slug: "", description: "", thumbnail: '', type: "category" };
   const { register, control, handleSubmit, reset, setValue, formState: { errors } } = useForm<AddCategoryFormType>({
      defaultValues,
      mode: 'onSubmit',
      resolver: zodResolver(schemaValidation),
   })
   const queryClient = useQueryClient()
   const createCategoryMututation = useMutation({
      mutationKey: ["admin-create-dish-taxonomy"],
      mutationFn: async (data: AddCategoryFormType) => await adminInstance.post(`/taxonomy/create-taxonomy`, data),
      onSuccess: (data) => {
         close()
         reset()
         queryClient.invalidateQueries({
            queryKey: ['admin-dish-categories']
         })
         toast.success("Create successfully")
      },
      onError: (error) => handleApiError(error)
   })
   const updateCategoryMututation = useMutation({
      mutationKey: ["admin-update-dish-taxonomy"],
      mutationFn: async (data: AddCategoryFormType) => await adminInstance.put(`/taxonomy/update-taxonomy/${categoryId}`, data),
      onSuccess: (data) => {
         close()
         reset()
         queryClient.invalidateQueries({
            queryKey: ['admin-dish-categories']
         })
         toast.success("Create successfully")
      },
      onError: (error) => handleApiError(error)
   })
   const onSubmit: SubmitHandler<AddCategoryFormType> = async (data) => {
      var categoryData = data
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
            categoryData = { ...data, thumbnail: response.data.file.key }
         }
      }
      if (categoryId) {
         updateCategoryMututation.mutate(categoryData)
      } else {
         createCategoryMututation.mutate(categoryData)
      }
   }
   const { data, isLoading } = useQuery({
      queryKey: ["admin-get-taxonomy"],
      queryFn: () => adminInstance.get(`/taxonomy/read-taxonomy/${categoryId}`).then(
         res => {
            if (res.data?.success) {
               const taxonomy = res.data.taxonomy;
               for (const key in defaultValues) {
                  switch (key) {
                     case 'thumbnail':
                        setValue("thumbnail", process.env.NEXT_PUBLIC_BUCKET_URL + taxonomy?.thumbnail)
                        break;
                     default:
                        setValue(key as keyof AddCategoryFormType, taxonomy[key as keyof AddCategoryFormType])
                        break;
                  }
               }
            }
         }
      ),
      enabled: !!categoryId && open
   })
   return (
      <>
         <Sheet open={open} onOpenChange={() => { close(); reset() }}>
            <SheetContent className='w-full lg:w-10/12 flex flex-col rounded-l-xl py-0'>
               <SheetHeader className='py-4 px-2'>
                  <SheetTitle className="text-lg">
                     {categoryId ? 'Update Category' : 'Add Category'}
                  </SheetTitle>
                  <SheetDescription className='hidden'></SheetDescription>
               </SheetHeader>
               <form onSubmit={handleSubmit(onSubmit)} className='flex-grow flex flex-col overflow-y-auto'>
                  <div className=" grow overflow-y-auto">
                     <div className="max-w-3xl space-y-4 px-4">
                        <fieldset>
                           <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
                              Thumbnail
                           </label>
                           <div className="w-40">
                              <Controller
                                 name="thumbnail"
                                 control={control}
                                 rules={{ required: true }}
                                 render={({ field: { value, onChange, ...rest } }) =>
                                    <ImageUpload image={value} onImage={onChange} aspect={448 / 626} className="aspect-[448/626]" modal={true} />
                                 }
                              />
                           </div>
                        </fieldset>
                        <fieldset>
                           <label htmlFor="name" className="block text-sm text-gray-700 font-medium mb-1">
                              Category Name
                           </label>
                           <Input {...register("name")} />
                           {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
                        </fieldset>
                        <fieldset>
                           <label htmlFor="slug" className="block text-sm text-gray-700 font-medium mb-1">
                              Category Slug
                           </label>
                           <Input {...register("slug")} />
                           {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
                        </fieldset>
                        <fieldset>
                           <label htmlFor="description" className="block text-sm text-gray-700 font-medium mb-1">
                              Description
                           </label>
                           <TextareaAutosize
                              {...register("description")}
                              className="w-full !bg-transparent text-base border border-slate-300 rounded p-2"
                              minRows={4}
                              rows={4}
                           />
                           {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                        </fieldset>
                     </div>
                  </div>
                  <div className="flex gap-2 p-4">
                     <Button type='submit' className='w-32'
                        disabled={createCategoryMututation?.isPending || updateCategoryMututation?.isPending}
                     >
                        {(createCategoryMututation?.isPending || updateCategoryMututation?.isPending) && <Loader2 className='animate-spin' />}
                        Save
                     </Button>
                     <Button variant='secondary' className='w-32'
                        disabled={createCategoryMututation?.isPending || updateCategoryMututation?.isPending}
                        onClick={() => { close(); reset() }}
                     >
                        Cancel
                     </Button>
                  </div>
               </form>
            </SheetContent>
         </Sheet>
      </>
   )
}

export default AddDishCategory