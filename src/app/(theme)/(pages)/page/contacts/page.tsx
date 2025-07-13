import React from 'react'
import { MdEmail, MdLocationOn, MdLocalPhone } from "react-icons/md";
import { FaXTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { Input } from '@/components/ui/input';


const ContactPage = () => {
   return (
      <div className='w-full'>
         <div className="bg-[#195A00] bg-opacity-20 aspect-[3/2] md:aspect-[3/1] lg:aspect-[9/2] bg-cover bg-no-repeat pt-20">
            <div className="theme-container flex flex-col justify-center items-center h-full">
               <p className='postbook text-4xl md:text-5xl text-[#195A00] font-bold'>Contacts</p>
            </div>
         </div>
         <div className="theme-container !py-20">
            <div className="flex flex-wrap items-center -m-6">
               <div className="w-full lg:w-6/12 p-6">
                  <div className="">
                     <p className='text-[#195A00] text-base font-semibold uppercase mb-4'>How Can We Help?</p>
                     <p className='text-[#101A24] text-3xl font-bold mb-5'>Have Questions? Get In touch!</p>
                     <p className='mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, in. Consectetur sunt et autem ducimus.</p>
                     <div className="flex items-center gap-2 mb-4">
                        <span><MdEmail size={22} className='text-[#195A00]' /></span>
                        <span className='text-lg font-medium'>arupmaity032@gmail.com</span>
                     </div>
                     <div className="flex items-center gap-2 mb-4">
                        <span><MdLocationOn size={22} className='text-[#195A00]' /></span>
                        <span className='text-lg font-medium'>4 apt. Flawing Street. The Grand Avenue Liverpool, UK 33342</span>
                     </div>
                     <div className="flex items-center gap-2 mb-8">
                        <span><MdLocalPhone size={22} className='text-[#195A00]' /></span>
                        <span className='text-lg font-medium'>+91 790 807 8676</span>
                     </div>
                     <ul className='flex items-center gap-4'>
                        <li className='text-[#195A00] border border-[#195A00] rounded-full p-2'><FaFacebookF /></li>
                        <li className='text-[#195A00] border border-[#195A00] rounded-full p-2'><FaXTwitter /></li>
                        <li className='text-[#195A00] border border-[#195A00] rounded-full p-2'><FaInstagram /></li>
                        <li className='text-[#195A00] border border-[#195A00] rounded-full p-2'><FaYoutube /></li>
                     </ul>
                  </div>
               </div>
               <div className="w-full lg:w-6/12 p-6">
                  <div className="border border-[#195A00] rounded-lg p-4 lg:p-8">
                     <p className='text-[#195A00] text-base font-semibold uppercase mb-4'>Send us a message</p>
                     <p className='text-[#101A24] text-3xl font-bold mb-5'>Contact Form</p>
                     <p className='opacity-60 mb-8'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, in. Consectetur sunt et autem ducimus.</p>
                     <form className='space-y-4'>
                        <fieldset>
                           <Input placeholder='Name' />
                        </fieldset>
                        <div className="flex flex-wrap -m-2">
                           <fieldset className='w-full md:w-6/12 p-2'>
                              <Input placeholder='Email' />
                           </fieldset>
                           <fieldset className='w-full md:w-6/12 p-2'>
                              <Input placeholder='Pohone Number' />
                           </fieldset>
                        </div>
                        <fieldset>
                           <textarea placeholder='Message' rows={5} className='w-full border border-gray-300 rounded-md p-4' />
                        </fieldset>
                        <button className='bg-[#195A00] text-white py-3 px-6 rounded-full'>Send Message</button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactPage