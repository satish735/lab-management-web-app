
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'
import '@/components/profile-side-bar/side-bar-css.css'
import MyBooking from '@/components/profile-side-bar/side-bar-items/MyBooking'
import MyFamilyMember from '@/components/profile-side-bar/side-bar-items/MyFamilyMember'
import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
const page = () => {
    return (
        <div className='position-relative'>

            <UserLayout>
                <div className='main-parent-bar-div'>

                    <div className='side-bar-main' style={{ backgroundColor: 'white' }}>

                        <SideBarProfile />
                    </div>

                    <div className='item-page-section'>
                        <MyFamilyMember />
                    </div>
                </div>

                <PhoneViewSlide />

            </UserLayout>
        </div>

    )
}

export default page