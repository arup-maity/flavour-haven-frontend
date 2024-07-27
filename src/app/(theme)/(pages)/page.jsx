import Banner from "@/components/theme/home-page/Banner";
import FoodCategories from "@/components/theme/home-page/food-categories/FoodCategories";
import FoodMenu from "@/components/theme/home-page/food-menu/FoodMenu";
import MiniAbout from "@/components/theme/home-page/MiniAbout";
import OnlineDelivery from "@/components/theme/home-page/online-delivery/OnlineDelivery";
import Table from "@/components/theme/home-page/table-book";

export default function Home() {
   const bannerList = [
      {
         heading: "Design by persian design",
         title: "steak with tomato",
         text: "Salisbury Steak is made with ground beef that has been shaped into patties, while Swiss Steak is made with actual steak. For Swiss Steak, the beef is rolled or pounded and then braised in a",
         image: "/pic1.png",
         color: "#A80000"
      },
      {
         heading: "Design by persian design",
         title: "chicken salad",
         text: "Salisbury Steak is made with ground beef that has been shaped into patties, while Swiss Steak is made with actual steak. For Swiss Steak, the beef is rolled or pounded and then braised in a",
         image: "/pic2.png",
         color: "#FFA800"
      },
      {
         heading: "Design by persian design",
         title: "salmon salad",
         text: "Salisbury Steak is made with ground beef that has been shaped into patties, while Swiss Steak is made with actual steak. For Swiss Steak, the beef is rolled or pounded and then braised in a",
         image: "/pic3.png",
         color: "#00A839"
      },
      {
         heading: "Design by persian design",
         title: "steak with potato",
         text: "Salisbury Steak is made with ground beef that has been shaped into patties, while Swiss Steak is made with actual steak. For Swiss Steak, the beef is rolled or pounded and then braised in a",
         image: "/pic4.png",
         color: "#FF2B2B"
      }
   ];
   return (
      <>
         {/* banner */}
         <div className="bg-[#FFFAF0]">
            <div className="container-webx w-full">
               <Banner data={bannerList} />
            </div>
         </div>
         {/* mini about */}
         <div className="w-full theme-container !py-[120px]">
            <MiniAbout />
         </div>
         {/* food category slider */}
         {/* <div className="container-webx">
            <div className="w-full relative">
               <h4 className=" text-2xl text-[#333333] font-bold mb-3">Our Food Categories</h4>
            </div>
            <div className="border-b-[1px] border-gray-300">
               <FoodCategories />
            </div>
         </div> */}
         {/* menu list */}
         <div className="container-webx">
            <div className="w-full text-center relative">
               <h4 className=" text-4xl text-[#333333] font-bold mb-3">Our Food Menu</h4>
               <p className=" w-[40%] text-sm text-[#5d5d5d] mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed pharetra dictum neque massa congue</p>
            </div>
            <div className="border-b-[1px] border-gray-300">
               <FoodMenu />
            </div>
         </div>
         {/* online food delivery */}
         <div className="w-full container-webx !py-10">
            <div className="w-full relative">
               <h4 className=" text-2xl text-[#333333] font-bold mb-3">Restaurants with online food delivary</h4>
            </div>
            <div className="w-full border-b-[1px] border-gray-300">
               <OnlineDelivery />
            </div>
         </div>
         {/* table booking */}
         <Table />
      </>
   );
}
