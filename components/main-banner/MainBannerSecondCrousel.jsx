"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const icons = [
  "/assets/icons/awards/1.webp",
  "/assets/icons/awards/2.webp",
  "/assets/icons/awards/awardlogo1.png",
  // "/assets/icons/awards/4.webp",
  "/assets/icons/awards/awardlogo2.png",
  "/assets/icons/awards/awardlogo3.png",
];

const MainBannerSecondCrousel = ({
  slidesToShow_lg = 4,
  slidesToShow_md = 3,
  slidesToShow_sm = 2,
}) => {
  const settings = {
    pauseOnHover: true,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow_lg,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow_md,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesToShow_sm,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <div className="achivement-midbox-inner">
      <Slider {...settings}>
        {icons.map((itemIcon, index) => {
          return (
            <div className="p-2" key={index}>
              {(itemIcon === "/assets/icons/awards/4.webp") ?

                <img src={itemIcon} alt={itemIcon} className="m-auto" style={{ height: '90px', width: '60px' }} />
                :
                <img src={itemIcon} alt={itemIcon} className="m-auto" style={{ height: '90px', width: '90px' }} />


              }
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MainBannerSecondCrousel;
