'use client'
import Banner from '@/components/customdesign/Banner';
import LoaderGeneral from '@/components/loaders/LoaderGeneral';
import useAPI from '@/hooks/useAPI';
import transformErrorDefault from '@/utils/transformErrorDefault';
import moment from 'moment';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import "@/app/blog/blog.css"
import { FaCheckDouble } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '../form/career.css'

const Post = ({ searchParams }) => {

    const router = useRouter();


    const [getJobsResponse, getJobsHandler] = useAPI(
        {
            url: `/getJobs/${searchParams?.id}`,
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            console.log(e);

            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while fetching jobs!",
                e
            ));
        }
    );


    const [getAllJobsResponse, getAllJobsHandler] = useAPI(
        {
            url: "/getJobs",
            method: "get",
            sendImmediately: true,

        },
        (e) => {
            console.log(e);

            return e
        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while fetching jobs!",
                e
            ));
        }
    );


    const formPage = () => {
        router.push(`/career/form?id=${searchParams?.id}`)
    }

    return (

        <div style={{ backgroundColor: "rgb(253 251 255)" }}>


            <LoaderGeneral
                noContentMessage="Posts not found"
                state={
                    getJobsResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(getJobsResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />

            {
                !(getJobsResponse?.fetching) &&

                <div>


                    <div className='' style={{ backgroundColor: '#21cdad' }}>


                        <div className='my-0' style={{ padding: '15px 0 8px 0', color: 'white', width: '80%', margin: '0 auto' }}>

                            <div style={{ fontSize: '2.3rem', fontWeight: '500' }}>

                                {getJobsResponse?.data?.name ?? ''}

                            </div>
                            <p className='text-capitalize'  >
                                {getJobsResponse?.data?.jobType ?? ''}
                            </p>
                        </div>

                    </div>

                    <div className='row apply-now-section'>



                        <div className='col-lg-4 col-md-4 col-sm-12 px-3'>

                            <div style={{ minHeight: '70vh', backgroundColor: '#6af16a14', borderRadius: '10px', padding: '16px 8px 16px 8px' }}>


                                <div>
                                    <button className='btn btn_checkout' style={{ backgroundColor: 'rgb(33, 205, 173)' }} onClick={() => { formPage() }}>
                                        Apply for this job

                                    </button>
                                </div>

                                <div className='ps-2 '>

                                    <p className='my-2 mt-4' style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(115 138 143)' }}>
                                        <span style={{ padding: '6px 8px 6px 8px', backgroundColor: '#3bee3b59', borderRadius: '50%' }}>
                                            <FaCheckDouble style={{ fontSize: '15px', color: 'green' }} />
                                        </span>    <span style={{ color: '#003747' }}> Department -</span>  {getJobsResponse?.data?.department ?? ''}


                                    </p>

                                    <p className='my-4 text-capitalize' style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(115 138 143)' }}>
                                        <span style={{ padding: '6px 8px 6px 8px', backgroundColor: '#3bee3b59', borderRadius: '50%' }}>
                                            <FaCheckDouble style={{ fontSize: '15px', color: 'green' }} />
                                        </span>   <span className='' style={{ color: '#003747' }}> Job Type -</span> {getJobsResponse?.data?.jobType ?? ''}



                                    </p>

                                    <p className='my-4 text-capitalize' style={{ fontSize: '16px', fontWeight: '600', color: 'rgb(115 138 143)' }}>
                                        <span style={{ padding: '6px 8px 6px 8px', backgroundColor: '#3bee3b59', borderRadius: '50%' }}>
                                            <FaCheckDouble style={{ fontSize: '15px', color: 'green' }} />
                                        </span>   <span className='' style={{ color: '#003747' }}> Location -</span> {(getJobsResponse?.data?.name)?.split(' - ')[1] ?? ''}



                                    </p>



                                </div>

                                <div className='my-3'>

                                    <hr />
                                </div>


                                <div className='ps-2'>
                                    <p style={{ fontSize: '18px', fontWeight: '600' }}>
                                        Similar Openings
                                    </p>

                                    <div>

                                        {

                                            (getAllJobsResponse?.data ?? []).map((item,index) => {
                                                return <div key={index} className='ps-2' style={{ borderLeft: '2px solid green' }}>
                                                    <p className='mb-1' style={{ fontSize: '15px', fontWeight: '600', color: '#003747' }}>
                                                        {item?.name}
                                                    </p>
                                                    <p style={{ fontSize: '12px', fontWeight: '600', color: 'rgb(115 138 143)' }}>
                                                        {(item?.name)?.split(' - ')[1] ?? ''}

                                                    </p>
                                                </div>
                                            })
                                        }

                                        <p style={{ textAlign: 'center', fontSize: '26px', cursor: 'pointer' }}>
                                            ...
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='col-lg-8 col-md-8 col-sm-12 px-3 pt-3'>

                            <p className='mb-1' style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                                {(getJobsResponse?.data?.name)?.split(' - ')[0] ?? ''}
                            </p>

                            <p style={{}}>
                                {getJobsResponse?.data?.description ?? ''}

                            </p>

                            <p className='mb-1' style={{ fontSize: '1.3rem', fontWeight: '700' }}>
                                Experience
                            </p>
                            <div className='ckeditor-content-div' dangerouslySetInnerHTML={{ __html: getJobsResponse?.data?.experience }} >
                                {/* {getdata?.ckdescription ?? ""} */}
                            </div>
                        </div>


                    </div>


                </div>

            }

        </div>
    )
};
export default Post;


