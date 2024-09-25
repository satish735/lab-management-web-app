'use client'
import React, { useState, useEffect } from 'react'
import { FaLocationDot, FaRegAddressBook, FaUserGroup } from 'react-icons/fa6'
import { MdAccountCircle } from 'react-icons/md'
import { usePathname, useRouter } from "next/navigation";

const SideBarProfile = () => {
    const router = useRouter();
    const pathname = usePathname()
    const [active, setActive] = useState('MyBookings')
    useEffect(() => {
        if (pathname == '/my-profile') {
            setActive('MyProfile')
        } else if (pathname == '/mybookings') {
            setActive('MyBookings')
        } else if (pathname == '/my-address') {
            setActive('MyAddress')
        } else if (pathname == '/myfamilymembers') {
            setActive('MyFamilyMembers')
        }

    }, [pathname])
    return (
        <div className=''  >
            <div style={{ cursor: 'pointer' }} className={`my-4 ${active === 'MyBookings' && 'is-active'}`} onClick={(() => {
                setActive('MyBookings')
                router?.push('/mybookings')
            })}>

                <span className='mx-2'><FaRegAddressBook style={{ fontSize: '20px' }} />
                </span><span>My Bookings</span>
            </div>



            <div style={{ cursor: 'pointer' }} className={`my-4 ${active === 'MyAddress' && 'is-active'}`} onClick={(() => {
                setActive('MyAddress')
                router?.push('/my-address')

            })}>

                <span >

                    <span className='mx-2'> <FaLocationDot style={{ fontSize: '20px' }} />
                    </span><span>My Address</span></span>
            </div>




            <div style={{ cursor: 'pointer' }} className={`my-4 ${active === 'MyProfile' && 'is-active'}`}
                onClick={(() => {
                    setActive('MyProfile')
                    router?.push('/my-profile')

                })}>

                <span className='mx-2'><MdAccountCircle style={{ fontSize: '20px' }} />
                </span><span>My Profile</span>
            </div>

            <div style={{ cursor: 'pointer' }} className={`my-4 ${active === 'MyFamilyMembers' && 'is-active'}`}
                onClick={(() => {
                    setActive('MyFamilyMembers')
                    router?.push('/myfamilymembers')

                })}>

                <span className='mx-2'><FaUserGroup style={{ fontSize: '20px' }} />
                </span><span>My Family Members</span>
            </div>


        </div>
    )
}

export default SideBarProfile