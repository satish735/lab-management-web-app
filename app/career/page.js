"use client";
import React, { useEffect, useState } from "react";
import apiRequest from "../../utils/apiRequest";

import "@/app/blog/blog.css"

import Banner from "@/components/customdesign/Banner.jsx";
import Card from "@/components/customdesign/Card.jsx";
const Blog = ({ params: { id } }) => {



    const ourcorevalue = [
        {
            title: "Customer First",
            img: "/assets/images/CustomerFirst.png",
            description: "We encourage all our activities to exceed customer experience and deliver the WOW experience keeping the concept of 'Customer First'"
        },
        {
            title: "Accountability2",
            img: "/assets/images/Accountability.png",
            description: "As a leading diagnostic organisation of Rajasthan, we encourage practice of taking efforts at every level and across the whole organization for taking personal responsibility for every procedure."
        },
        {
            title: "Respect & Trust",
            img: "/assets/images/Respect.png",
            description: "We recognize the value of every patient and treat everyone with respect and dignity. We communicate honestly and build relationships based on trust and respect with each patient."
        },
        {
            title: "Excellence",
            img: "/assets/images/Excellence.png",
            description: "We ensure the highest quality of our work from the beginning to the end and strive to the best in everything we do for our patients."
        },
    ]



    const [name, setName] = useState()
    const [email, setemail] = useState()
    const [phone, setphone] = useState()



    // validation input 

    const [isname, setisname] = useState(false)
    const [isemail, setisemail] = useState(false)
    const [isphone, setisphone] = useState(false)



    useEffect(() => {
        console.log(name)
    }, [name])

    return (
        <div style={{ backgroundColor: "rgb(253 251 255)" }}>

            <Banner
                heading="Career"
                paragraph="Here’s your opportunity to work with Rajasthan’s Most Trusted Laboratory.
                 We are looking for talented professionals to fill in the below mentioned opportunities."
            />




            <div className=" my-2" >
                <div className="col-sm-4 col-12 text-center midbox-inner" style={{ margin: "0 auto" }} >
                    <h5 style={{ color: "#002678", fontWeight: "800", fontSize: "2rem" }} >Our  Core  Values,  Vision  and  Mission</h5>

                </div>

                <div className="row midbox-inner" >
                    {ourcorevalue?.map((item, index) => <div className="col-sm-4 col-12 my-2" key={index}>
                        <Card
                            title={item?.title}
                            description={item?.description}
                            extraprops={{ height: "200px" }}
                            minimgsrc={item?.img}
                        />
                    </div>)}

                </div>


                <div className=' my-4' style={{ backgroundColor: '#f1f6ee' }}>

                    <div className='py-4 midbox-inner' >

                        <p className='mb-3 text-center' style={{ color: '#000', fontSize: '40px', fontWeight: '500' }}>Our Core Values </p>

                        <div className='row'>

                            <div className=' px-3 py-2 col-lg-3 col-md-6 col-sm-12'>
                                <CoreValuesCard title={list[0].title} desc={list[0].desc} />
                            </div>

                            <div className=' px-3 py-2 col-lg-3 col-md-6 col-sm-12'>
                                <CoreValuesCard title={list[1].title} desc={list[1].desc} />

                            </div>

                            <div className=' px-3 py-2 col-lg-3 col-md-6 col-sm-12'>
                                <CoreValuesCard title={list[2].title} desc={list[2].desc} />

                            </div>

                            <div className=' px-3 py-2 col-lg-3 col-md-6 col-sm-12'>
                                <CoreValuesCard title={list[3].title} desc={list[3].desc} />

                            </div>
                        </div>
                    </div>
                </div>


                <div className='row  midbox-inner' style={{   marginBottom: '140px', marginTop: '130px' }} >


                    <div className='col-lg-6 col-md-6 col-sm-12  ' style={{ padding: '0px 30px 0 10px' }}>
                        <div className='pe-3 pt-3' style={{ background: ' linear-gradient(153deg, #000428 , #004e92)', width: '100%', height: '100%', borderRadius: '15px', position: 'relative' }}>



                            <div className="why-choose-us-image-div">
                                <img
                                    src={'/assets/images/temp/why-choose-us.png'}
                                    alt=""
                                    className="director-image"
                                    style={{
                                        height: "400px",
                                        width: "100%",
                                        border: "none",
                                        borderRadius: "12px 12px 0 0 ",
                                    }}
                                />

                            </div>

                        </div>
                    </div>



                    <div className='col-lg-6 col-md-6 col-sm-12'>
                        <p style={{ color: '#000', fontSize: '40px', fontWeight: '600' }}>
                            Why Choose Us?
                        </p>
                        <ul>
                            <li className='my-3' style={{ color: '#46bb00', fontSize: '16px', fontWeight: '500' }}>
                                <span >Accurate Results:</span> <span style={{ color: '#97979a', fontSize: '16px', fontWeight: '400' }}>
                                    Rigorous quality control measures ensure the accuracy and reliability of every test.
                                </span>
                            </li>

                            <li className='my-3' style={{ color: '#46bb00', fontSize: '16px', fontWeight: '500' }}>
                                <span >Advanced Technology:</span> <span style={{ color: '#97979a', fontSize: '16px', fontWeight: '400' }}>
                                    Cutting-edge equipment and techniques for comprehensive diagnostics.
                                </span>
                            </li>

                            <li className='my-3' style={{ color: '#46bb00', fontSize: '16px', fontWeight: '500' }}>
                                <span >Experienced Professionals: </span> <span style={{ color: '#97979a', fontSize: '16px', fontWeight: '400' }}>
                                    A team of dedicated experts committed to excellence in diagnostics.
                                </span>
                            </li>

                            <li className='my-3' style={{ color: '#46bb00', fontSize: '16px', fontWeight: '500' }}>
                                <span >Patient Convenience:  </span> <span style={{ color: '#97979a', fontSize: '16px', fontWeight: '400' }}>
                                    Efficient service delivery and patient-centric approach for a hassle-free experience.
                                </span>
                            </li>
                        </ul>
                    </div>



                </div>


                <div className="py-3 my-3 midbox-inner">
                    <div className="col-sm-6 col-12">
                        <h6 style={{ color: "#002678", fontSize: "1.0rem", fontWeight: "700" }}>Job Application Form</h6>
                        <h4 style={{ color: "#002678", fontSize: "2.0rem", fontWeight: "700" }}>Please Fill Out the Form Below to Submit Your Job Application!</h4>
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
                                            value={phone}
                                            name="textarea"
                                            rows="5"
                                            cols="15"
                                            onChange={(e) => {
                                                setphone(e.target.value)
                                            }}
                                        />

                                        {isphone && <span className="input_isrequired" >This field is required.</span>}

                                    </div>
                                    <div className="call-button slide-item" >
                                        <button type="button " className="btn   btn_checkout">Submit</button>

                                    </div>

                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div >


        </div >
    );
};
export default Blog;

const CoreValuesCard = ({ title, desc }) => {

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #dee2db', height: '100%' }}>
            <div>

            </div>

            <div>
                <p style={{ color: '#1e1e2f', fontSize: '18px' }}>
                    {title}
                </p>
                <div>
                    <p style={{ color: '#97979a', fontSize: '16px' }}>
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    )
}



let list = [
    { title: 'Customer First', desc: 'We encourage all our activities to exceed customer experience and deliver the WOW experience keeping the concept of Customer First' },
    { title: 'Accountability', desc: 'As a leading diagnostic organisation of Rajasthan, we encourage practice of taking efforts at every level and across the whole organization for taking personal responsibility for every procedure' },
    { title: 'Respect & Trust', desc: 'We recognize the value of every patient and treat everyone with respect and dignity. We communicate honestly and build relationships based on trust and respect with each patient' },
    { title: 'Excellence', desc: 'We ensure the highest quality of our work from the beginning to the end and strive to the best in everything we do for our patients.' },
]