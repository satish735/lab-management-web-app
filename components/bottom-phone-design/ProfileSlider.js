'use client'
import React from 'react'
import { FaBook, FaLocationDot, FaUserGroup } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import {
    Offcanvas,
    OffcanvasBody,
    NavItem,
    Nav,
    Button
} from "reactstrap";
import './bottom-slider.css'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { calculateAgeInYears } from '@/layouts/layout-components/UserHeader2';

const ProfileSlider = ({ isopencart, setisopencart  }) => {
  const router = useRouter()
  const session=useSession()

  console.log(session);
  
  return (
    <div>
            <Offcanvas
                direction="bottom"
                toggle={() => { setisopencart(!isopencart) }}
                isOpen={isopencart}
                className="isopencart "
                style={{ height: '72vh'  }}
            >

                <OffcanvasBody className='off-canvas-body-profile p-0' >
                    
                <div className="bottom-profile-div text-center"  >
                    <div className="  py-4 mb-4 global-background-gradient" style={{  borderRadius: '6px' }}>
                      <div >
                        <img src="/assets/icons/MEN.png" style={{ height: '60px', width: '60px' }} />
                      </div>
                      <div style={{  }} className="ps-2" >
                        <h1 className=" text-capitalize my-1 p-0 " style={{ fontSize: '17px', fontWeight: '400' ,color:'white'}}>{session?.data?.user?.name ?? 'User Name'}</h1>
                        <p className="text-capitalize  m-0 p-0" style={{ fontSize: '13px', fontWeight: '400', color: '#3498db' }}>{(session?.data?.user?.otherDetails?.dob ) ? calculateAgeInYears(session?.data?.user?.otherDetails?.dob ?? null):'0'} years</p>
                      </div>
                    </div>


                    <div onClick={()=>{ router.push("/mybookings")}} className="   text-start ps-3 my-booking  " style={{margin:'35px 0', fonSize: '17px', fonWeight: '500'  }}>

                      <span style={{ marginRight: '15px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaBook />

                      </span>
                      <span style={{fontWeight:'600' }}>My Bookings</span>


                    </div>

                    <div onClick={()=>{ router.push("/my-address")}} className=" text-start ps-3 my-address" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '15px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaLocationDot />


                      </span>
                      <span style={{fontWeight:'600' }}>My Address</span>


                    </div>

                    <div onClick={()=>{ router.push("/myfamilymembers")}} className=" text-start ps-3 my-family" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '15px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaUserGroup />

                      </span>
                      <span style={{fontWeight:'600' }}>My Family Members</span>


                    </div>
                    <div onClick={()=>{ router.push("/my-profile")}} className=" text-start ps-3 my-profile" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '15px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <MdAccountCircle />

                      </span>
                      <span style={{fontWeight:'600' }}>My Profile</span>


                    </div>
                  </div>


                   
                </OffcanvasBody>
            </Offcanvas>

    </div>
  )
}

export default ProfileSlider