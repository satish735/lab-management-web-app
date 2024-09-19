'use client'
import Banner from '@/components/customdesign/Banner';
import LoaderGeneral from '@/components/loaders/LoaderGeneral';
import useAPI from '@/hooks/useAPI';
import transformErrorDefault from '@/utils/transformErrorDefault';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
const Blog = ({ params: { id } }) => {
    const [fillForm, setFillForm] = useState(false);


    const [getJobsResponse, getJobsHandler] = useAPI(
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



    return (

        <div style={{ backgroundColor: "rgb(253 251 255)" }}>

            <Banner
                heading="Career"
                paragraph="Here’s your opportunity to work with Rajasthan’s Most Trusted Laboratory.
             We are looking for talented professionals to fill in the below mentioned opportunities."
            />


            <div className='midbox-inner'>

                <LoaderGeneral
                    noContentMessage="Job Posts not found"
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
                    (getJobsResponse?.data ?? []).map((item,index) => {
                        return <ListJob item={item} key={index} />
                    })
                }

            </div>

        </div>
    )
};
export default Blog;

const ListJob = ({ item,key }) => {

    const router = useRouter()


    return (
        <div key={key} className='mb-4 ' style={{}}>

            <h3 className='mb-3' style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.7rem' }}>Latest Job Posts</h3>

            <div className='row px-3' style={{ borderRadius: '0 10px 10px 0' }}>
                <div className='col-12'>
                    <div className='row shadow pt-3 pb-2' style={{ borderRadius: '5px', borderLeft: '10px solid orange' }}>
                        <p className='col-lg-6 col-md-6 col-sm-12' style={{ fontSize: '19px', fontWeight: '600' }}>{item?.name} -<span className='text-capitalize mx-3' style={{ fontWeight: '500', fontSize: '15px', color: 'grey' }}>({item?.jobType ?? ''})</span></p>

                        <p className='col-lg-6 col-md-6 col-sm-12' style={{ fontSize: '16px', fontWeight: '600' }}>{'Published At'} -<span className='text-capitalize mx-3' style={{ fontWeight: '500', fontSize: '14px', color: 'grey' }}>({moment(item?.publishedAt).format('LLL') ?? ''})</span></p>


                        <p className='col-lg-6 col-md-6 col-sm-12' style={{ fontSize: '16px', fontWeight: '600' }}>{'Department'} -<span className='text-capitalize mx-3' style={{ fontWeight: '500', fontSize: '14px', color: 'grey' }}>({item?.department ?? ''})</span></p>




                        <p className='col-lg-6 col-md-6 col-sm-12' style={{ fontSize: '19px', fontWeight: '600' }}> <span onClick={() => { router.push(`/career/post?id=${item?._id}`) }} className='text-capitalize' style={{ textDecoration: 'underline', fontWeight: '500', fontSize: '17px', color: '#21cdad', cursor: 'pointer' }}>Show More Details</span></p>

                        <div>

                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

