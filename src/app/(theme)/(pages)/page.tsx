import Banner from "@/components/theme/home-page/banner/Banner";
import MiniAbout from "@/components/theme/home-page/MiniAbout";
import OnlineDelivery from "@/components/theme/home-page/OnlineDelivery";
import FoodMenu from "@/components/theme/home-page/FoodMenu";
import Table from "@/components/theme/home-page/table-book";
import SecondBanner from "@/components/theme/home-page/banner/second-banner";

export default function Home() {
   return (
      <>
         {/* banner */}
         <div className="w-full pb-10">
            {/* <Banner /> */}
            <SecondBanner />
         </div>
         {/* mini about */}
         <div className="w-full theme-container !py-20">
            <MiniAbout />
         </div>
         {/* menu list */}
         <div className="container-webx !py-10">
            <div className="w-full text-center relative mb-8">
               <h4 className="text-2xl md:text-3xl text-[#333333] font-bold mb-3 postbook">Our Food Menu</h4>
               <p className="w-full lg:w-7/12 text-base text-[#5d5d5d] mx-auto">
                  Explore our diverse menu featuring flavorful appetizers, hearty mains, and indulgent desserts—crafted with fresh ingredients and authentic taste.
               </p>
            </div>
            <div className="w-full">
               <FoodMenu />
            </div>
         </div>
         {/* online food delivery */}
         <div className="w-full theme-container !py-10">
            <div className="w-full relative">
               <h4 className=" text-2xl text-[#333333] font-bold mb-3">Restaurants with online food delivary</h4>
            </div>
            <OnlineDelivery />
         </div>
         {/* table booking */}
         {/* <Table /> */}
      </>
   );
}
