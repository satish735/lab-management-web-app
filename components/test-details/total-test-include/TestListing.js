'use client'
import React, { useState } from 'react'
// import './TotalTestInclude.css'
const TestListing = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (<>
        <div onClick={() => { setShowDetails(!showDetails) }} className='my-3 py-1 px-2 d-flex justify-content-between' style={{ cursor: 'pointer', backgroundColor: 'white', borderRadius: '8px', color: '#21cdad', fontSize: '16px' }}>
            <div style={{ cursor: 'pointer' }}>
                Observations Included
            </div>

            <div>
                <span  >
                    ▼
                </span>

            </div>


        </div>
        {!showDetails &&

            <hr />

        }

        {showDetails &&

            <>
                <div className='px-3'>
                    {(item  ?? []).map((values, index) => {
                        return (
                            <>
                                <p key={index} style={{ color: '#7c7c7c', marginBottom: '5px' }}><span className='me-3'>•</span>{values}</p>
                            </>
                        )
                    })

                    }
                </div>

               

            </>

        }



    </>
    )
}

// position: relative;
// color: #7c7c7c;
// padding - left: 15px;
// margin - bottom: 10px;
// font - size: 14px;
// margin - left: 17px;
// list - style: none;

export default TestListing


// [
//     {
//         "_id": "66cb08a03c986b236354d9c6",
//         "itemId": [],
//         "name": "GLYCATED HAEMOGLOBIN A1c (HbA1c)",
//         "rate": 3000,
//         "desc": "Glycosylated Hb (GHb) will be proportional to mean plasma glucose levels during the previous 6-12 weeks. It helps determine whether you are at an increased risk of developing diabetes, diagnose diabetes and prediabetes, and monitor long-term glucose control. Advantages to using HbA1c for diagnosis include: provides an assessment of chronic hyperglycemia, no fasting is necessary, and a single test can be used for both diagnosing and monitoring diabetes.",
//         "bodyParts": [
//             "66c624710de4e1b1d62e7b29"
//         ],
//         "conditions": [
//             "66c76a05b7d422211b927962"
//         ],
//         "totalMrp": null,
//         "gender": "both",
//         "fromAge": 20,
//         "toAge": 60,
//         "observation": [
//             "Hemoglobin A1c (%)"
//         ],
//         "discountPercentage": 10,
//         "reportGenerationHours": 20,
//         "image": "public/04c6121c-53e9-701e-2bb1-1c345215658f.jpg",
//         "testType": "Test",
//         "isBestSeller": false,
//         "homeCollection": true,
//         "isTrigger": false,
//         "nearMe": false,
//         "sampleCollection": "EDTA Blood",
//         "preparation": "No specific preparation required",
//         "packageTestList": [],
//         "is_delete": false,
//         "slug": "glycated-haemoglobin-a1c-(hba1c)",
//         "__v": 0
//     },
//     {
//         "_id": "66cb09073c986b236354d9c8",
//         "itemId": [],
//         "name": "COMPLETE BLOOD COUNT( CBC/HAEMOGRAM)",
//         "rate": 6000,
//         "desc": "Glycosylated Hb (GHb) will be proportional to mean plasma glucose levels during the previous 6-12 weeks. It helps determine whether you are at an increased risk of developing diabetes, diagnose diabetes and prediabetes, and monitor long-term glucose control. Advantages to using HbA1c for diagnosis include: provides an assessment of chronic hyperglycemia, no fasting is necessary, and a single test can be used for both diagnosing and monitoring diabetes.",
//         "bodyParts": [
//             "66c624710de4e1b1d62e7b29"
//         ],
//         "conditions": [
//             "66c76a05b7d422211b927962"
//         ],
//         "totalMrp": null,
//         "gender": "both",
//         "fromAge": 20,
//         "toAge": 70,
//         "observation": [
//             "Haemoglobin",
//             "Red Blood Cell Count (RBC)",
//             "Mean Corposcular Volume (MCV)",
//             "Mean Corposcular Haemoglobin (MCH)",
//             "Mean Corposcular Haemoglobin Conc.(MCHC)"
//         ],
//         "discountPercentage": 25,
//         "reportGenerationHours": 20,
//         "image": "public/8e302480-7f5c-b754-c408-ae06e34fbf9a.jpg",
//         "testType": "Test",
//         "isBestSeller": false,
//         "homeCollection": true,
//         "isTrigger": false,
//         "nearMe": false,
//         "sampleCollection": "EDTA Blood",
//         "preparation": "No specific preparation required",
//         "packageTestList": [],
//         "is_delete": false,
//         "slug": "complete-blood-count(-cbchaemogram)",
//         "__v": 0
//     }
// ]