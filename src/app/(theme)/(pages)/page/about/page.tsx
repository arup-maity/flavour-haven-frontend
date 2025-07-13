'use client'
import Image from 'next/image'
import React from 'react'

const AboutPage = () => {
   const service = [
      {
         title: 'Breakfast',
         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?',
         icon: '/service/service-04.png'
      },
      {
         title: 'Lunch',
         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?',
         icon: '/service/service-05.png'
      },
      {
         title: 'Dinner',
         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?',
         icon: '/service/service-03.png'
      },
      {
         title: 'Custom',
         desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?',
         icon: '/service/service-02.png'
      },
   ]
   const chefs = [
      {
         name: 'Kristin Watson',
         designation: 'Head Chef',
         image: '/chef/chef-04.jpg'
      },
      {
         name: 'Annette Black',
         designation: 'Senior Chef',
         image: '/chef/chef-05.jpg'
      },
      {
         name: 'Ralph Edwards',
         designation: 'Senior Chef',
         image: '/chef/chef-03.png'
      },
   ]
   return (
      <div className='w-full'>
         <div className="bg-[#195A00] bg-opacity-20 aspect-[3/2] md:aspect-[3/1] lg:aspect-[9/2] bg-cover bg-no-repeat pt-20">
            <div className="theme-container flex flex-col justify-center items-center h-full">
               <p className='postbook text-4xl md:text-5xl text-[#195A00] font-bold'>About Us</p>
            </div>
         </div>
         <div className="theme-container !py-16">
            <div className="">
               <p className='text-base font-bold uppercase text-[#195A00] mb-6'>Why Choose Our About</p>
               <div className="flex flex-wrap items-center -m-6">
                  <div className="w-full lg:w-6/12 p-6">
                     <p className='text-4xl md:text-5xl text-[#33333] font-bold'>
                        Unlimited Better Foods,
                        <span className='text-black opacity-40 lg:block'> All In One Place</span>
                     </p>
                  </div>
                  <div className="w-full lg:w-6/12 p-6">
                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, ad? Praesentium tempora accusantium eaque ea, quod adipisci atque iste aliquam architecto facere amet totam repellendus.
                  </div>
               </div>
            </div>
            <div className="py-20">
               <div className="mb-8">
                  <p className='postbook !text-2xl md:text-5xl text-[#33333] font-bold text-center mb-4'>Our Service</p>
                  <p className='w-10/12 lg:w-7/12 mx-auto text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?</p>
               </div>
               <div className="">
                  <div className="flex flex-wrap -m-2">
                     {
                        service.map((item, index) => (
                           <div key={index} className="w-full lg:w-6/12 p-2">
                              <div className="flex max-md:flex-wrap gap-6 border rounded-md p-4 md:p-8">
                                 <div className="shrink-0">
                                    <Image src={item.icon} width={100} height={100} alt='' className='size-20' />
                                 </div>
                                 <div className="">
                                    <p className='text-2xl text-[#333333] font-bold mb-3'>{item.title}</p>
                                    <p className='text-base text-[#4f4f4f] leading-6'>{item.desc}</p>
                                 </div>
                              </div>
                           </div>
                        ))
                     }
                  </div>
               </div>
            </div>
            <div className="py-20">
               <div className="mb-8">
                  <p className='postbook !text-2xl md:text-5xl text-[#33333] font-bold text-center mb-4'>Meet Our Best Chef</p>
                  <p className='w-10/12 lg:w-7/12 mx-auto text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, dicta rerum maiores explicabo similique in unde totam ipsum ducimus labore et voluptatem, possimus earum voluptatum?</p>
               </div>
               <div className="flex flex-wrap -m-4">
                  {
                     chefs.map((item, index) => (
                        <div key={index} className="w-full md:w-6/12 lg:w-4/12 p-4 mb-10">
                           <div className="relative">
                              <div className="rounded-2xl overflow-hidden">
                                 <Image src={item.image} width={100} height={100} alt='' className='w-full h-full hover:scale-110 duration-500' />
                              </div>
                              <div className="absolute left-0 right-0 -bottom-8 px-4">
                                 <div className=" bg-white text-center shadow-md rounded-2xl p-4">
                                    <p className='text-2xl text-black font-bold mb-1'>{item.name}</p>
                                    <p className='text-lg text-[#195A00] leading-6'>{item.designation}</p>
                                 </div>
                              </div>
                           </div>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default AboutPage