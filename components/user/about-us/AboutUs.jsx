"use client";
import React from 'react'
import MembersCard from './cards/MembersCard'
import Banner from '@/components/customdesign/Banner'
import useAPI from "@/hooks/useAPI";
import Card from "@/components/customdesign/Card.jsx";



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
const AboutUs = () => {

    const [teammemberResponse, teammemberHandler] = useAPI(
        {
            url: "/teammember/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {
            return e.data ?? []
        },
        (e) => {
            toast.error("Something went wrong while Getting team member!");
            return e
        }
    );
    return (
        <div>
            <Banner heading={'About Us'} />

            <div className='pb-4 pt-0  midbox-inner px-3' style={{ backgroundColor: 'white' }}>
                <div style={{ justifyContent: 'center' }}>

                    <p className='mb-3 text-center' style={{ textDecoration: 'underline', color: '#003747', fontWeight: "800", fontSize: "2rem" }}> SSDBSHYAM Diagnostic LLP</p>

                    <p style={{ color: '#97979a', justifyContent: 'center', fontWeight: '500' }}>
                        Welcome to <span style={{ fontWeight: '700' }}>SSDBSHYAM Diagnostic LLP</span>, your premier diagnostic center in Jaipur, proudly branded under the name ENDOLAB. We are dedicated to providing the highest standards of diagnostic services with a commitment to excellence and accuracy, combined with the uncompromised trust shown by doctors and patients in our services have made us a distinguished preference over the last 30+ years.
                    </p>
                </div>


                <div className='mt-5'>
                    <p style={{ color: '#46b902', fontSize: '24px', fontWeight: '600' }}>
                        Our Vision:
                    </p>

                    <p style={{ color: '#97979a', fontSize: '16px', }}>
                        To be the leading diagnostic center in Jaipur, known for our unwavering dedication to quality, innovation, and patient care. We aim to set the benchmark in diagnostic services, fostering a healthier community through accurate and early diagnosis.
                    </p>
                </div>

                <div>
                    <p style={{ color: '#46b902', fontSize: '24px', fontWeight: '600' }}>
                        Our Mission:
                    </p>

                    <p style={{ color: '#97979a', fontSize: '16px', }}>
                        At SSDBC SHYAM Diagnostic LLP, our mission is to offer reliable, precise, and timely diagnostic services to ensure the best possible care for our patients. We strive to combine advanced technology with expert medical knowledge to deliver comprehensive diagnostic solutions.
                    </p>
                </div>
            </div>

            <div className="col-sm-4 col-12 text-center midbox-inner mt-5" style={{ margin: "0 auto" }} >
                <h5 style={{ color: "#003747", fontWeight: "800", fontSize: "2rem" }} >Our  Core  Values,  Vision  and  Mission</h5>

            </div>

            <div className="row midbox-inner mt-4" >
                {ourcorevalue?.map((item, index) => <div className="col-sm-4 col-12 my-2" key={index}>
                    <Card
                        title={item?.title}
                        description={item?.description}
                        extraprops={{ height: "200px" }}
                        minimgsrc={item?.img}
                    />
                </div>)}

            </div>
            {/* <div className=' midbox-inner' style={{}}>

                <div className='row  ' style={{ padding: '10px 10px', marginBottom: '140px', marginTop: '130px' }} >


                    <div className='col-lg-6 col-md-6 col-sm-12 ' style={{ padding: '0px 30px 0 10px' }}>
                        <div className='pe-3 pt-3 why-choose-us-image-div-parent-div global-background-gradient' style={{   width: '100%', borderRadius: '15px', position: 'relative' }}>



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
            </div> */}

            <div className='midbox-inner px-3'>

                <div className='row py-4   my-5' >

                    <div className='col-lg-6 col-md-6 col-sm-12  '>
                        <p style={{ color: '#003747', fontWeight: "700", fontSize: "2rem" }}>
                            Director’s Message
                        </p>

                        <div style={{ color: '#97979a', fontSize: '16px' }}>

                            <p style={{ justifyContent: 'center' }}>
                                While providing clinical investigation services, the aim and Objectives of this center is to provide QUALITY DIAGNOSTIC SERVICES at affordable price with stress on both accuracy and precision with MINIMUM TURN AROUND TIME to guide clinicians through patient care.
                            </p>
                            <p style={{ justifyContent: 'center' }}>

                                Being a diagnostic centre our job is to deliver satisfactory services to our patients and clients. A strong team is the main prerequisite to provide these services round the clock and up to wide distances.
                            </p>

                            <p style={{ justifyContent: 'center' }}>


                                For you, we will continue to work with the passion on our mission to contribute significantly in health care of the society by providing efficient, timely and affordable patient care services.
                            </p>

                        </div>

                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12  chairman-div' style={{}}>
                        <div className='pe-3 pt-3 director-image-div-parent-div global-background-gradient' style={{ width: '100%', borderRadius: '15px', position: 'relative' }}>

                            <div>
                                <p className='' style={{ marginBottom: '2px', color: '#e1fba6', fontWeight: '500', fontSize: '18px', textAlign: 'end' }}>
                                    A. Girdhari lal Agarwal 
                                </p>
                                <p style={{ color: 'white', fontWeight: '400', fontSize: '16px', textAlign: 'end' }}>
                                (Managing Director)
                                </p>
                                {/* <p style={{ color: 'white', fontWeight: '400', fontSize: '16px', textAlign: 'end' }}>
                                    Managing Director
                                </p> */}

                            </div>

                            <div className="director-image-div">
                                <img
                                    src={'/assets/images/temp/why-choose-us.png'}
                                    alt=""
                                    className="director-image"
                                    style={{

                                        border: "none",
                                        borderRadius: "12px 12px 0 0 ",
                                        background: 'transparent'
                                    }}
                                />

                            </div>

                        </div>
                    </div>




                </div>
            </div>


            <div className='midbox-inner'>

                {/* <div className='py-4 ' style={{}}>
                    <p className='mb-5 text-center' style={{ color: '#000', fontSize: '40px', fontWeight: '500' }}>Our Team </p>

                    <div className='row'>
                        {
                            teammemberResponse?.data?.filter((item) => item?.type == "core")?.map((item, index) => {
                                return <MembersCard key={index} data={item} />
                            })
                        }

                    </div>

                </div> */}
            </div>
            {/* <div className='midbox-inner'>

                <div className='py-4' style={{}}>
                    <p className='mb-5 text-center' style={{ color: '#000', fontSize: '40px', fontWeight: '500' }}>Scientific Team </p>

                    <div className='row'>
                        {
                            teammemberResponse?.data?.filter((item) => item?.type != "core")?.map((item, index) => {
                                return <MembersCard key={index} data={item} />
                            })
                        }

                    </div>

                </div>
            </div> */}
        </div>
    )
}

export default AboutUs







