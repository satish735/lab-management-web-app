"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { FaPhone, FaMicroscope } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
const items = [
  {
    content: (
      <div className="w-100 h-100 midbox-inner">
        <div className="row  align-items-center">
          <div className="col-12 col-xl-7">
            <div className="slide-content">
              <h2 className="slide-title">
                India&apos;s leading doorstep diagnostic service provider
              </h2>
              <ul>
                <li>
                  <h2>NABL</h2>
                  <h5>Certified Labs</h5>
                </li>
                <li>
                  <h2>4.8/5</h2>
                  <h5>Google Rating</h5>
                </li>
                <li>
                  <h2>10 Lakh+</h2>
                  <h5>Customer every Year</h5>
                </li>
              </ul>
              <a className="search-div" href="/home-collection">
                <FaSearch
                  size={20}
                
                  className="search-icon"
                />
                <span className="search-message" >
                  Search for Test or Packages
                </span>
                <div style={{ zIndex: "3" }} className="search-icon-div">
                  Search
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
    key: 1,
    className: "slide-item-1",
  },
  {
    content: (
      <div className="w-100 h-100 midbox-inner">
        <div className="row  align-items-center">
          <div className="col-12 col-xl-7">
            <div className="slide-content">
              <h2 className="slide-title">
                Clear, Relatable, And Informative Testing Results!
              </h2>
              <p className="slide-desc">
                We are continually harnessing our medical expertise to build
                best test offering while investing in technology to transform
                the delivery of health care.
              </p>
              <div className="slide-button">
                <a
                  type="button"
                  className="btn  call-button"
                  href="tel:+919166125555"
                >
                  <FaPhone size={18} className="call-icon" />
                  Call Now
                </a>
                <a type="button" className="btn  search-button" href="/home-collection">
                  <FaMicroscope size={18} className="search-icon" />
                  Search for Test
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    key: 2,
    className: "slide-item-2",
  },
];

const MainBannerCrousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item,index) => {
    return (
      <CarouselItem
        className={`slide-item ${item?.className}`}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        {item?.content}
      </CarouselItem>
    );
  });
  return (
   <div className="main-banner-part-1 w-100">
     <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      fade={true}
      slide={true}
      //   {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
   </div>
  );
};

export default MainBannerCrousel;
