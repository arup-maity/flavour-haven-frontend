"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/config/axios";
import { toast } from "sonner";
import { handleApiError } from "@/utils";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

type LoginFormType = {
   email: string;
   password: string;
};

const LoginPage = ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
   const redirect = searchParams.redirect || ''
   const router = useRouter();
   const [showPassword, setShowPassword] = useState(false);
   const [loginLoading, setLoginLoading] = useState(false);
   const defaultValues = { email: "", password: "" };
   const schema = z.object({
      email: z
         .string()
         .email("Please enter a valid email")
         .min(3, "Please enter the email"),
      password: z.string().min(8, { message: "Please enter the password" })
   });
   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormType>({
      defaultValues,
      mode: "onSubmit",
      resolver: zodResolver(schema)
   });
   const onSubmit: SubmitHandler<LoginFormType> = async data => {
      try {
         setLoginLoading(true)
         const res = await axiosInstance.post(`/auth/user-login`, data);
         if (res.data.success) {
            toast.success(res.data.message);
            router.push(redirect ? `/${redirect}` : '/');
         }
      } catch (error) {
         handleApiError(error);
      } finally {
         setLoginLoading(false)
      }
   };

   return (
      <div className="w-full min-h-[90vh] flex flex-wrap items-center justify-center">
         <div className="w-full md:w-6/12 lg:w-4/12 p-4">
            <div className=" mb-9">
               <h6 className="text-[#2F2F2F] text-3xl font-medium">
                  Welcome to
               </h6>
               <h5 className="text-[40px] text-[#6358DC] font-black">
                  Our Resaurant
               </h5>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-5">
               <fieldset>
                  <label
                     htmlFor="email"
                     className="relative flex items-center border border-gray-300 shadow-sm rounded-md focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"
                  >
                     <TfiEmail size={16} className="text-gray-500 ms-2" />
                     <input
                        type="text"
                        {...register("email")}
                        className="peer w-full text-[15px] border-none rounded-md bg-transparent placeholder-transparent p-2 focus:outline-none"
                        placeholder="email"
                        autoComplete="off"
                     />
                     <span className="pointer-events-none absolute start-8 -top-0.5 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-gray-400 peer-focus:-top-0.5 peer-focus:text-sm">
                        Email
                     </span>
                  </label>
                  {errors.email &&
                     <p className="text-red-500 text-xs">
                        {errors.email.message}
                     </p>}
               </fieldset>
               <fieldset>
                  <label
                     htmlFor="email"
                     className="relative flex items-center border border-gray-300 shadow-sm rounded-md focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"
                  >
                     <RiLockPasswordLine
                        size={20}
                        className="text-gray-500 ms-2"
                     />
                     <input
                        type={showPassword ? 'text' : 'password'}
                        {...register("password")}
                        className="peer w-full h-10 text-[15px] border-none rounded-md bg-transparent placeholder-transparent p-2 focus:outline-none"
                        placeholder="email"
                        autoComplete="off"
                     />
                     <span className="pointer-events-none absolute start-8 -top-0.5 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-gray-400 peer-focus:-top-0.5 peer-focus:text-sm">
                        Password
                     </span>
                     <div className="absolute top-3 right-3 z-10 cursor-pointer" onClick={() => setShowPassword(prev => !prev)}>
                        {
                           showPassword ? <IoEyeOutline size={18} /> : <IoEyeOffOutline size={18} />
                        }
                     </div>
                  </label>
                  {errors.password &&
                     <p className="text-red-500 text-xs">
                        {errors.password.message}
                     </p>}
               </fieldset>
               <fieldset className="flex justify-between items-center">
                  <div className="">
                     <input
                        type="checkbox"
                        id="remember-me"
                        className="peer hidden"
                     />
                     <label
                        htmlFor="remember-me"
                        className="relative text-sm text-gray-400 flex items-center before:absolute before:left-0 before:w-4 before:h-4 before:border before:rounded-sm peer-checked:after:absolute peer-checked:after:w-2 peer-checked:after:h-5 peer-checked:after:left-2 peer-checked:after:top-[-4px] peer-checked:after:rotate-45 peer-checked:after:border-r-2 peer-checked:after:border-b-2 peer-checked:after:border-violet-500 pl-6 cursor-pointer"
                     >
                        Remember Me
                     </label>
                  </div>
                  <div className="text-sm text-violet-400">
                     <Link href={"/"}>Forgot Password ?</Link>
                  </div>
               </fieldset>
               <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-10 bg-[#6358DC] text-base text-white rounded-md"
               >
                  {
                     loginLoading ? "Loading..." : "Login"
                  }
               </button>
            </form>
            <Link
               href="/register"
               className="w-full text-sm text-[#000] justify-center items-center flex space-x-3"
            >
               <span>Don’t have an account?</span>
               <span className="text-[#6358DC]">Register</span>
            </Link>
         </div>
      </div>
   );
};

export default LoginPage;
