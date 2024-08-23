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

                {/* <div className="bg-white rounded shadow card_view  p-2" style={{ height: "100%", position: "relative" }} >
                    <img className="img rounded" src={"/assets/images/blog1.jpg"} alt="post image" loading="lazy" />
                    <div className="px-3 py-3 my-3 blog_text bg-white rounded" style={{
                        height: "100px", position: "absolute",
                        bottom: "10%", width: "80%", left: "10%"
                    }}>
                        <h5
                            className="py-2 blog_heading_content">
                            fhfgh
                        </h5>

                        <a style={{ display: "block", textDecoration: "none" }} href={"#"} className="plus_icon_border m-3 py-3"  >
                            <span className="plus_icon my-2">
                                <span>+</span>
                            </span>
                            <span className="px-2 plus_icon_txt">
                                View Brochure
                            </span>
                        </a>

                    </div>
                </div> */}

                {getlistingdata?.map((item, index) => <div className=" col-md-4 col-sm-6 col-12 my-2" key={index}>

                    <Card
                        title={item?.name}
                        imgsrc={process.env.NEXT_PUBLIC_BUCKET_URL + item?.backgroundLink}
                        buttontext="View Brochure"
                    // redirectpath={`/blog/${index}`}
                    />


                </div>)}

            </div>
        </div>
    );
};
export default Blog;
