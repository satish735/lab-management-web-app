

"use client";
import UserLayout from '@/layouts/UserLayout'
import "./Milestones.css"
import Banner from "@/components/customdesign/Banner.jsx";
import useAPI from "@/hooks/useAPI";
import LoaderGeneral from '@/components/loaders/LoaderGeneral';
import transformErrorDefault from "@/utils/transformErrorDefault";
import { useEffect } from 'react';

export default function Page() {





    const [milestonesResponse, milestonesHandler] = useAPI(
        {
            url: "/milestones/list",
            method: "get"
        },
        (e) => {


            return e?.data.sort((a, b) => new Date(b.year).getFullYear() - new Date(a.year).getFullYear()) ?? []

        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting milestones!",
                e
            ));
            return e
        }
    );

    useEffect(() => {
        milestonesHandler()
    }, [])


    return (
        <UserLayout>


            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    milestonesResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(milestonesResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />
            {!milestonesResponse?.fetching && <div className='Milestones_main '>
                <Banner
                    heading="Milestones"
                    paragraph="A success story “Truth, Trust and Care for more than 30 Years”"
                />
                <div className='text-center  '>

                    <p className='mb-3 text-center' style={{ textDecoration: 'underline', color: '#003747', fontWeight: "800", fontSize: "2rem" }}>Our Journey</p>

                    <p className=' mx-auto' style={{ color: '#97979a', justifyContent: 'center', fontWeight: '500', width: '60%' }}>
                    <span style={{ fontWeight: '700' }}>Shri Girdhari Lal Agarwal </span> (DIRECTOR) commenced the business of providing pathology/Diagnostic services in the year 2000. B2B
                        The Business of diagnostic services now continues to be provided by our firm.

                    </p>
                </div>

                <div className="timeline px-3 my-3">




                    {milestonesResponse?.data?.map((item, index) => {


                        return <div key={index} className="content shadow my-3" style={{ borderLeft: "15px solid orange" }}>
                            <h2 style={{ color: "#21cdad", fontSize: "1.1rem", fontWeight: "bold" }} >{item?.year}</h2>
                            {item?.title && <p style={{ fontSize: "1.3rem", fontWeight: "bold",marginBottom:'3px' }}>{item?.title}</p>}
                            <pre style={{ fontSize: "1.1rem", fontWeight: "bold",fontFamily:'Helvetica, sans-serif' }} >{item?.desc}</pre>
                        </div>

                    })}

                </div>
            </div>}
        </UserLayout>
    )
}