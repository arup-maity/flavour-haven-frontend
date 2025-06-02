import Banner from "@/components/theme/home-page/banner/Banner";
import MiniAbout from "@/components/theme/home-page/MiniAbout";
import OnlineDelivery from "@/components/theme/home-page/OnlineDelivery";
import FoodMenu from "@/components/theme/home-page/FoodMenu";
import Table from "@/components/theme/home-page/table-book";

export default function Home() {
   return (
      <>
         {/* banner */}
         <div className="w-full pb-10">
            <Banner />
         </div>
         {/* mini about */}
         <div className="w-full theme-container !pb-[80px]">
            <MiniAbout />
         </div>
         {/* menu list */}
         <div className="container-webx">
            <div className="w-full text-center relative">
               <h4 className="text-2xl md:text-4xl text-[#333333] font-bold mb-3">Our Food Menu</h4>
               <p className="w-full lg:w-6/12 text-base text-[#5d5d5d] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</p>
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
