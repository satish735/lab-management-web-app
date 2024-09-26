'use client'
import React, { useState, useEffect } from 'react'
import FranchisingOpport from './FranchisingOpport';
import LabAcquistion from './LabAcquistion';
import HospitalManagement from './HospitalManagement';
import CorporateWellness from './CorporateWellness';
import useAPI from '@/hooks/useAPI';
import toast from 'react-hot-toast';
import transformErrorDefault from '@/utils/transformErrorDefault';

const BelowTabs = () => {

    const [tab, setTab] = useState('franchising');

    const [getdata, setdata] = useState([])

    const [partbersResponse, partbersHandler] = useAPI(
        {
            url: `/partnerwithus/list`,
            method: "get",
            sendImmediately: true
        },
        (e) => {
            console.log(e)
            setdata(e?.data)
            return e?.data
        },
        (e) => {

            toast.error(
                transformErrorDefault(
                    "Something went wrong while creating blog!",
                    e
                )
            );
            return e;
        }
    );


    const [content, setcontent] = useState()
    useEffect(() => {
        let getpartnertext = getdata?.filter((item) => item?.type == tab)
        console.log("getpartnertext", getpartnertext[0])
        setcontent(getpartnertext[0] ?? {})
    }, [tab,getdata])

    console.log(content)
    return (
        <div>
            <div className='my-5'>
                <div className='row mx-auto middle-tabs' style={{ border: '1px solid #dee2db', width: '75%', borderRadius: '8px' }}>

                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('franchising') }} className={`${tab === 'franchising' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Franchising Opportunity
                        </button>

                    </div>


                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('lab') }} className={`${tab === 'lab' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Lab Acquisition
                        </button>

                    </div>


                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('hospital') }} className={`${tab === 'hospital' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Hospital Lab Management
                        </button>

                    </div>



                    <div className='col-lg-3 col-md-6 col-sm-12 px-2 '>
                        <button onClick={() => { setTab('corporate') }} className={`${tab === 'corporate' ? 'card-button-2' : ''} px-2 py-2`} style={{ borderRadius: '12px' }}>
                            Corporate Wellness
                        </button>

                    </div>
                </div>
            </div>

            <div className='midbox-inner py-5' style={{ backgroundColor: '#f1f6ee' }}>

                {(tab === 'franchising') && <FranchisingOpport content={content} />}
                {(tab === 'lab') && <LabAcquistion content={content} />}
                {(tab === 'hospital') && <HospitalManagement content={content} />}
                {(tab === 'corporate') && <CorporateWellness content={content} />}

            </div>
        </div>
    )
}

export default BelowTabs