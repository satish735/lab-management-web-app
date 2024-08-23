'use client'
import React, { useState } from 'react'
import '@/components/home-component/frequently-asked-question/question-ans.css'

const FrequentlyAskQuestion = ({ item }) => {
    const [showHide, setShowHide] = useState(false)
    // console.log(item);
    return (
        <div className='ques-box-before w-100' onClick={() => {
            setShowHide(!showHide)
        }}>
            <h2 className='question d-flex justify-content-between'>
                <span>
                {item?.question}

                </span>

                <span style={{fontSize:'30px',fontWeight:'600'}}>+</span>

            </h2>
            <div>
            {
                showHide && <>
                    <hr />

                    <div className='answer'  >
                     
                        {item?.answer}
                    </div>
                </>
            }
            </div>

            


        </div>
    )
}

export default FrequentlyAskQuestion