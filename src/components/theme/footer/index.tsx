import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GoClock } from "react-icons/go";
import { IoMailOpenOutline } from "react-icons/io5";
import { SlPhone } from "react-icons/sl";
import { PiMapPin } from "react-icons/pi";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
   return (
      <>
         <footer className="relative w-full h-full bg-black pt-16">
            <div className="theme-container">
               <div className="flex flex-wrap -m-6 mb-6">
                  <div className="w-full md:w-6/12 lg:w-3/12 p-6">
                     <Link href='/' className="flex items-center mb-7">
                        <Image src="/logo/logo-white-01.png" width={137} height={40} alt="" className="w-auto h-8 md:h-10 shrink-0" />
                     </Link>
                     <p className=" text-gray-400 text-[15px] mb-4">
                        A cozy restaurant serving delicious, freshly prepared meals with warm hospitality and a welcoming atmosphere for family and friends.
                     </p>
                     <div className="text-white flex justify-start space-x-3">
                        <a href="#" title="Facebook" className="flex items-center p-1">
                           <FaFacebookF />
                        </a>
                        <a href="#" title="Twitter" className="flex items-center p-1">
                           <FaXTwitter />
                        </a>
                        <a href="#" title="Instagram" className="flex items-center p-1">
                           <FaInstagram />
                        </a>
                        <a href="#" title="Instagram" className="flex items-center p-1">
                           <FaYoutube />
                        </a>
                     </div>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-6">
                     <div className="text-white space-y-3">
                        <h3 className="text-lg font-semibold mb-7">Opening Hours</h3>
                        <ul className="text-gray-400 space-y-1">
                           <li className="flex items-center justify-between border-b border-gray-400 pb-2">
                              <span>Mon-Fri</span>
                              <span>08:00 - 12:00</span>
                           </li>
                           <li className="flex items-center justify-between border-b border-gray-400 pb-2">
                              <span>Saturday</span>
                              <span>08:00 - 12:00</span>
                           </li>
                           <li className="flex items-center justify-between">
                              <span>Sunday</span>
                              <span>Closed</span>
                           </li>
                        </ul>
                     </div>
                  </div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-6">
                     <div className=" text-white space-y-3">
                        <h3 className="text-lg font-semibold mb-7">Usefull Links</h3>
                        <ul className="text-gray-400 space-y-2">
                           <li>
                              <a href="#" className="text-base">Privacy Policy</a>
                           </li>
                           <li>
                              <a href="#" className="text-base">Terms and Conditions</a>
                           </li>
                           <li>
                              <a href="#" className="text-base">FAQ</a>
                           </li>
                        </ul>
                     </div></div>
                  <div className="w-full md:w-6/12 lg:w-3/12 p-6">
                     <div className="text-white space-y-3">
                        <h3 className="text-lg font-semibold mb-7">Contact Us</h3>
                        <ul className="text-gray-400 space-y-2">
                           <li className="flex gap-2">
                              <PiMapPin size={18} className="mt-1 shrink-0" />
                              <p className="text-base">South 24 Parganas, Kolkata, West Bengal, India 700066</p>
                           </li>
                           <li className="flex items-center gap-2">
                              <SlPhone size={16} />
                              <p>+91 790 807 8975</p>
                           </li>
                           <li className="flex items-center gap-2">
                              <IoMailOpenOutline size={18} />
                              <p className="text-base">arupmaity079@gmail.com</p>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
               <div className="py-4 text-sm text-center text-white border-t">© 2024 arupmaity.in All rights reserved.</div>
            </div>
         </footer>
      </>
   );
};

export default Footer;
