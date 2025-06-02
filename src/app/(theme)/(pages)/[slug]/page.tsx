import AddCart from "@/components/theme/single-food/AddCart";
import DetailsSection from "@/components/theme/single-food/details-section";
import { axiosInstance } from "@/config/axios";
import Image from "next/image";
import { IoStarHalf } from "react-icons/io5";
import { PiCurrencyInr } from "react-icons/pi";


async function getDishDetails(slug: string) {
   try {
      const res = await axiosInstance.get(`/dishes/dish-details/${slug}`);
      if (res.data.success) {
         return res.data.dish
      }
   } catch (error) {
      // console.log(error)
      console.log(error)
   }
}

const SingleFoodPage = async ({ params }: { params: { slug: string } }) => {
   const dish = await getDishDetails(params.slug)
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
      <div className="pt-20">
         {/* <div className="bg-[url('/banner.png')] h-52 w-full">
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
         </div> */}
         <div className="theme-container">
            <div className="flex flex-wrap -mx-4 mb-10">
               <div className="w-full lg:w-5/12 relative h-full p-4">
                  <div className=" w-full h-full flex flex-col md:flex-row gap-4">
                     <ul className="hidden md:block w-[100px] h-[500px] overflow-hidden space-y-4">
                        {/* <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                                 alt=""
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
                                 alt=""
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
                                 alt=""
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
                                 alt=""
                              />
                           </div>
                        </li> */}
                     </ul>
                     <div className="w-full aspect-[500/500]">
                        <Image
                           src={dish?.thumbnail ? process.env.NEXT_PUBLIC_BUCKET_URL + dish?.thumbnail : ''}
                           width={500}
                           height={500}
                           className="w-full h-full object-cover"
                           alt=""
                        />
                     </div>
                     <ul className="flex flex-row md:hidden overflow-hidden space-x-4">
                        <li>
                           <div className="w-full aspect-square rounded-md overflow-hidden">
                              <Image
                                 src={`/img-12.png`}
                                 width={150}
                                 height={15}
                                 className="w-full h-full object-cover"
                                 alt=""
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
                                 alt=""
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
                                 alt=""
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
                                 alt=""
                              />
                           </div>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className="w-full lg:w-7/12 relative h-full space-y-4 p-4">
                  <div className="space-y-4">
                     <h1 className="text-3xl font-normal">{dish?.title}</h1>
                     <p className="text-base opacity-60">{dish?.shortDescription}</p>
                     <div className="flex items-center gap-1">
                        <PiCurrencyInr size={22} />
                        <span className="text-2xl font-semibold leading-none">{dish?.price}</span>
                     </div>
                     <ul className="flex flex-nowrap space-x-1 items-center">
                        <li><IoStarHalf color="#FF9F0D" /></li>
                        <li>4.5</li>
                        <li className="ps-2">22 Reviews</li>
                     </ul>
                     <AddCart foodDetails={dish} />
                  </div>
               </div>
            </div>
            <DetailsSection description={dish?.description} />
            <hr className="my-4" />
            {/* <div className="mt-6">
               <div className="text-2xl font-medium">More dishes</div>
               <div className="w-full flex flex-wrap -mx-3">
                  {foodList &&
                     foodList?.slice(0, 6).map((card, index) => {
                        return (
                           <div key={index} className="w-full md:w-6/12 lg:w-4/12 p-3 relative h-full">
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
            </div> */}
         </div>
      </div>
   );
};

export default SingleFoodPage;
