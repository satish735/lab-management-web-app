

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

    useEffect(()=>{
        milestonesHandler()
    },[])


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
                <div className="timeline px-3 my-3">




                    {milestonesResponse?.data?.map((item, index) => {


                        return <div key={index} className="content shadow my-3" style={{ borderLeft: "15px solid orange" }}>
                            <h2 style={{ color: "#21cdad", fontSize: "1.1rem", fontWeight: "bold" }} >{item?.year}</h2>
                            {item?.title && <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{item?.title}</h3>}
                            <p>{item?.desc}</p>
                        </div>

                    })}

                </div>
            </div>}
        </UserLayout>
    )
}