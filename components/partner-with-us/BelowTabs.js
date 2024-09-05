'use client'
import React, { useState } from 'react'
import FranchisingOpport from './FranchisingOpport';
import LabAcquistion from './LabAcquistion';
import HospitalManagement from './HospitalManagement';
import CorporateWellness from './CorporateWellness';
import useAPI from '@/hooks/useAPI';
import toast from 'react-hot-toast';
import transformErrorDefault from '@/utils/transformErrorDefault';

const BelowTabs = () => {

    const [tab, setTab] = useState('franchising-opportunity');

    // const [getdata, setdata]= useState({})

    // const [partbersResponse, partbersHandler] = useAPI(
    //     {
    //         url: `/partnerwithus`,
    //         method: "get",
    //         sendImmediately: true
    //     },
    //     (e) => {
    //         setdata(e)
    //         return e
    //     },
    //     (e) => {

    //         toast.error(
    //             transformErrorDefault(
    //                 "Something went wrong while creating blog!",
    //                 e
    //             )
    //         );
    //         return e;
    //     }
    // );

    // console.log(getdata);
    
    return (
        <div>
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

            <div className='midbox-inner py-5' style={{backgroundColor:'#f1f6ee'}}>

                {(tab==='franchising-opportunity') && <FranchisingOpport />}
                {(tab==='lab-acquisition') && <LabAcquistion />}
                {(tab==='hospital-lab-management') && <HospitalManagement />}
                {(tab==='corporate-wellness') && <CorporateWellness />}

            </div>
        </div>
    )
}

export default BelowTabs