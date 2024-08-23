"use client";
import React from "react";
import apiRequest from "../../utils/apiRequest";
import "./blog.css"
import Banner from "@/components/customdesign/Banner.jsx";
import Card from "@/components/customdesign/Card.jsx";
const Blog = ({ params: { id } }) => {

    const blog = [
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen  Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
    ]
    return (
        <div className="my-1" style={{overflow:"hidden"}} >

            <Banner
                heading="Our Blog"
            />


            <div className="row px-3 m-2 mt-2 midbox-inner">

                {blog?.map((item, index) => <div className=" col-md-4 col-sm-6 col-12 my-2" key={index}>

                    <Card
                        title={item?.title}
                        description={item?.description}
                        imgsrc="/assets/images/blog1.jpg"
                        buttontext="Read More"
                        redirectpath={`/blog/${index}`}
                        authername={item?.authername}
                        createddate={item?.createddate}
                    />


                </div>)}

            </div>
        </div>
    );
};
export default Blog;
