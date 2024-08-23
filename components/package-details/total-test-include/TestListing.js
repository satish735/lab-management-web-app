'use client'
import React, { useState } from 'react'
// import './TotalTestInclude.css'
const TestListing = ({ item }) => {
    const [showDetails, setShowDetails] = useState(false);
    return (<>
        <div onClick={() => { setShowDetails(!showDetails) }} className='my-3 py-1 px-2 d-flex justify-content-between' style={{cursor:'pointer', backgroundColor: 'white', borderRadius: '8px', color: '#21cdad', fontSize: '16px' }}>
            <div style={{cursor:'pointer'}}>
                {item?.category}
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
                    {(item?.test_names ?? []).map((values,index) => {
                        return (
                            <>
                                <p key={index} style={{ color: '#7c7c7c', marginBottom: '5px' }}><span className='me-3'>•</span>{values}</p>
                            </>
                        )
                    })

                    }
                </div>

                <hr />

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