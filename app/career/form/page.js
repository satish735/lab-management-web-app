"use client";
import "@/app/blog/blog.css"
import Banner from "@/components/customdesign/Banner.jsx";

import './career.css'
import JobFormComponent from "@/components/job-form/JobFormComponent";

const Form = ({ searchParams }) => {

    return (
        <div style={{ backgroundColor: "rgb(253 251 255)" }}>

            <Banner
                heading="Career"
                paragraph="Here’s your opportunity to work with Rajasthan’s Most Trusted Laboratory.
                 We are looking for talented professionals to fill in the below mentioned opportunities."
            />




            <div className=" my-0" >


                <div className="py-1 my-1 midbox-inner">
                    <div className=" text-center" >

                        <h4 className="mx-auto career-job-form" style={{ color: "#065465", fontSize: "2.0rem", fontWeight: "700" }}>Please Fill Out the Form Below to Submit Your Job Application!</h4>
                    </div>
                    <div className="row py-2">

                        <div className=" col-12" >
                            <p className="mx-auto text-center fill-form-text" style={{ fontSize: "0.9rem", color: "rgb(153 151 151 / 93%)" }} >Our customer care staff will distribute your request for consultation to the appropriate Laboratory Medicine discipline.</p>
                            <p className="mx-auto  text-center c" style={{ fontSize: "0.9rem", color: "rgb(153 151 151 / 93%)" }} >A member of the Medical/Scientific Staff will get back
                                to the requesting healthcare provider within one business day.
                            </p>

                        </div>


                    </div>

                </div >

                <JobFormComponent searchParams={searchParams} hasParams={true}/>



                {/* <div className="my-4 midbox-inner">

                    <h1 className="text-center" style={{ fontSize: '2.4rem', fontWeight: '500' }}>
                        All Openings
                    </h1>


                    {
                        (list ?? [])?.map?.((item, key) => {
                            return <JobOpenings key={key} jobsType={item} />
                        })
                    }

                </div> */}
            </div >
        </div >
    );
};
export default Form;




