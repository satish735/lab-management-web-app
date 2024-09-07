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
const ProfileSlider = ({ isopencart, setisopencart  }) => {
  return (
    <div>
            <Offcanvas
                direction="bottom"
                toggle={() => { setisopencart(!isopencart) }}
                isOpen={isopencart}
                className="isopencart "
                style={{ height: '50vh'  }}
            >

                <OffcanvasBody className='off-canvas-body-profile p-0' >
                    
                <div className="bottom-profile-div text-center"  >
                    <div className="  py-4 mb-4 global-background-gradient" style={{  borderRadius: '6px' }}>
                      <div >
                        <img src="/assets/icons/MEN.png" style={{ height: '60px', width: '60px' }} />
                      </div>
                      <div style={{  }} className="ps-2" >
                        <h1 className=" text-capitalize my-1 p-0 " style={{ fontSize: '17px', fontWeight: '400' ,color:'white'}}>{'name'}</h1>
                        <p className="text-capitalize  m-0 p-0" style={{ fontSize: '13px', fontWeight: '400', color: '#3498db' }}>{'role , 5 years'}</p>
                      </div>
                    </div>


                    <div className=" text-start ps-3 my-booking" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaBook />

                      </span>
                      <span>My Bookings</span>


                    </div>

                    <div className=" text-start ps-3 my-address" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaLocationDot />


                      </span>
                      <span>My Address</span>


                    </div>

                    <div className=" text-start ps-3 my-family" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <FaUserGroup />

                      </span>
                      <span>My Family Members</span>


                    </div>
                    <div className=" text-start ps-3 my-profile" style={{margin:'35px 0', fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747',backgroundColor:'#dbe8e6',padding:'10px',borderRadius:'50%' }}>
                        <MdAccountCircle />

                      </span>
                      <span>My Profile</span>


                    </div>
                  </div>


                   
                </OffcanvasBody>
            </Offcanvas>

    </div>
  )
}

export default ProfileSlider