import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoBagOutline } from "react-icons/io5";
import { getSession } from "@/authentication/Session";
import UserDropdown from "./UserDropdown";

const Header = async () => {
  const session = await getSession();
  return (
    <div className="container-webx bg-[#0e1927]">
      <div className="flex flex-nowrap items-center justify-between p-4">
        <div className="flex items-center gap-14">
          <div className="">
            <Image
              src="/logo.svg"
              width="137"
              height="32"
              alt=""
              className="w-full h-8"
            />
          </div>
          <ul className="flex flex-nowrap space-x-8 *:text-white">
            <li className="text-base">
              <Link href="/">Home</Link>
            </li>
            <li className="text-base">
              <Link href="/page/offer">Offer</Link>
            </li>
            <li className="text-base">
              <Link href="/page/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <div className="">
            <Link
              href="/page/book-table"
              className="text-base text-white border border-gray-500 rounded-md py-2 px-5"
            >
              Book a Table
            </Link>
          </div>
          <div className="">
            {session.login
              ? <UserDropdown user={session?.user} />
              : <Link href="/login" className="text-base text-white">
                  <p className="text-sm font-light leading-none">
                    Hello, sign in /
                  </p>
                  <p className="text-base font-light leading-none">
                    Create Account
                  </p>
                </Link>}
          </div>
          <div className="">
            <button type="button" className="text-base text-white">
              <IoBagOutline size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
