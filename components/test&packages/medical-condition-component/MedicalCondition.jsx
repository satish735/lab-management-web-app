import React from 'react'
import { Award, Pencil } from "lucide-react";
import PackageCardBlue from '@/components/package-details/package-card/PackageCardBlue';

const MedicalCondition = () => {
    return (
        <div>

            <div className=' m-0 ps-5' style={{ background: ' linear-gradient(153deg, #000428 , #004e92)', padding: '80px 15px', color: '#fff', fontWeight: '600' }}>

                <h2 style={{ fontSize: '40px' }}>
                    Heart Diseases Test & Package
                </h2>
                <p className='my-3 mb-4' style={{ fontSize: '16px', color: 'hsla(0, 0%, 100%, .6)', fontWeight: '400' }}>
                    Access Heart Diseases Wellness through Essential Tests & Packages
                </p>

                <div className='row mb-4'>
                    <div className='d-flex col-lg-2 col-md-3 col-sm-12 gap-3'>
                        <span className='' style={{ padding: '10px 8px', backgroundColor: '#ffffff36', borderRadius: '8px' }}>
                            <Award fill='white' />

                        </span>
                        <div className='pt-1' style={{ fontSize: '12px', fontWeight: '400' }}>
                            <div style={{ color: '#e1fba6' }}>
                                NABL certified

                            </div>
                            <div>
                                In-house labs

                            </div>
                        </div>
                    </div>


                    <div className='d-flex col-lg-2 col-md-3 col-sm-12 gap-3'>
                        <span className='' style={{ padding: '10px 8px', backgroundColor: '#ffffff36', borderRadius: '8px' }}>
                            <Award fill='white' />

                        </span>
                        <div className='pt-1' style={{ fontSize: '12px', fontWeight: '400' }}>
                            <div style={{ color: '#e1fba6' }}>
                                6:30 AM - 7:30 PM


                            </div>
                            <div>
                                30 mins collection


                            </div>
                        </div>
                    </div>


                    <div className='d-flex col-lg-3 col-md-4 col-sm-12 gap-3'>
                        <span className='' style={{ padding: '10px 8px', backgroundColor: '#ffffff36', borderRadius: '8px' }}>
                            <Award fill='white' />

                        </span>
                        <div className='pt-1' style={{ fontSize: '12px', fontWeight: '400' }}>
                            <div style={{ color: '#e1fba6' }}>
                                6 hrs


                            </div>
                            <div>

                                Report Generation Time

                            </div>
                        </div>
                    </div>




                </div>



            </div>

            <div className='py-4' style={{ backgroundColor: 'white' }}>
                <div style={{ width: '95%', margin: '0 auto' }}>

                    <div style={{ fontSize: '18px', color: '#1e1e2f' }}>
                        Showing 1-10 of 10 Items
                    </div>
                    
                <div className='row mt-4'>
                    {(popular_test ?? []).map((keyValue,index) => {
                        return <PackageCardBlue listing={keyValue} key={index} lg={3} md={4} />
                    })}
                </div>
                </div>



            </div>
        </div>

    )
}

export default MedicalCondition

let popular_test = [{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }

]