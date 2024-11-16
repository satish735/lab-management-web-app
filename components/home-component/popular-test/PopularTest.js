'use client'
import React, { useState } from 'react'
import '@/components/home-component/popular-test/popular-test-bottom-portion.css'
import PopularLinkComponent from './PopularLinkComponent'
import useAPI from '@/hooks/useAPI'

const PopularTest = () => {

    const [ListingFields, setListingFields] = useState({});
    const [getBasicDetailsResponse, getBasicDetailsHandler] = useAPI(
        {
            url: "/getTestAndCenterListing",
            method: "get",
            sendImmediately: true,

        },
        (e) => {



            let CenterListing = (e?.CenterListing ?? []).map((item) => {
                return { label: item?.city, value: item?._id }
            })

 
            let TestListing = (e?.PackageTestInstanceListing ?? []).map((item) => {


                return { label: item?.name, value: item?._id }
            })
            setListingFields({
                CenterListing: CenterListing, TestListing: TestListing
            })


            // toast.success("");
            // setisSubmit(false)
        },
        (e) => {
            // setisSubmit(false)
            //  transformErrorDefault(
            //     "Something went wrong while creating Test Case!",
            //     e
            // );
        }
    );





    return (
        <div className='popular-tests-link-div  '>
            <div className='midbox-inner' >

                <h2 className='heading-text-popular-tests'>
                    Popular Tests
                </h2>

                <div >

                    <PopularLinkComponent item={ListingFields?.TestListing ?? []} type={'test'} />

                </div>



                <hr className='dashed-2 my-4' />


                <h2 className='heading-text-popular-tests'>
                    City Wise Services
                </h2>

                <div >

                    <PopularLinkComponent item={ListingFields?.CenterListing ?? []} type={'center'}  />

                </div>

            </div>

        </div>
    )
}

export default PopularTest

let array = ['COMPLETE BLOOD COUNT( CBC/HAEMOGRAM) ',
    'GLUCOSE (FASTING) ',
    'GLUCOSE (RANDOM) ',
    'ERYTHROCYTES SEDIMENTATION RATE(ESR) ',
    'CREATININE ',
    'SGPT (ALT) ',
    'LFT-LIVER FUNCTION TEST ',
    'GLYCATED HAEMOGLOBIN A1c (HbA1c) ',
    'TSH 3rd GEN-THYROID STIMULATING HORMONE ',
    'LIPID PROFILE ',
    'SGOT (AST) ',
    'THYROID PROFILE ',
    'URINE COMPLETE EXAMINATION AUTOMATION ',
    'HOME COLLECTION ',
    'KFT-KIDNEY FUNCTION TEST ',
    'GLUCOSE (POST PRANDIAL 2 Hrs.) ',
    'VITAMIN B12 (CYANOCOBALAMIN) ',
    'VITAMIN D (25 Hydroxy Vit D) ',
    'URINE COMPLETE EXAMINATION ',
    'CRP (QUANTITATIVE) ',
    'CALCIUM ',
    'ABO & RH TYPING (BLOOD GROUP) BY COLUMN AGGLUTINATION']