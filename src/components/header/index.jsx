import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="container-webx bg-[#0e1927]">
      <div className="flex flex-nowrap items-center justify-between p-4">
        <div className="">
          <Image src="/logo.svg" width="137" height="32" alt="" className="w-full h-8" />
        </div>
        <ul className="flex flex-nowrap space-x-8">
          <li className="text-base font-semibold">Search</li>
          <li className="text-base font-semibold">Offer</li>
          <li className="text-base font-semibold">Sign In</li>
          <li className="text-base font-semibold">Cart</li>
        </ul>
        <div className="">
          <Link href="/page/book-table" className="border border-gray-500 rounded-md py-2 px-5">
            Book a Table
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
