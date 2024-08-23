"use client";
import React from "react";
import apiRequest from "../../utils/apiRequest";
import "./blog.css"
import Banner from "@/components/customdesign/Banner.jsx";
import Card from "@/components/customdesign/Card.jsx";
import useAPI from "@/hooks/useAPI";
const Blog = ({ params: { id } }) => {




    const [blogsResponse, blogsHandler] = useAPI(
        {
            url: "/blogs/list",
            method: "get",
            sendImmediately: true,
            params: {
                // sortColumn: sort?.column,
                // sortDirection: sort?.direction,
                // pageNo: pageNo,
                // pageSize: pageSize,
                // searchQuery: searchValue,
            },
        },
        (e) => {
            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting Blogs!",
                e
            ));
            return e
        }
    );

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
        <div className="my-1" style={{ overflow: "hidden" }} >

            <Banner
                heading="Our Blog"
            />


            <div className="row px-3 m-2 mt-2 midbox-inner">

                {blogsResponse?.data?.map((item, index) => <div className=" col-md-4 col-sm-6 col-12 my-2" key={index}>

                    <Card
                        title={item?.title}
                        description={item?.description}
                        imgsrc={process.env.NEXT_PUBLIC_BUCKET_URL + item?.image}
                        buttontext="Read More"
                        redirectpath={`/blog/view?id=${item?._id}`}
                        authername={item?.author}
                        createddate={item?.createddate ?? ""}
                    />


                </div>)}

            </div>
        </div>
    );
};
export default Blog;
