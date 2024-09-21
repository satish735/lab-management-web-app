"use client";
import "../blog.css"
import React, { useEffect, useState } from 'react'
import useAPI from "@/hooks/useAPI";
import '@/components/home-component/frequently-asked-question/question-ans.css'
import LoaderGeneral from "@/components/loaders/LoaderGeneral";
import { useRouter } from "next/navigation";
const Blog = ({ searchParams }) => {

    const [getdata, setdata] = useState({})
    const router = useRouter();

    const [blogResponse, blogHandler] = useAPI(
        {
            url: `/blogs/${searchParams?.id}`,
            method: "get",
            // sendImmediately: true
        },
        (e) => {
            setdata(e)
            return e
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating blog!",
                    e
                )
            );
            return e;
        }
    );


    useEffect(() => {

        if (searchParams?.id) {
            blogHandler({
                params: {
                    id: searchParams?.id
                }
            })
        }

    }, [searchParams])


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
            console.log(e)
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

    const populerblog = [
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
        }

    ]



    return (

        <>
            <LoaderGeneral
                noContentMessage="Job Posts not found"
                state={
                    blogResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(blogResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />


            {
                blogResponse?.data &&

                <div >
                    <div style={{ backgroundColor: "#f1f6ee", paddingTop: "-20px" }}>
                        <div className="row midbox-inner p-0 " style={{ margin: "0 auto" }} >


                            <div className="col-md-6 col-sm-6 col-12 p-3 ">
                                <div className="m-3 pt-3" >
                                    <h2 style={{ fontWeight: "500", fontSize: "2.1rem" }}> {getdata?.title ?? ""}</h2>
                                    <span>Medically Reviewed by:</span>
                                    <span style={{ color: "#21cdad" }}> {getdata?.author ?? ""}</span>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-12 p-3 ">
                                <div className="m-3" >
                                    <img className=" rounded pt-3" style={{ height: "270px", width: "90%" }}
                                        src={process.env.NEXT_PUBLIC_BUCKET_URL + getdata?.image} alt="post image" loading="lazy" />
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="bg-white p-4 row ">
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="small w-100" >
                                {getdata?.description ?? ""}
                            </div>

                            <div className="ckeditor-content-div" dangerouslySetInnerHTML={{ __html: getdata?.ckdescription }} >
                                {/* {getdata?.ckdescription ?? ""} */}
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-12" >
                            <div className="mx-2" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', borderRadius: '10px', padding: '20px 10px 20px 20px' }}>
                                <h2 className="mb-3" style={{ color: '#003747', fontWeight: "800", fontSize: "1.3rem" }}>Popular Blogs</h2>

                                {blogsResponse?.data?.map((item, index) =>
                                    <div onClick={() => { router.push(`/blog/view?id=${item?._id}`) }} className="row py-1 popular-blog-item" key={index} style={{ cursor: 'pointer' }}>


                                        <div className="col-3 mt-2">
                                            <img className=" rounded " style={{ height: "60px", width: "100%" }} src={process.env.NEXT_PUBLIC_BUCKET_URL + item?.image} alt="post image" loading="lazy" />
                                        </div>

                                        <div className="col-9">


                                            <h5 style={{ fontSize: "1rem", color: '#003747', fontWeight: '700' }} className="pt-2 blog_heading_content text-truncate">{item?.title}</h5>
                                            <span className="" style={{
                                                fontSize: "0.8rem",
                                                color: "#828599", marginRight: "8px", fontWeight: '500'
                                            }} >{item?.author}</span>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* <div className="row midbox-inner" >
                <div className="col-md-9  col-sm-9 col-12" >

                    <div className="py-3" >
                        <h2 style={{
                            color: '#002678 ',
                            fontSize: ' 40px',
                            textAlign: 'center',
                            margin: '0 20%',
                            padding: '0 0 50px',
                            fontFamily: 'Inter Medium'
                        }}>
                            Frequently Asked Questions

                        </h2>
                        <div className='container-fluid'>
                            <div style={{ margin: '0 auto' }} className='test_blog'>

                                {
                                    (question ?? []).map((item, index) => {
                                        return <FrequentlyAskQuestion item={item} key={index} />
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-3  col-sm-3 col-12 p-3" >
                   

                </div>

            </div> */}


                </div>
            }

        </>

    );
};
export default Blog;



const FrequentlyAskQuestion = ({ item }) => {
    const [showHide, setShowHide] = useState(false)

    return (
        <div className='ques-box-before w-100' onClick={() => {
            setShowHide(!showHide)
        }}>
            <h2 className='question d-flex justify-content-between'>
                <span>
                    {item?.question}

                </span>

                <span style={{ fontSize: '30px', fontWeight: '600' }}>+</span>

            </h2>
            <div>
                {
                    showHide && <>
                        <hr />

                        <div className='answer'  >

                            {item?.answer}
                        </div>
                    </>
                }
            </div>




        </div>
    )
}
