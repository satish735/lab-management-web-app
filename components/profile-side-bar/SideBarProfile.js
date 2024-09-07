'use client'
import React, { useState } from 'react'
import { FaLocationDot, FaRegAddressBook,FaUserGroup } from 'react-icons/fa6'
import { MdAccountCircle } from 'react-icons/md'

const SideBarProfile = () => {
    const [active,setActive]=useState('MyBookings')
    return (
        <div className=''  >


            <div style={{cursor:'pointer'}} className={`my-4 ${active==='MyBookings' && 'is-active'}`} onClick={(()=>{setActive('MyBookings')})}>

                <span className='mx-2'><FaRegAddressBook style={{fontSize:'20px'}} />
                </span><span>My Bookings</span>
            </div>



            <div style={{cursor:'pointer'}} className={`my-4 ${active==='MyAddress' && 'is-active'}`} onClick={(()=>{setActive('MyAddress')})}>

                <span >

                <span className='mx-2'> <FaLocationDot style={{fontSize:'20px'}} />
                </span><span>My Address</span></span>
            </div>




            <div style={{cursor:'pointer'}} className={`my-4 ${active==='MyProfile' && 'is-active'}`} onClick={(()=>{setActive('MyProfile')})}>

                <span className='mx-2'><MdAccountCircle style={{fontSize:'20px'}} />
                </span><span>My Profile</span>
            </div>

            <div style={{cursor:'pointer'}} className={`my-4 ${active==='MyFamilyMembers' && 'is-active'}`} onClick={(()=>{setActive('MyFamilyMembers')})}>

                <span className='mx-2'><FaUserGroup style={{fontSize:'20px'}} />
                </span><span>My Family Members</span>
            </div>


        </div>
    )
}

export default SideBarProfile