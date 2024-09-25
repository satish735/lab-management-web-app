'use client'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@/styles/common-card-designs/card_designs.css'

import FullBodyCheckupCard from "./type-of-card-design/FullBodyCheckupCard";
import PopularTestCard from "./type-of-card-design/PopularTestCard";
import TestsCard from "./type-of-card-design/TestsCard";
// let package_item = [{ img: '/assets/images/temp/img1.jpg', package_name: 'Diabities Suraksha Package*', no_of_test_included: '12', total_price_without_discount: '3300', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img2.jpg', package_name: 'Cardiac Suraksha Health Package*', no_of_test_included: '22', total_price_without_discount: '2300', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img3.jpg', package_name: 'Advance Heart Health Package*', no_of_test_included: '9', total_price_without_discount: '3900', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img4.jpg', package_name: 'Advance Heart Health Package*', no_of_test_included: '9', total_price_without_discount: '3900', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img1.jpg', package_name: 'Advance Heart Health Package*', no_of_test_included: '9', total_price_without_discount: '3900', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img2.jpg', package_name: 'Advance Heart Health Package*', no_of_test_included: '9', total_price_without_discount: '3900', final_price_with_discount: '2000', discount: '20%' },
// { img: '/assets/images/temp/img3.jpg', package_name: 'Advance Heart Health Package*', no_of_test_included: '9', total_price_without_discount: '3900', final_price_with_discount: '2000', discount: '20%' }
// ]


let popular_test = [
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }
]

const CarousalSlider = ({
    DataList = [],
    slidesToScroll = 1,
    slidesToShow_lg = 4,
    slidesToShow_md = 2,
    slidesToShow_sm = 1,
    sliderFor,location

}) => {
    const settings = {
        dots: true,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 6000,
        slidesToShow: slidesToShow_lg, // Number of slides to show at a time
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Tablet breakpoint
                settings: {
                    slidesToShow: slidesToShow_md,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: true
                }
            },
            {
                breakpoint: 600, // Mobile breakpoint
                settings: {
                    slidesToShow: slidesToShow_sm,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]

    };

     

    return (
        <>
            <Slider {...settings}  >

                {
                    sliderFor == 'packages' &&

                    ((DataList ?? []).map((listing,index) => {
                        return <FullBodyCheckupCard listing={listing} key={index} location={location?.selectedLocation} />
                    }))
                }


                {
                    sliderFor == 'popular test' &&

                    ((DataList ?? []).map((listing,index) => {
                        return <PopularTestCard listing={listing} key={index}  location={location?.selectedLocation} />
                    }))
                }
                {
                    sliderFor == 'tests-by-body-part' &&

                    ((DataList ?? []).map((listing,index) => {
                        return <TestsCard listing={listing} key={index} type={'body-part'} />
                    }))
                }

{
                    sliderFor == 'tests-by-medical-condition' &&

                    ((DataList ?? []).map((listing,index) => {
                        return <TestsCard listing={listing} key={index}  type={'medical-condition'} />
                    }))
                }
                

            </Slider>
        </>
    );





}

export default CarousalSlider


const Carditems = [
    { img: '/assets/images/logo.jpg', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo.jpg', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    { img: '/assets/images/logo', name: 'Slide 1', review: 'Slide 1 review' },
    { img: '/assets/images/login', name: 'Slide 2', review: 'Slide 2 review' },
    { img: '/assets/images/logo', name: 'Slide 3', review: 'Slide 3 review' },
    // Add more items as needed
];