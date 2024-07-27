'use client'
import Image from "next/image";
import { useState } from "react";
import { IoStarHalf } from "react-icons/io5";

const SingleFoodPage = () => {
   const [count, setCount] = useState(1)
   const foodList = [
      {
         image: "img-9.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-10.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-11.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-12.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-13.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-9.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-10.png",
         title: "Roll Xpress",
         description: "Pizzas, Italian, Pastas, Desserts",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-11.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-12.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-13.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-9.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-10.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-11.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-12.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-13.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-9.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-10.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-11.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-12.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      },
      {
         image: "img-13.png",
         title: "Roll Xpress",
         description: "",
         rating: 4.2,
         time: "25-30 mins"
      }
   ];
   return (
      <div className="">
         <div className="bg-[url('/banner.png')] h-52 w-full">
            <div className="container-webx text-center w-full flex h-full items-center justify-center">
               <div className="">
                  <h4 className="text-white text-4xl font-semibold">
                     Chicken Fry Dish
                  </h4>
                  <ul className="inline-flex space-x-2 text-white">
                     <li>Home</li>
                     <li>/</li>
                     <li>Food Shop Chicken Fry Recipe</li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="container-webx">
            <div className="flex flex-wrap -mx-4">
               <div className="w-5/12 relative h-full p-4">
                  <div className=" w-full h-full flex flex-nowrap gap-4">
                     <ul className="w-[100px] h-[500px] overflow-hidden space-y-4">
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                              />
                           </div>
                        </li>
                     </ul>
                     <div className="w-full aspect-[500/500]">
                        <Image
                           src={`/img-12.png`}
                           width={500}
                           height={500}
                           className="w-full h-full object-cover"
                        />
                     </div>
                  </div>
               </div>
               <div className="w-7/12 relative h-full space-y-4 p-4">
                  <div className="space-y-4">
                     <h4 className="text-4xl font-semibold">Chicken Fry Recipe</h4>
                     <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                        quasi mollitia delectus illo amet molestiae praesentium, cumque
                        natus, est modi voluptas, maxime placeat in? Tenetur.
                     </p>
                     <h6 className="space-x-2">
                        <span className="text-2xl font-semibold">$99</span>
                     </h6>
                     <ul className="flex flex-nowrap space-x-1 items-center">
                        <li><IoStarHalf color="#FF9F0D" /></li>
                        <li>4.5</li>
                        <li className="ps-2">22 Reviews</li>
                     </ul>
                     <ul className="flex flex-nowrap space-x-5">
                        <li>
                           <div className="border h-9 bg-[#FF9F0D] text-white inline-block rounded">
                              <button className="w-8 h-8 text-2xl">-</button>
                              <span className="w-8 h-8 inline-flex items-center justify-center">
                                 1
                              </span>
                              <button className="w-8 h-8">+</button>
                           </div>
                        </li>
                        <li className="inline-block">
                           <button className="bg-[#FF9F0D] h-9 text-white px-5 rounded">
                              Add to Cart
                           </button>
                        </li>
                     </ul>
                     <div className="">
                        <h4>Extras</h4>
                        {/* <div className="flex flex-col space-y-2">
                           <div className="flex items-center justify-between">
                              <div className="flex flex-nowrap items-center space-x-4">
                                 <div className="w-5 h-5 border border-green-700 flex justify-center items-center rounded">
                                    <span className="inline-block w-1  h-1 bg-green-500" />
                                 </div>
                                 <p>Chicken Tikka Sub</p>
                                 <p>Pure Vag</p>
                              </div>
                              <div className="">
                                 <button className="border rounded py-1 px-4 text-sm">
                                    ADD
                                 </button>
                              </div>
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="flex flex-nowrap items-center space-x-4">
                                 <div className="w-5 h-5 border border-red-700 flex justify-center items-center rounded">
                                    <span className="inline-block w-1  h-1 bg-red-500" />
                                 </div>
                                 <div className="flex space-x-4">
                                    <p>Chicken Tikka Sub</p>
                                    <p>Pure Vag</p>
                                 </div>
                              </div>
                              <div className="">
                                 <button className="border rounded py-1 px-4 text-sm">
                                    ADD
                                 </button>
                              </div>
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="flex flex-nowrap items-center space-x-4">
                                 <div className="w-5 h-5 border border-blue-600 flex justify-center items-center rounded">
                                    <span className="inline-block w-1  h-1 bg-blue-600" />
                                 </div>
                                 <div className="flex space-x-4">
                                    <p>Chicken Tikka Sub</p>
                                    <p>Pure Vag</p>
                                 </div>
                              </div>
                              <div className="">
                                 <button className="border rounded py-1 px-4 text-sm">
                                    ADD
                                 </button>
                              </div>
                           </div>
                        </div> */}
                        <div className="w-6/12 space-y-2">
                           <div className="flex items-center justify-between">
                              <div className="text-xl">Drinks</div>
                              <div className="text-base text-[#FF9F0D] border border-[#FF9F0D] rounded py-0.5 px-4">Add</div>
                           </div>
                           <div className="flex items-center justify-between">
                              <div className="text-xl">Dessert</div>
                              <div className="text-base text-[#FF9F0D] border border-[#FF9F0D] rounded py-0.5 px-4">Add</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <hr className="my-4" />
            <div className="mt-6">
               <div className="">More dishes from this restaurant</div>
               <div className="w-full flex flex-wrap -mx-3">
                  {foodList &&
                     foodList?.slice(0, 6).map((card, index) => {
                        return (
                           <div key={index} className="w-4/12 p-3 relative h-full">
                              <div className="block relative h-full rounded-lg overflow-hidden">
                                 <div className="relative w-full aspect-[250/150]">
                                    <Image src={`/${card?.image}`} width={250} height={100} alt="" className="w-full h-full object-cover" />
                                 </div>
                                 <div className="absolute bottom-0 right-0 left-0 h-20 grid content-end bg-gradient-to-b  from-[#1b1e2411] to-[#0c0c0cf0] z-10 p-3">
                                    <p className="text-[22px] font-bold text-white uppercase">60% off upto $120</p>
                                 </div>
                              </div>
                              <div className="">
                                 <h3 className="text-lg font-medium line-clamp-1">{card?.title}</h3>
                                 <ul className="flex space-x-2">
                                    <li className="flex flex-nowrap items-center gap-1 text-base font-medium"><IoStarHalf color="#FF9F0D" />{card?.rating} 55 ratings</li>
                                    <li className="text-base font-medium">{card?.time}</li>
                                 </ul>
                                 <p className="text-sm text-gray-400 line-clamp-1">{card?.description}</p>
                              </div>
                           </div>
                        );
                     })}
               </div>
            </div>
         </div>
      </div>
   );
};

export default SingleFoodPage;
