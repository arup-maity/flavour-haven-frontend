"use client";
import React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const FloatingInput = (props) => {
  const { type = "text", className, valid, invalid, ...attributes } = props;

  return (
    <div className="relative w-full">
      <input
        type={type}
        className={twMerge(
          clsx(
            `block w-full text-base text-[#212529] dark:text-[#dee2e6] focus:text-[#212529] dark:focus:text-[#dee2e6] py-1.5 px-3 font-normal leading-normal appearance-none bg-transparent bg-clip-border border border-[#dee2e6] dark:border-[#495057] focus:border-[#505152] placeholder:[#212529] dark:placeholder-[#dee2e6] rounded-md transition-[border-color] duration-150 ease-in-out focus:outline-0`,
            { "overflow-hidden": type === "file" },
            { "border-blue-500 focus:border-blue-500": valid === true },
            { "border-red-500 focus:border-red-500": invalid === true }
          ),
          className
        )}
        {...attributes}
      />
      {valid && (
        <div className="absolute top-2.5 right-3">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" className="fill-blue-500" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"></path>
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"></path>
          </svg>
        </div>
      )}
      {invalid && (
        <div className="absolute top-2.5 right-3">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" className="fill-red-500" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default FloatingInput;
