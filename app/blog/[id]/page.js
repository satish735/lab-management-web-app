"use client";
import "../blog.css"
import React, { useState } from 'react'
import '@/components/home-component/frequently-asked-question/question-ans.css'
const Blog = ({ params: { id } }) => {




    const populerblog = [
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        },
        {
            title: "Preventing Pathogen Passage by Taking Precautions Against the Century Pandemic",
            description: "The governments with the most successful outcomes followed rules given by the WHO. Additionally, they worked with their citizens to make sure that as many people",
            authername: "Martin King",
            createddate: "25 Jan 2023"
        }

    ]


    let question = [{ question: 'How can I download my report from the Dr. B. Lal Lab website ?', answer: 'If you don’t want to search for “medical labs near me” to collect your report in person, you can download it from our website. Login using your registered mobile number and go to the My Report section (Patients > My Report) and download the one you want.' },
    { question: 'How do I find the nearest Dr. B. Lal medical labs ?', answer: 'Instead of a random online search for a “medical laboratory near me”, use the lab locator on our website or app. You can search for a nearby lab using the search option or using your current location.' },
    { question: 'How do I book lab tests online at Dr. B. Lal Lab ?', answer: 'You no longer have to look for a “healthcare laboratory near me” for booking your tests as you can just search for the test you need on our website and book it online. Login or register using your mobile number and choose the tests you wish to book. Choose a suitable time, enter the required details, make the payment, and the test is booked.' },
    ]
    return (
        <div >
           <div style={{ backgroundColor: "#f1f6ee", paddingTop:"-20px" }}>
                 <div className="row midbox-inner p-0 " style={{margin:"0 auto"}} >


                    <div className="col-md-6 col-sm-6 col-12 p-3 ">
                        <div className="m-3 pt-3" >
                            <h2 style={{ fontWeight: "500", fontSize: "2.1rem" }}>Heart Health on International Self-care Day: Daily Habits for a Stronger Heart</h2>
                            <span>Medically Reviewed by:</span>
                            <span style={{ color: "#21cdad" }}> Dr. Kanika</span>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-12 p-3 ">
                        <div className="m-3" >
                            <img className=" rounded pt-3" style={{ height: "270px", width: "90%" }} src="/assets/images/blog1.jpg" alt="post image" loading="lazy" />
                        </div>
                    </div>

                </div>
            </div>

            <div className="row midbox-inner" >
                <div className="col-md-9  col-sm-9 col-12" >

                    <div className="py-3" >
                        <h2 style={{
                            color: '#002678 ',
                            fontSize: ' 40px',
                            textAlign: 'center',
                            margin: '0 20%',
                            padding: '0 0 50px',
                            fontFamily: 'Inter Medium'
                        }}>
                            Frequently Asked Questions

                        </h2>
                        <div className='container-fluid'>
                            <div style={{ margin: '0 auto' }} className='test_faq'>

                                {
                                    (question ?? []).map((item, index) => {
                                        return <FrequentlyAskQuestion item={item} key={index} />
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-3  col-sm-3 col-12 p-3" >
                    <div className="mx-2">
                        <h2 style={{ fontWeight: "800", fontSize: "1.3rem" }}>Popular Blogs</h2>

                        {populerblog?.map((item, index) =>
                            <div className="row py-2" key={index}>


                                <div className="col-3 mt-2">
                                    <img className=" rounded pt-3" style={{ height: "60px", width: "100%" }} src="/assets/images/blog1.jpg" alt="post image" loading="lazy" />
                                </div>

                                <div className="col-9">

                                    <span className="" style={{
                                        fontSize: "0.7rem",
                                        color: "#828599", marginRight: "8px"
                                    }} >{item?.createddate}</span>
                                    <h5 className="py-2 blog_heading_content">{item?.title?.split(' ').slice(0, 5).join(' ')}</h5>
                                </div>

                            </div>
                        )}
                    </div>

                </div>

            </div>


        </div>
    );
};
export default Blog;



const FrequentlyAskQuestion = ({ item }) => {
    const [showHide, setShowHide] = useState(false)

    return (
        <div className='ques-box-before w-100' onClick={() => {
            setShowHide(!showHide)
        }}>
            <h2 className='question d-flex justify-content-between'>
                <span>
                    {item?.question}

                </span>

                <span style={{ fontSize: '30px', fontWeight: '600' }}>+</span>

            </h2>
            <div>
                {
                    showHide && <>
                        <hr />

                        <div className='answer'  >

                            {item?.answer}
                        </div>
                    </>
                }
            </div>




        </div>
    )
}
