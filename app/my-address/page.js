
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import UserLayout from '@/layouts/UserLayout'
import React from 'react'
import '@/components/profile-side-bar/side-bar-css.css'
import MyAddress from '@/components/profile-side-bar/side-bar-items/MyAddress'
import PhoneViewSlide from '@/components/bottom-phone-design/PhoneViewSlide'
const page = () => {
    return (
 
                 <div className='main-parent-bar-div'>

                    <div className='side-bar-main' style={{ backgroundColor: 'white' }}>

                        <SideBarProfile />
                    </div>

                    <div className='item-page-section'>
                        <MyAddress />
                    </div>
                </div>
 

      )
}

export default page