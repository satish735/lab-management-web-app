
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'
import '@/components/profile-side-bar/side-bar-css.css'
import MyProfile from '@/components/profile-side-bar/side-bar-items/MyProfile'
import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
const page = () => {
    return (
        <div className='position-relative'>

            <UserLayout>
                <div className='main-parent-bar-div mb-5'>

                    <div className='side-bar-main' style={{ backgroundColor: 'white' }}>

                        <SideBarProfile />
                    </div>

                    <div className='item-page-section'>
                        <MyProfile />
                    </div>
                </div>


                <PhoneViewSlide />




            </UserLayout>
        </div>

    )
}

export default page