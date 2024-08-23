"use client";
import React from "react";
import "@/app/blog/blog.css"
import Banner from "@/components/customdesign/Banner.jsx";
import Card from "@/components/customdesign/Card.jsx";
import useAPI from "@/hooks/useAPI";
import { useState } from "react";
const Blog = ({ params: { id } }) => {

    const blog = [
        {
            title: "Common Medicine Use With Caution",
        },

    ]

    const [getlistingdata, setlistingdata] = useState([]);
    const [healthbulletinResponse, healthbulletinHandler] = useAPI(
        {
            url: "/healthbulletin/list",
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
            setlistingdata(e?.data ?? []);

        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting health bulletin!",
                e
            ));
            return e
        }
    );
    return (
        <div className="my-1" style={{ overflow: "hidden" }} >

            <Banner
                heading="Health Bulletin"
            />


            <div className="row px-3 m-2 mt-2 midbox-inner">

                {getlistingdata?.map((item, index) => <div className=" col-md-4 col-sm-6 col-12 my-2" key={index}>

                    <Card
                        title={item?.name}
                        imgsrc="/assets/images/blog1.jpg"
                        buttontext="View Brochure"
                    // redirectpath={`/blog/${index}`}
                    />


                </div>)}

            </div>
        </div>
    );
};
export default Blog;
