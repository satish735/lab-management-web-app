"use client"
import React from 'react'
import { Award, Pencil } from "lucide-react";
import PackageCardBlue from '@/components/package-details/package-card/PackageCardBlue';
import useAPI from '@/hooks/useAPI';
import PackageCardDesign from '@/components/package-details/package-card/PackageCardDesign';
import toast from 'react-hot-toast';
import transformErrorDefault from '@/utils/transformErrorDefault';
import TestCardDesign from '@/components/test-details/test-card/TestCardDesign';

const MedicalCondition = ({ searchParams, type }) => {



    const [allPackageResponse, allPackageHandler] = useAPI(
        {
            url: "/getTestPackageWithType",
            method: "get",
            sendImmediately: true,
            params: {

                type: 'bodyParts',//
                id: searchParams?.id
            },
        },
        (e) => {

            let packages = [];
            let tests = [];


            console.log(e);
            if (type === 'bodypart') {


                (e?.PackageTestInstanceListing ?? []).forEach(item => {
                    if (item.testType === 'Test' && item.bodyParts.includes(searchParams?.id)) {
                        tests.push(item);
                    } else if (item.testType === 'Package') {
                        const packageItems = item.itemId.filter(packageItem =>
                            packageItem.bodyParts.includes(searchParams?.id)
                        );

                        if (packageItems.length > 0) {
                            packages.push({
                                ...item,
                                itemId: packageItems
                            });
                        }
                    }
                });
            }

            if (type === 'testcondition') {



                (e?.PackageTestInstanceListing ?? []).forEach(item => {
                    if (item.testType === 'Test' && item.conditions.includes(searchParams?.id)) {
                        tests.push(item);
                    } else if (item.testType === 'Package') {
                        const packageItems = item.itemId.filter(packageItem =>
                            packageItem.conditions.includes(searchParams?.id)
                        );

                        if (packageItems.length > 0) {
                            packages.push({
                                ...item,
                                itemId: packageItems
                            });
                        }
                    }
                });
            }

            return { package: packages, test: tests, length: (packages ?? []).length + (tests ?? []).length }

        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting tests!",
                e
            ));
            return e
        }
    );

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    return (
        <div>

            <div className=' m-0 ps-5 global-background-gradient' style={{ padding: '80px 15px', color: '#fff', fontWeight: '600' }}>

                <h2 style={{ fontSize: '40px' }}>
                    {(type === 'testcondition') ? capitalizeFirstLetter(searchParams?.disease) : capitalizeFirstLetter(searchParams?.part)} Test & Package
                </h2>
                <p className='my-3 mb-4' style={{ fontSize: '16px', color: 'hsla(0, 0%, 100%, .6)', fontWeight: '400' }}>
                    Access {(type === 'testcondition') ? capitalizeFirstLetter(searchParams?.disease) : capitalizeFirstLetter(searchParams?.part)} Wellness through Essential Tests & Packages
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
                                8:00 AM - 8:00 PM


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
                        Showing {allPackageResponse?.data?.length ?? ''} Packages & Tests
                    </div>

                    <div className='row mt-4'>
                        {(allPackageResponse?.data?.package ?? []).map((keyValue, index) => {
                            return <PackageCardDesign listing={keyValue} lg={3} md={3} key={index} />
                        })}


                        {(allPackageResponse?.data?.test ?? []).map((keyValue, index) => {
                            return <TestCardDesign listing={keyValue} lg={3} md={3} key={index} />
                        })}


                    </div>
                </div>



            </div>
        </div>

    )
}

export default MedicalCondition

// allPackageResponse?.data?.packageList

let popular_test = [{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }

]