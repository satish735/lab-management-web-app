import PackagesDetails from '@/components/package-details/about-package/PackagesDetails'
import FrequentlyBookedTogether from '@/components/package-details/frequently-booked/FrequentlyBookedTogether'
import PackageCardDesign from '@/components/package-details/package-card/PackageCardDesign'
import TotalTestInclude from '@/components/package-details/total-test-include/TotalTestInclude'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'

const page = () => {
    return (
        <UserLayout>
        <div className='py-3' style={{ backgroundColor: '#f2f4f8' }}>

            <div className='row' style={{ width: '95%', margin: '0 auto', backgroundColor: '#f2f4f8' }}>
                <div className='col-lg-4 col-md-4 col-sm-12'>
                    <PackagesDetails />
                </div>

                <div className='col-lg-8 col-md-8 col-sm-12'>

                    <TotalTestInclude total_test={total_test} />


                </div>

            </div>

            <div style={{ width: '95%', margin: '0 auto' }}>
                <div className=' frequent-buy-packages-backgroud' >
                    <div className='frequent-buy-packages-backgroud-overlay px-3 pt-5'>


                        <div className='row'>
                            <div className='col-lg-4 col-md-4 col-sm-12'>
                                <div className='vertical-image-div' >


                                    <span className='frequent-booked'>
                                        Frequently Booked Together

                                    </span>

                                    <div className='hidden-div'></div>

                                </div>
                            </div>

                            <div className='col-lg-8 col-md-8 col-sm-12 ' style={{ overflowY: 'scroll' }}>
                                <div className='row pt-4'>


                                    {
                                        (popular_test ?? []).map((listing, index) => {
                                            return <PackageCardDesign listing={listing} key={index} />
                                        })
                                    }
                                    {/* PackageCardDesign */}
                                </div>

                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>
        </UserLayout>
    )
}

export default page


let total_test = [
    {
        category: 'COMPLETE BLOOD COUNT( CBC/HAEMOGRAM)', test_names: ['Haemoglobin',
            'Haematocrit (HCT)',
            'Red Blood Cell Count (RBC)',
            'Mean Corposcular Volume (MCV)',
            'Mean Corposcular Haemoglobin (MCH)',
            'Mean Corposcular Haemoglobin Conc.(MCHC)',
            'Red Cell Distribution Width (RDWcv)',
            'Total Leucocyte Count (TLC)',
            '<b>Differential Leucocyte Count</b>',
            'Segmented Neutrophils',
            'Lymphocytes',
            'Eosinophils',
            'Monocytes',
            'Basophils',
            '<b>Absolute Leucocyte Count</b>',
            'Neutrophils',
            'Lymphocytes.',
            'Eosinophils.',
            'Monocytes.',
            'Basophils.',
            'Platelet count',
            'Mean Platelet Volume (MPV)']

    },
    {
        category: 'GLUCOSE (FASTING)', test_names: ['Glucose (F)']
    },
    {
        category: 'GLYCATED HAEMOGLOBIN A1c (HbA1c)', test_names: ['Hemoglobin A1c (%)']
    }, {
        category: 'ERYTHROCYTES SEDIMENTATION RATE(ESR)', test_names: ['Erythrocytes Sedimentation Rate']
    }, {
        category: 'LIPID PROFILE', test_names: ['Total Cholesterol',
            'HDL Cholesterol',
            'LDL Cholesterol',
            'Triglyceride',
            'Non HDL Cholesterol',
            'Cholesterol : HDL Rat,io']
    },
]

let popular_test = [{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }

]