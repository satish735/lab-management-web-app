"use client"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
const MyBookingProfileInfo = () => {

    return (<>
        <div className='main-parent-bar-div'>
            <div className='side-bar-main' style={{ backgroundColor: 'white' }}>
                <SideBarProfile />
            </div>
            <div className='item-page-section'>
    
            </div>
        </div>

    </>)
}
export default MyBookingProfileInfo