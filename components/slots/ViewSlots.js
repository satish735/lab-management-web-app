"use client"
import { Spinner } from 'reactstrap'
import './Slots.css'
import React from 'react'

const ViewSlots = ({ loading = false, slots = [] }) => {
    return (
        <div className='view-slots-section'>
            {loading && <div className="loading">
                <Spinner
                    style={{
                        height: "3rem",
                        width: "3rem",
                        color: "#00265c",
                    }}
                />
            </div>}
            {(!slots || slots?.length == 0) && !loading && (
                <div className="no-content-found">
                    <img
                        src="/assets/icons/custom-tables/NoContentIcon.svg"
                        alt="No content found icon"
                        height="88px"
                        width={"160px"}
                    />
                    <p className="mt-2">No content found</p>
                </div>
            )}
            {!loading && slots.length > 0 && <div>
                
                </div>}
        </div>
    )
}

export default ViewSlots
