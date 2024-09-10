'use client'
import Banner from '@/components/customdesign/Banner'
import AwardCard from '@/components/customdesign/AwardCard'
import React from 'react'
import useAPI from "@/hooks/useAPI";
import moment from 'moment'
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
        <div>

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
        </div>
    )
}

export default AwardsRecognitions

const blog = [
    {
        title: "Samaj Vibhushan",
        description: "Samaj Vibhushan received from the Khandelwal Vaishya Samiti.",
        createddate: '2001'

    },
    {
        title: "Shodh Sri Award",
        description: "Shodh Sri Award received from the Governor of Rajasthan for the contribution to the society.",

        createddate: '2001'
    },
    {
        title: "Healthy Living Award",
        description: "Healthy Living Award given by Zee Marudhara. Lions Club International Award for invaluable contribution towards the education sector.",

        createddate: '2001'
    },
    {
        title: "Diagnostic Award",
        description: "Excellence in Diagnostic Award received from Dainik Bhaskar & Private Hospitals & Nursing Homes Society on the occasion of Doctor's Day Eve.",

        createddate: '2001'
    },
    {
        title: "Excellence in Diagnostic Services",
        description: "By Shri Prasadi Lal Meena (Health Minister of Rajasthan) and other eminent politicians and the Doctor community for playing an active role in curbing COVID cases in Rajasthan. The Healthcare Conclave was organised by the 1st India Television Channel.",

        createddate: '2001'
    },
    {
        title: "Lifetime Achievement Award in Clinical Laboratory Science",
        description: "Dr. B. Lal Gupta, Managing Director of Dr. B. Lal Clinical Laboratory, has received the prestigious 'Voice of Healthcare - Diagnostics, Innovation, and Excellence Awards 2024'",

        createddate: '2001'
    },

]