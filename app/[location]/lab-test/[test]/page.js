'use client'
 
import TestsDetails from '@/components/test-details/about-test/TestsDetails'
import TestCardDesign from '@/components/test-details/test-card/TestCardDesign'
import TotalTestInclude from '@/components/test-details/total-test-include/TotalTestInclude'
import useAPI from '@/hooks/useAPI'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'
import toast from 'react-hot-toast'

const page = ({ searchParams }) => {


    

  const [allTestResponse, allTestHandler] = useAPI(
    {
      url: "/test/lists",
      method: "get",
      sendImmediately: true,
      params: {
        // sortColumn: sort?.column,
        // sortDirection: sort?.direction,
        pageNo: 1,
        pageSize: 20,
        // searchQuery: searchValue,
      },
    },
    (e) => {


 
      let tests = (e?.data ?? []).filter((item) => {
        return item.testType === 'Test' && searchParams.id !==item?._id
      });

      return { testList: tests }
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting tests!",
        e
      ));
      return e
    }
  );

    const [testResponse, testHandler] = useAPI(
        {
            url: `/getSinglePackageDetails/${searchParams?.id} `,
            method: "get",
            sendImmediately: true,

        },
        (e) => {

            console.log(e);

            return e
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting test!",
                e
            ));
            return e
        }
    );
    return (
        <UserLayout>
            <div className='py-3' style={{ backgroundColor: '#f2f4f8' }}>

                <div className='row' style={{ width: '95%', margin: '0 auto', backgroundColor: '#f2f4f8' }}>
                    <div className='col-lg-4 col-md-4 col-sm-12'>
                        <TestsDetails packageData={testResponse?.data} />
                    </div>

                    <div className='col-lg-8 col-md-8 col-sm-12'>

                        <TotalTestInclude total_test={testResponse?.data} />


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
                                            (allTestResponse?.data?.testList ?? []).map((listing, index) => {
                                                return <TestCardDesign listing={listing} key={index} />
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

 
let popular_test = [{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
{ test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' },
    // { test_name: 'Vitamin D', test_price: '450', no_of_observation: '1', no_of_hours: '16' }

]