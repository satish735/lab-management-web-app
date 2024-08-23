import React from 'react'
import '@/components/home-component/popular-test/popular-test-bottom-portion.css'

const PopularLinkComponent = ({ item }) => {
    return (
        <div style={{ justifyContent: 'center' }}>{
            (item ?? []).map((value,index) => {
                return <span className='links-test' style={{lineHeight:'1.9'}}  key={index}>
                     {value}  |   {}
                     
                </span>
            })
        }

        </div>
    )
}

export default PopularLinkComponent