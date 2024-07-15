"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FoodCategories = () => {
  const foodCategories = [
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    },
    {
      image: "pic63.png",
      title: "Pizza"
    }
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2
  };
  return (
    <div>
      <div className="">
        <Slider {...settings} className="">
          {foodCategories &&
            foodCategories?.map((item, index) => {
              return (
                <div key={index} className=" w-full text-center">
                  <Link href={`/food-categories/${item.title}`}>
                    <div className="w-full flex justify-center">
                      <Image src={`/${item?.image}`} width={100} height={100} alt="" className="w-28 h-28 rounded-full" />
                    </div>
                    <p>{item?.title}</p>
                  </Link>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default FoodCategories;
