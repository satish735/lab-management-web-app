"use client";
import React from 'react'
import MembersCard from './cards/MembersCard'
import Banner from '@/components/customdesign/Banner'
import useAPI from "@/hooks/useAPI";
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

            <div className='pb-4 pt-0  midbox-inner' style={{ backgroundColor: 'white' }}>
                <div style={{ justifyContent: 'center' }}>

                    <p className='mb-3 text-center' style={{textDecoration:'underline', color: '#000', fontSize: '30px',fontWeight:'600' }}> SSDBSHYAM Diagnostic LLP</p>

                    <p style={{ color: '#97979a', justifyContent: 'center', fontWeight: '500' }}>
                        Welcome to <span style={{fontWeight:'700'}}>SSDBSHYAM Diagnostic LLP</span>, your premier diagnostic center in Jaipur, proudly branded under the name ENDOLAB. We are dedicated to providing the highest standards of diagnostic services with a commitment to excellence and accuracy, combined with the uncompromised trust shown by doctors and patients in our services have made us a distinguished preference over the last 30+ years.
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

            <div className='midbox-inner'>

                <div className='row py-4   my-5' >

                    <div className='col-lg-6 col-md-6 col-sm-12  '>
                        <p style={{ color: '#000', fontSize: '40px', fontWeight: '600' }}>
                            Director’s Message
                        </p>

                        <p style={{ color: '#97979a', fontSize: '16px' }}>

                            <p style={{ justifyContent: 'center' }}>
                                While providing clinical investigation services, quality is an important criterion. We are committed to maintain excellence in all our services, ensuring patient satisfaction.
                            </p>
                            <p style={{ justifyContent: 'center' }}>

                                Our contribution to the overall Diagnostic Pathology industry and continuous pursuit towards a vision of providing quality healthcare services in India is our goal and everyday mission.
                            </p>

                            <p style={{ justifyContent: 'center' }}>


                                For you, we will continue to work with the passion on our mission to contribute significantly in health care of the society by providing efficient, timely and affordable patient care services.
                            </p>

                        </p>

                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12  ' style={{ padding: '0px 10px 0 90px' }}>
                        <div className='pe-3 pt-3 director-image-div-parent-div global-background-gradient' style={{   width: '100%', borderRadius: '15px', position: 'relative' }}>

                            <div>
                                <p className='' style={{ marginBottom: '2px', color: '#e1fba6', fontWeight: '500', fontSize: '18px', textAlign: 'end' }}>
                                SSDBC (Chairman)
                                </p>
                                <p style={{ color: 'white', fontWeight: '400', fontSize: '16px', textAlign: 'end' }}>
                                     MD (Micribiology)
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
                                        height: "320px",
                                        width: "400px",
                                        border: "none",
                                        borderRadius: "12px 12px 0 0 ",
                                        background:'transparent'
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

