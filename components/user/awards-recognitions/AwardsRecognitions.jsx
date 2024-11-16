'use client'
import Banner from '@/components/customdesign/Banner';
import AwardCard from '@/components/customdesign/AwardCard';
import React, { useEffect, useRef } from 'react';
import useAPI from "@/hooks/useAPI";
import moment from 'moment';
import LoaderGeneral from '@/components/loaders/LoaderGeneral';
 
 

const AwardsRecognitions = () => {
    const [awardaccreditationResponse] = useAPI({
        url: "/awardaccreditation/list",
        method: "get",
        sendImmediately: true,
        params: {},
    }, (e) => e.data, (e) => e);

    // Array of PDF URLs
    const pdfUrls = [
        { url: '/assets/pdfs-and-image/digital_health_certificate.pdf', image: '/assets/pdfs-and-image/digital-health-facility.png', text: 'Digital Health Facility' }
        ,
        { url: '/assets/pdfs-and-image/iso-ssdbc-certificate.pdf', image: '/assets/pdfs-and-image/ISO-certificate.png', text: 'ISO 9001:2015' }
        ,
        { url: '/assets/pdfs-and-image/nabl_certificate.pdf', image: '/assets/pdfs-and-image/nabl-certificate.png', text: "NABL Certificate" }
        ,
        { url: '/assets/pdfs-and-image/sonography-certificate.pdf', image: '/assets/pdfs-and-image/registration-facility-certificate.png', text: "Sonography Permission Certificate" }

    ];


    const openPdfInNewTab = (url) => {
        console.log(url);

        window.open(`${url}`, '_blank'); // Use the path relative to the public directory
    };


    return (
        <>
            <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    awardaccreditationResponse?.fetching
                        ? "loading"
                        : !awardaccreditationResponse?.data
                            ? "no-content"
                            : "none"
                }
            />

            {!awardaccreditationResponse?.fetching && (
                <div>
                    <Banner
                        heading="Awards and Accreditations"
                        paragraph="A Legacy of Healthcare Excellence Recognised with Truth, Trust and Care"
                    />

                    <p className='mt-0 mb-2' style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: '700', color: '#003747', textDecoration: 'underline' }}> Certifications</p>
                    <div className='py-5'  >

                        <div className='row midbox-inner' >






                            {
                                (pdfUrls ?? []).map((item, index) => {

                                    return <div key={index} className='  col-lg-3 col-md-6 col-sm-12 ' >

                                        <div  onClick={() => { openPdfInNewTab(item?.url) }} className=' bg-white card_view' style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px', borderRadius: '7px', cursor: 'pointer' }}>

                                            <div className='px-5 py-2'>

                                                <div
                                                   
                                                    // src={process.env.NEXT_PUBLIC_BUCKET_URL + 'public/3bdf5e58-47ce-d0fa-526d-1859ea3e77f7.png'}
                                                    alt=""
                                                    className=""
                                                    style={{
                                                        height: "250px",

                                                        border: "none",
                                                        borderRadius: "12px 12px 0 0 ",
                                                        backgroundImage: `Url('${item?.image}')`,
                                                        backgroundRepeat: 'no-repeat',
                                                        backgroundSize: 'contain',
                                                        backgroundPosition: 'center'
                                                        
                                                    }}
                                                />
                                            </div>

                                            <p className='my-2 ' style={{ textAlign: 'center', fontWeight: '600', fontSize: '1rem',  cursor: 'pointer', minHeight: '50px',paddingTop:'12px', backgroundColor: '#003747',color:'white' ,boxSizing:'border-box'}}>{item?.text}</p>

                                        </div>


                                    </div>


                                })
                            }
                        </div>

                    </div>


                    {/* Awards List Section */}
                    {/* <div className="midbox-inner" style={{ margin: '0 auto' }}>
                        <p className='mt-5 mb-3' style={{ textAlign: 'center', fontSize: '2.2rem', fontWeight: '700', color: '#003747', textDecoration: 'underline' }}> Awards</p>


                        <div className="row px-0 m-2">
                            {awardaccreditationResponse?.data?.map((item, index) => (
                                <div className="col-md-4 col-sm-6 col-12 my-3" key={index}>
                                    <AwardCard
                                        title={item?.name}
                                        description={item?.desc}
                                        imgsrc="/assets/images/blog1.jpg"
                                        createddate={moment(item?.time).format('YYYY-MM-DD')}
                                        extraprops={{ title_style: 'text-center' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div> */}
                </div>
            )}
        </>
    );
};

export default AwardsRecognitions;
