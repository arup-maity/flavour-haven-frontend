"use client";
import React from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = ({ data }) => {
   const settings = {
      dots: true,
      //  fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
   };

   return (
      <div className="w-full">
         <Slider {...settings} className="">
            {data?.map((item, index) => {
               return (
                  <div key={index} className="w-full">
                     <div className="flex flex-nowrap items-center">
                        <div className=" w-1/2">
                           <p className="text-[#000] text-xl font-semibold uppercase">{item?.heading}</p>
                           <h6 className={`text-[#A80000] text-6xl font-normal mb-6`}>{item?.title}</h6>
                           <p className="text-[#000] text-base font-medium">{item?.text}</p>
                           <div className="w-[90%] mx-auto mt-16">
                              <span className="block w-full h-0.5 bg-[#D9D9D9]"></span>
                              <div className="flex flex-nowrap items-center justify-center">
                                 <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="334" height="156" viewBox="0 0 334 156" fill="none">
                                       <g filter="url(#filter0_d_643_70938)">
                                          <path
                                             d="M271.481 35H54C49.5817 35 46 38.5817 46 43V83C46 87.4183 49.5817 91 54 91H246.203C248.947 91 251.5 89.5935 252.966 87.2737L278.244 47.2737C281.61 41.9468 277.782 35 271.481 35Z"
                                             fill="#A80000"
                                          />
                                       </g>
                                       <defs>
                                          <filter id="filter0_d_643_70938" x="0" y="0" width="333.494" height="156" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                             <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                             <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                             <feOffset dx="4" dy="15" />
                                             <feGaussianBlur stdDeviation="25" />
                                             <feComposite in2="hardAlpha" operator="out" />
                                             <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                             <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_643_70938" />
                                             <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_643_70938" result="shape" />
                                          </filter>
                                       </defs>
                                    </svg>
                                 </div>
                                 <div className="">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="284" height="106" viewBox="0 0 284 106" fill="none">
                                       <g filter="url(#filter0_d_643_70941)">
                                          <path
                                             d="M29.5191 66L247 66C251.418 66 255 62.4183 255 58L255 18C255 13.5817 251.418 10 247 10L54.7967 9.99998C52.0526 9.99998 49.4999 11.4065 48.0339 13.7263L22.7563 53.7263C19.39 59.0531 23.2177 66 29.5191 66Z"
                                             fill="#545454"
                                          />
                                       </g>
                                       <defs>
                                          <filter id="filter0_d_643_70941" x="0.505859" y="0" width="283.494" height="106" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                             <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                             <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                             <feOffset dx="4" dy="15" />
                                             <feGaussianBlur stdDeviation="12.5" />
                                             <feComposite in2="hardAlpha" operator="out" />
                                             <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                             <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_643_70941" />
                                             <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_643_70941" result="shape" />
                                          </filter>
                                       </defs>
                                    </svg>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className="w-1/2">
                           <Image src={item?.image} width="750" height="750" alt="" className="w-full h-full object-contain" />
                        </div>
                     </div>
                  </div>
               );
            })}
         </Slider>
      </div>
   );
};

export default Banner;
