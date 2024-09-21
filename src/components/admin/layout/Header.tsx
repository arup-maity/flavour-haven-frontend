"use client";
import { sessionContext } from "@/context/Session";
import { DropDown } from "@/ui-components";
import { useTheme } from "@/ui-components/sidebar";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

const Header = ({ setCollapseSidebar }: { setCollapseSidebar: () => void }) => {
   const router = useRouter();
   const { setTheme, setCollapse } = useTheme();
   const session = React.useContext(sessionContext);

   const handleLogout = () => {
      Cookies.remove('token')
      localStorage.setItem('userDetails', '')
      router.push('/admin/login')
   }

   return (
      <div className="h-[60px] bg-white shadow rounded p-4">
         <div className="h-full flex items-center justify-between">
            <div className="flex items-center space-x-5">
               <button type="button" className="sidebar-close-button" onClick={setCollapseSidebar}>
                  <span className="menu-open-icon">
                     <IoIosMenu size={30} />
                  </span>
               </button>
               <form>
                  <div className="flex items-center border border-gray-300 rounded p-[1px]">
                     <input
                        type="text"
                        name=""
                        id=""
                        className="w-[300px] border-0 h-8 text-base font-montserrat focus:outline-none rounded px-2"
                        placeholder="Search ..."
                     />
                     <button
                        type="button"
                        className="h-8 text-sm border border-gray-300 rounded px-2"
                     >
                        Submit
                     </button>
                  </div>
               </form>
               <div></div>
            </div>
            <div className="flex items-center space-x-5">
               <div className="relative">
                  <DropDown>
                     <DropDown.Header id='header-user' className='border-0'>
                        <div className="text-sm font-medium font-montserrat">
                           <div className="flex items-center gap-2">
                              {
                                 session?.user?.avater ? <Image src='/images/user-placeholder.jpg' width={32} height={32} alt='' className='w-8  h-8' /> :
                                    <AiOutlineUser size={30} />
                              }
                              <ul>
                                 <li className='text-base font-montserrat font-medium'>{session?.user?.name}</li>
                                 <li className='text-xs tracking-wider capitalize leading-none opacity-80'>{session?.user?.role}</li>
                              </ul>
                           </div>
                        </div>
                     </DropDown.Header>
                     <DropDown.Menu id='header-user' className='w-[200px] bg-white right-0 left-auto top-[53px] border-0 shadow-[0_1px_10px_0_#00000033] space-y-2 p-2'>
                        <li role="button">
                           <Link href='/account' className='flex items-center gap-2'>
                              <AiOutlineUser size={20} />
                              <span className='text-base font-medium'>My Profile</span>
                           </Link>
                        </li>
                        <li role="button" className='flex items-center gap-2' onClick={handleLogout}><AiOutlineLogout size={20} /><span className='text-base font-medium'>Log out</span></li>
                     </DropDown.Menu>
                  </DropDown>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
