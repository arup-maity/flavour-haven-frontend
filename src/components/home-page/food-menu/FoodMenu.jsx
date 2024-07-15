"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

let tabs = [
  { id: "Brackfast", label: "Brackfast" },
  { id: "Lunch", label: "Lunch" },
  { id: "business", label: "Dinner" },
  { id: "Dinner", label: "Dessert" },
  { id: "Drink", label: "Drink" },
  { id: "Snack", label: "Snack" }
];

const menuItems = [
  {
    image: "/img-1.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-2.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-3.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-4.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-5.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-6.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-7.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  },
  {
    image: "/img-8.png",
    title: "Alder Grilled Chinook Salmon",
    description: "Toasted French bread topped with romano, cheddar",
    excerpt: "500 Cal",
    price: 32
  }
];

const FoodMenu = () => {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="w-full py-11">
      <div className="flex justify-center space-x-1 border-b-2 border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? "text-[#195A00]" : "hover:text-[#195A00]"} relative  px-3 py-2 text-base font-medium text-gray-500 transition`}
            style={{
              WebkitTapHighlightColor: "transparent"
            }}>
            {activeTab === tab.id && (
              <motion.span layoutId="bubble" className="absolute w-full left-0 -bottom-[2px] z-10 border-b-2 border-gray-800" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="">
        <motion.div animate={{ x: 100 }} transition={{ delay: 1 }} />
        <div className="flex flex-nowrap -mx-4 mt-5">
          <div className="w-6/12 p-4">
            <ul className="w-full space-y-4">
              {menuItems &&
                menuItems?.slice(0, 4)?.map((item, index) => {
                  return (
                    <li key={index} className="w-full flex space-x-2 items-center">
                      <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                        <Image src={item?.image} width={80} height={80} className="w-full h-full" />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-nowrap justify-between">
                          <h2 className="text-2xl font-medium">Alder Grilled Chinook Salmon</h2>
                          <p className="text-2xl text-[#195A00] font-medium">$ 32</p>
                        </div>
                        <p className="text-base text-gray-400">Toasted French bread topped with romano, cheddar</p>
                        <span className="text-sm text-gray-400">560 CAL</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="w-6/12 p-4">
            <ul className="w-full space-y-4">
              {menuItems &&
                menuItems?.slice(4, 8)?.map((item, index) => {
                  return (
                    <li key={index} className="w-full flex space-x-2 items-center">
                      <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                        <Image src={item?.image} width={80} height={80} className="w-full h-full" />
                      </div>
                      <div className="w-full">
                        <div className="flex flex-nowrap justify-between">
                          <h2 className="text-2xl font-medium">Alder Grilled Chinook Salmon</h2>
                          <p className="text-2xl text-[#195A00] font-medium">$ 32</p>
                        </div>
                        <p className="text-base text-gray-400">Toasted French bread topped with romano, cheddar</p>
                        <span className="text-sm text-gray-400">560 CAL</span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="w-full text-center mt-5">
          <Link href="" className="text-base border border-[#195A00] py-2 px-4">
            View menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
