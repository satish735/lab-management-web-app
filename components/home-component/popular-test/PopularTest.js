import React from 'react'
import '@/components/home-component/popular-test/popular-test-bottom-portion.css'
import PopularLinkComponent from './PopularLinkComponent'

const PopularTest = () => {
    return (
        <div className='popular-tests-link-div  '>
            <div className='midbox-inner' >

                <h2 className='heading-text-popular-tests'>
                    Popular Tests
                </h2>

                <div >

                    <PopularLinkComponent item={array} />

                </div>

                <hr className='dashed-2 my-4' />

                <h2 className='heading-text-popular-tests '>
                    Popular Categories
                </h2>

                <div >

                    <PopularLinkComponent item={array} />

                </div>


                <hr className='dashed-2 my-4' />


                <h2 className='heading-text-popular-tests'>
                    City Wise Diagnostic Center
                </h2>

                <div >

                    <PopularLinkComponent item={array} />

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