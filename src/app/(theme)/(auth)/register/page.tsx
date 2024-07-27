"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { handleApiError } from "@/utils";
import { axiosInstance } from "@/config/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegistrationFormType = {
  fullName: string;
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  //
  const defaultValues = { fullName: "", email: "", password: "" };
  const schema = z.object({
    fullName: z.string().min(3, "Please enter full name"),
    email: z
      .string()
      .email("Please enter a valid email")
      .min(3, "Please enter the email"),
    password: z
      .string()
      .min(3, { message: "Please enter the password" })
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/, {
        message:
          "Your password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      })
  });
  const { register, handleSubmit, formState: { errors } } = useForm<
    RegistrationFormType
  >({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(schema)
  });
  const onSubmit: SubmitHandler<RegistrationFormType> = async data => {
    try {
      const res = await axiosInstance.post(`/user/create-user`, data);
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="w-screen overflow-hidden">
      <div className="h-full w-full flex flex-nowrap items-center justify-between">
        <div className="w-7/12 max-lg:hidden flex justify-center">
          <Image
            src="/login.jpg"
            width={500}
            height={500}
            alt=""
            className="max-w-full max-h-full"
          />
        </div>
        <div className="w-5/12 max-lg:w-full h-[90vh] flex items-center lg:p-10">
          <div className="w-full bg-white rounded-lg shadow-[0px_4px_15px_0px_#0000001C] p-10">
            <div className=" mb-9">
              <h6 className="text-[#2F2F2F] text-3xl font-medium">
                Welcome to
              </h6>
              <h5 className="text-[40px] text-[#6358DC] font-black">
                Our Resaurant
              </h5>
            </div>
            <div className="w-full flex flex-col justify-center space-y-4">
              <button className="h-14 w-full flex flex-nowrap items-center justify-center space-x-3 rounded-lg shadow-[0px_4px_15px_0px_#0000001C] mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="w-5 h-5"
                >
                  <g clipPath="url(#clip0_644_79307)">
                    <path
                      d="M7.09188 19.3388L5.978 23.4971L1.90681 23.5832C0.690125 21.3265 0 18.7446 0 16.0008C0 13.3476 0.64525 10.8456 1.789 8.64258H1.78988L5.41437 9.30708L7.00212 12.9098C6.66981 13.8786 6.48869 14.9186 6.48869 16.0008C6.48881 17.1753 6.70156 18.3006 7.09188 19.3388Z"
                      fill="#FBBB00"
                    />
                    <path
                      d="M31.7203 13.0117C31.904 13.9796 31.9998 14.9792 31.9998 16.0007C31.9998 17.1462 31.8794 18.2636 31.6499 19.3414C30.8711 23.0091 28.8359 26.2117 26.0166 28.4781L26.0157 28.4772L21.4504 28.2443L20.8043 24.2108C22.6751 23.1137 24.1371 21.3968 24.9072 19.3414H16.3516V13.0117H25.032H31.7203Z"
                      fill="#518EF8"
                    />
                    <path
                      d="M26.0152 28.4763L26.0161 28.4772C23.2742 30.6811 19.7911 31.9998 15.9994 31.9998C9.90625 31.9998 4.60869 28.5941 1.90625 23.5823L7.09131 19.3379C8.4425 22.944 11.9212 25.5111 15.9994 25.5111C17.7524 25.5111 19.3946 25.0372 20.8038 24.21L26.0152 28.4763Z"
                      fill="#28B446"
                    />
                    <path
                      d="M26.2128 3.6835L21.0295 7.927C19.5711 7.01538 17.8471 6.48875 16.0001 6.48875C11.8295 6.48875 8.28575 9.17356 7.00225 12.909L1.78994 8.64175H1.78906C4.45194 3.50769 9.81631 0 16.0001 0C19.8823 0 23.4418 1.38287 26.2128 3.6835Z"
                      fill="#F14336"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_644_79307">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[#2F2F2F] text-base">
                  Login with Google
                </span>
              </button>
              <button className="h-14 w-full flex flex-nowrap items-center justify-center space-x-3 rounded-lg shadow-[0px_4px_15px_0px_#0000001C] mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="32"
                  viewBox="0 0 16 32"
                  fill="none"
                  className="w-5 h-5"
                >
                  <path
                    d="M13.0789 5.31333H16V0.225333C15.496 0.156 13.7629 0 11.7444 0C2.50246 0 5.01692 10.4667 4.64895 12H0V17.688H4.64761V32H10.3458V17.6893H14.8054L15.5134 12.0013H10.3445C10.5951 8.236 9.32989 5.31333 13.0789 5.31333V5.31333Z"
                    fill="#3B5999"
                  />
                </svg>
                <span className="text-[#2F2F2F] text-base">
                  Login with Facebook
                </span>
              </button>
            </div>
            <div className="my-6 relative">
              <p className="w-full flex justify-center before:absolute before:border-b-[1px] before:w-full before:top-2">
                <span className="text-xs bg-white z-10 px-5">OR</span>
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-5">
              <fieldset>
                <label
                  htmlFor="fullName"
                  className="relative flex items-center border border-gray-300 shadow-sm rounded-md focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500"
                >
                  <AiOutlineUser size={20} className="text-gray-500 ms-2" />
                  <input
                    type="text"
                    {...register("fullName")}
                    className="peer w-full text-[15px] border-none rounded-md bg-transparent placeholder-transparent p-2 focus:outline-none"
                    placeholder="Full Name"
                    autoComplete="off"
                  />
                  <span className="pointer-events-none absolute start-8 -top-0.5 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-gray-400 peer-focus:-top-0.5 peer-focus:text-sm">
                    Full Name
                  </span>
                </label>
                {errors.fullName &&
                  <span className="text-xs text-red-500">
                    {errors.fullName.message}
                  </span>}
              </fieldset>
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
                  <span className="text-xs text-red-500">
                    {errors.email.message}
                  </span>}
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
                    type="text"
                    {...register("password")}
                    className="peer w-full h-10 text-[15px] border-none rounded-md bg-transparent placeholder-transparent p-2 focus:outline-none"
                    placeholder="email"
                    autoComplete="off"
                  />
                  <span className="pointer-events-none absolute start-8 -top-0.5 -translate-y-1/2 bg-white p-0.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:text-gray-400 peer-focus:-top-0.5 peer-focus:text-sm">
                    Password
                  </span>
                </label>
                {errors.password &&
                  <span className="text-xs text-red-500">
                    {errors.password.message}
                  </span>}
              </fieldset>
              <button
                type="submit"
                className="w-full h-10 bg-[#6358DC] text-base text-white rounded-md"
              >
                Register
              </button>
            </form>
            <Link
              href="/login"
              className="w-full text-sm text-[#000] justify-center items-center flex space-x-3"
            >
              <span>Don’t have an account?</span>
              <span className="text-[#6358DC]">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
