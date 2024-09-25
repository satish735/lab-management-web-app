import React from 'react'
import { FaArrowDownLong, FaArrowUpLong } from "react-icons/fa6";
const DashboardCard = ({ paddingClass = "", heading = "", total = "", isIncrease = true, percentage = "", description = "" }) => {
    return (
        <div className={`col-lg-3 col-md-6 col-12 p-0 m-0 ${paddingClass} pt-2 `}>
            <div style={{ borderRadius: "8px", width: "100%", background: "white" }} className='p-3'>
                <h6 className='text-dark'>{heading}</h6>
                <p className='text-center mb-0' style={{ color: "var(--color-secondary)", lineHeight: "50px", fontSize: "50px", fontWeight: "600" }}>{total}</p>
                <p className='text-center mb-0' style={{ color: isIncrease?"var(--color-primary)":"var(--bs-danger)", fontSize: "16px" }}>{isIncrease ? <FaArrowUpLong /> : <FaArrowDownLong />} {percentage}% </p>
                <p className='text-center' style={{ color: 'var(--color-gray)', fontSize: "12px " }}>{description}</p>
            </div>
        </div>
    )
}

export default DashboardCard
