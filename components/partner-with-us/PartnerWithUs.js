'use client'
import React, { useState } from 'react'
import './partners.css'

const PartnerWithUs = () => {


    const [tab, setTab] = useState('franchising-opportunity');


    return (
        <div>

            <div className='global-background-gradient ' style={{ paddingTop: '70px', paddingBottom: '70px' }}>

                <h1 className='Header-heading'>
                    To Become Our Business Partners
                </h1>

                <p className='Header-desc'>
                    Unlock the door to a thriving healthcare venture with SSDBSHYAM Diagnostic LLP Clinical Laboratory – Rajasthans dynamic diagnostic powerhouse. Our relentless pursuit of excellence merges cutting-edge technology, innovative practices, and a dedicated team ethos. Backed by over 30 years of unwavering trust from patients and healthcare professionals alike, our NABL Accredited laboratories set the gold standard for top-tier quality. Offering an extensive gamut of 1500+ tests across various disciplines, from basic screenings to advanced diagnostics in Clinical Pathology, Biochemistry, Hematology, Microbiology, Serology, and Molecular Biology. Seamlessly reach your audience with our extensive Sample Home Collection service, covering the widest area in Rajasthan and Ahmedabad. Dive into our franchise network and become a beacon of transformative healthcare excellence with SSDBSHYAM Diagnostic LLP Clinical Laboratory


                </p>

            </div>

            <div className='my-5'>
                <div className='row mx-auto middle-tabs' style={{ border: '1px solid #dee2db', width: '75%', borderRadius: '8px' }}>

                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('franchising-opportunity') }} className={`${tab === 'franchising-opportunity' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Franchising Opportunity
                        </button>

                    </div>


                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('lab-acquisition') }} className={`${tab === 'lab-acquisition' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Lab Acquisition
                        </button>

                    </div>


                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('hospital-lab-management') }} className={`${tab === 'hospital-lab-management' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Hospital Lab Management
                        </button>

                    </div>



                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('corporate-wellness') }} className={`${tab === 'corporate-wellness' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Corporate Wellness
                        </button>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default PartnerWithUs