"use client";
import { axiosInstance } from "@/config/axios";
import { handleApiError } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";

type CategoryFormType = {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  costPrice: number;
  thumbnail: string;
  category: number[];
};

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" }
];

const AddCategory = () => {
  const defaultValues = {
    title: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: 0,
    costPrice: 0,
    thumbnail: "",
    category: []
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
    price: z.number().min(1, "Price enter price"),
    costPrice: z.number().min(1, "Cost price "),
    thumbnail: z.string().url("Please enter a valid URL for the thumbnail"),
    category: z.array(z.number()).min(1, "Select at least one category")
  });
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CategoryFormType>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<CategoryFormType> = async (data) => {
    console.log(data);
    try {
      const res = await axiosInstance.post(`/dishes/create-dish`, data);
      console.log("Successfully created dish", res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-wrap -m-4">
            <div className="w-7/12 space-y-4 p-4">
              <fieldset>
                <label
                  htmlFor="title"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Dish Name
                </label>
                <input
                  {...register("title")}
                  className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
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
                <input
                  {...register("slug")}
                  className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
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
                />
                {errors.shortDescription && (
                  <div className="text-xs text-red-500">
                    {errors.shortDescription.message}
                  </div>
                )}
              </fieldset>
              <div className="flex flex-wrap -m-2">
                <div className="w-6/12 p-2">
                  <fieldset>
                    <label
                      htmlFor="price"
                      className="block text-sm text-gray-500 mb-1"
                    >
                      Selling Price
                    </label>
                    <input
                      {...(register("price"), { valueAsNumber: true })}
                      className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                    />
                    {errors.price && (
                      <div className="text-xs text-red-500">
                        {errors.price.message}
                      </div>
                    )}
                  </fieldset>
                </div>
                <div className="w-6/12 p-2">
                  <fieldset>
                    <label
                      htmlFor="costPrice"
                      className="block text-sm text-gray-500 mb-1"
                    >
                      Cost Price
                    </label>
                    <input
                      {...(register("costPrice"), { valueAsNumber: true })}
                      className="w-full h-9 !bg-transparent text-base border border-slate-400 rounded px-2"
                    />
                    {errors.costPrice && (
                      <div className="text-xs text-red-500">
                        {errors.costPrice.message}
                      </div>
                    )}
                  </fieldset>
                </div>
              </div>
              <fieldset>
                <label
                  htmlFor="description"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Category
                </label>
                <Select options={options} />
              </fieldset>
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
                />
                {errors.description && (
                  <div className="text-xs text-red-500">
                    {errors.description.message}
                  </div>
                )}
              </fieldset>
            </div>
            <div className="w-5/12 p-4">
              <div className="">
                <label
                  htmlFor="thumbnail"
                  className="block text-sm text-gray-500 mb-1"
                >
                  Thumbnail
                </label>
                <div className="aspect-square border border-slate-400"></div>
              </div>
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
