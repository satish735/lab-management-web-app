

"use client";
import UserLayout from '@/layouts/UserLayout'

import "./Milestones.css"
import Banner from "@/components/customdesign/Banner.jsx";
import useAPI from "@/hooks/useAPI";

const Page = () => {


    const data = [
        {
            title: "Foundation Year",
            year: '1991',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },
        {
            title: "Foundation Year",
            year: '1997',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },
        {
            title: "Foundation Year",
            year: '1998',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },
        {
            title: "Foundation Year",
            year: '1999',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },
        {
            title: "Foundation Year",
            year: '2001',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },
        {
            title: "Foundation Year",
            year: '2007',
            description: "Establishment of the 1st specialized center at Panch Batti, Jaipur for performing special investigations by ELISA technique along with all other routine pathology labs."
        },

    ]



    const [milestonesResponse, milestonesHandler] = useAPI(
        {
            url: "/milestones/list",
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



    return (
        <UserLayout>
            <div className='Milestones_main '>
                <Banner
                    heading="Milestones"
                    paragraph="A success story “Truth, Trust and Care for more than 30 Years”"
                />
                <div className="timeline ">



                    {milestonesResponse?.data?.map((item, index) => {

                        return <div className="container left" key={index} style={{borderLeft:"8px solid #FF9F55"}}>
                            <div className="content shadow">
                                <h2 style={{ color: "#21cdad", fontSize: "1.1rem", fontWeight: "bold" }} >{item?.year}</h2>
                                {item?.title && <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>{item?.title}</h3>}
                                <p>{item?.desc}</p>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </UserLayout>
    )
}

export default Page