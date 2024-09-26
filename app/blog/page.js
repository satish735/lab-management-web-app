"use client";
import React from "react";
import apiRequest from "../../utils/apiRequest";
import "./blog.css"
import Banner from "@/components/customdesign/Banner.jsx";
import Card from "@/components/customdesign/Card.jsx";
import useAPI from "@/hooks/useAPI";
import UserLayout from '@/layouts/UserLayout'
import LoaderGeneral from '@/components/loaders/LoaderGeneral';
import transformErrorDefault from "@/utils/transformErrorDefault";

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


    return (
        <>


            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    blogsResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(blogsResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />
          {!blogsResponse?.fetching && <div className="my-1" style={{ overflow: "hidden" }} >

                <Banner
                    heading="Our Blog"
                />


                <div className="row     mt-2 midbox-inner">

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
            </div>}

        </>
    );
};
export default Blog;
