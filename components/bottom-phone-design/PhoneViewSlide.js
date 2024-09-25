'use client'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaBox, FaMicroscope } from 'react-icons/fa6'
import '@/components/profile-side-bar/side-bar-css.css'
import React, { useState } from 'react'
import { MdAccountCircle } from 'react-icons/md'
import ProfileSlider from './ProfileSlider'
import { useRouter } from 'next/navigation'
const PhoneViewSlide = () => {
    const [isopencart, setisopencart] = useState(false)

    const router = useRouter();
    return (
        <div className='mobile-view '  >
            <div style={{ width: '20%' }} onClick={() => { router.push('/') }}>
                <div className='text-center'>
                    <span style={{ color: '#003747' }}>
                        <FaMicroscope size={18} className="phone-icon" />
                    </span>
                </div>

                <div className='text-center'>
                    Home
                </div>
            </div>


            <div style={{ width: '20%' }} onClick={() => { router.push('/health-packages') }}>
                <div className='text-center'>
                    <span style={{ color: '#003747' }}>
                        <FaBox size={18} className="phone-icon" />                    </span>
                </div>

                <div className='text-center'>
                    Packages
                </div>
            </div>




            <div style={{ width: '20%' }} onClick={() => { router.push('/') }}>
                <div className='text-center pt-2'>
                    <span style={{ color: 'white', backgroundColor: '#003747', padding: '9px 9px 10px 10px', borderRadius: '50%' }}>
                        <FaPhoneAlt size={18} className="phone-icon" />

                    </span>
                </div>


            </div>



            <div style={{ width: '20%' }} onClick={() => { router.push('/lab-tests') }}>
                <div className='text-center'>
                    <span style={{ color: '#003747' }}>
                        <FaMicroscope size={18} className="phone-icon" />
                    </span>
                </div>

                <div className='text-center'>
                    Tests
                </div>
            </div>



            <div style={{ width: '20%' }} onClick={() => { setisopencart(!isopencart) }}>
                <div className='text-center'>
                    <span style={{ color: '#003747' }}>
                        <MdAccountCircle size={22} className="phone-icon" />
                    </span>
                </div>

                <div className='text-center'>
                    Profile
                </div>
                {
                    <ProfileSlider isopencart={isopencart} setisopencart={setisopencart} />
                }
            </div>





        </div>
    )
}

export default PhoneViewSlide