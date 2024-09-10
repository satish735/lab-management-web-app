"use client";
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";

import "@/app/blog/blog.css"

import Banner from "@/components/customdesign/Banner.jsx";
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
import JobOpenings from "@/components/job-openings/JobOpenings";
const Blog = ({ params: { id } }) => {




    const [getCareerResponse, getCareerHandler] = useAPI(
        {
            url: "/addCareerDetailss",
            method: "get",
            sendImmediately: true,

        },
        (e) => {





        },
        (e) => {

            toast.error(transformErrorDefault(
                "Something went wrong while saving details!",
                e
            ));
        }
    );





    const [name, setName] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()
    const [additionalDetails, setadditionalDetails] = useState()



    // validation input 

    const [isname, setisname] = useState(false)
    const [isemail, setisemail] = useState(false)
    const [isphone, setisphone] = useState(false)
    const [isadditionalDetails, setisadditionalDetails] = useState(false)





    const submitHandler = (e) => {

        e.preventDefault()


        getCareerHandler({
            body: {
                name: name,
                phone: phone,
                email: email,
                additionalInfo: additionalDetails
            }
        })

        setName()
        setemail()
        setphone()
        setadditionalDetails()

    }

    return (
        <div style={{ backgroundColor: "rgb(253 251 255)" }}>

            <Banner
                heading="Career"
                paragraph="Here’s your opportunity to work with Rajasthan’s Most Trusted Laboratory.
                 We are looking for talented professionals to fill in the below mentioned opportunities."
            />




            <div className=" my-2" >


                <div className="py-3 my-3 midbox-inner">
                    <div className="col-sm-6 col-12">
                        <h6 style={{ color: "#065465", fontSize: "1.0rem", fontWeight: "700" }}>Job Application Form</h6>
                        <h4 style={{ color: "#065465", fontSize: "2.0rem", fontWeight: "700" }}>Please Fill Out the Form Below to Submit Your Job Application!</h4>
                    </div>
                    <div className="row py-2">

                        <div className="col-sm-3 col-12" >
                            <p style={{ fontSize: "0.9rem", color: "rgb(153 151 151 / 93%)" }} >Our customer care staff will distribute your request for consultation to the appropriate Laboratory Medicine discipline.</p>
                            <p style={{ fontSize: "0.9rem", color: "rgb(153 151 151 / 93%)" }} >A member of the Medical/Scientific Staff will get back
                                to the requesting healthcare provider within one business day.
                            </p>

                        </div>


                        <div className="col-sm-9 col-12">
                            <form>
                                <div className="row" >
                                    <div className="col-4" >
                                        <input
                                            className="input"
                                            placeholder="Name"
                                            label="Name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value)
                                            }}
                                        />

                                        {isname && <span className="input_isrequired" >This field is required.</span>}

                                    </div>
                                    <div className="col-4" >
                                        <input
                                            className="input"
                                            placeholder="Email"
                                            label="Email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setemail(e.target.value)
                                            }}
                                        />

                                        {isemail && <span className="input_isrequired" >This field is required.</span>}

                                    </div>
                                    <div className="col-4" >
                                        <input
                                            className="input"
                                            placeholder="Phone"
                                            label="Phone"
                                            type="number"
                                            value={phone}
                                            onChange={(e) => {
                                                setphone(e.target.value)
                                            }}
                                        />

                                        {isphone && <span className="input_isrequired" >This field is required.</span>}

                                    </div>

                                    <div className="col-12 py-2" >
                                        <textarea

                                            className="input textarea "
                                            placeholder="Additional Details"
                                            label="Additional Details"
                                            type="textarea"
                                            autoComplete="off"
                                            value={additionalDetails}
                                            name="textarea"
                                            rows="5"
                                            cols="15"
                                            onChange={(e) => {
                                                setadditionalDetails(e.target.value)
                                            }}
                                        />

                                        {isadditionalDetails && <span className="input_isrequired" >This field is required.</span>}

                                    </div>


                                </div>
                            </form>
                            <div className="call-button slide-item" >
                                <button onClick={() => { submitHandler() }} className="btn   btn_checkout">Submit</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div >



            <div className="my-4">

                <h1 className="text-center" style={{ fontSize: '2.4rem', fontWeight: '500' }}>
                    All Openings
                </h1>


                <JobOpenings />
            </div>
        </div >
    );
};
export default Blog;


