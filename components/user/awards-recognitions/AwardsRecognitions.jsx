'use client'
import Banner from '@/components/customdesign/Banner'
import AwardCard from '@/components/customdesign/AwardCard'
import React from 'react'
import useAPI from "@/hooks/useAPI";
import moment from 'moment'
import UserLayout from '@/layouts/UserLayout'
import LoaderGeneral from '@/components/loaders/LoaderGeneral';


const AwardsRecognitions = () => {
    const [awardaccreditationResponse, awardaccreditationHandler] = useAPI(
        {
            url: "/awardaccreditation/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {
            return e.data
        },
        (e) => {

            return e
        }
    );
    return (
        <>
  <LoaderGeneral
                noContentMessage="records are not found"
                state={
                    awardaccreditationResponse?.fetching
                        ? "loading"
                        : [null, undefined].includes(awardaccreditationResponse?.data)
                            ? "no-content"
                            : "none"

                }
            />

           {!awardaccreditationResponse?.fetching && <div>

                <div>
                    <Banner heading={' Awards and Accreditations'}
                        paragraph={' A Legacy of Healthcare Excellence Recognised with Truth, Trust and Care'} />
                </div>


                <div className=" midbox-inner" style={{ margin: '0 auto' }}>

                    <div className='row px-3 m-2'>


                        {awardaccreditationResponse?.data?.map((item, index) => <div className=" col-md-4 col-sm-6 col-12 my-3" key={index}>

                            <AwardCard
                                title={item?.name}
                                description={item?.desc}
                                imgsrc="/assets/images/blog1.jpg"
                                createddate={moment(item?.time)?.format("YYYY-MM-DD")}
                                extraprops={{ title_style: 'text-center' }}
                            />


                        </div>)}
                    </div>

                </div>
            </div>}
        </>
    )
}

export default AwardsRecognitions

