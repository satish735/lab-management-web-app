"use client"
import Link from 'next/link'
import React from 'react'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap'

const MobileHeaderMenu = ({ isOpen = false, setIsOpen = () => { } }) => {
    const toggle = () => {
        setIsOpen(false)
    }
    const menuItems = [
        { type: "parent", label: "Packages & Tests" },
        { label: "Packages", href: "/health-packages" },
        { label: "Tests", href: "/lab-tests" },
        { type: "parent", label: "About Us", },
        { label: "Company Profile", href: "/about-us" },
        { label: "Milestones", href: "/about-us/milestones" },
        { label: "Awards & Acreditations", href: "/awards-recognitions" },
        { type: "parent", label: "Quick Links", },
        { label: "Blogs", href: "/blog" },
        { label: "Career", href: "/career" },
        { label: "Contact Us", href: "/contact-us" },
        { label: "Franchising Opportunity", href: "/partner-with-us/franchising-opportunity" },
        { label: "Lab Acquisition", href: "/partner-with-us/lab-acquisition" },
        { label: "Hospital Lab Management", href: "/partner-with-us/hospital-lab-management" },
        { label: "Corporate Wellness", href: "/partner-with-us/corporate-wellness" },
    ];
    return (
        <Offcanvas toggle={toggle} isOpen={isOpen} style={{ width: "300px" }}>
            <OffcanvasHeader toggle={toggle}>
                <img
                    alt="logo"
                    src="/assets/images/MainLogo.png"
                    style={{
                        transition: "transform .3s ease-in-out",
                        translate: "translateY(1px)",
                        height: 56,
                        width: 150,
                    }}
                />
            </OffcanvasHeader>
            <OffcanvasBody>
                <div>
                    {menuItems.map((item, index) => {
                        if (item?.type == "parent") {
                            return <div>{item?.label}</div>
                        }
                        else {
                            return <Link href={item?.href} >{item?.label}</Link>
                        }
                    }


                    )}
                </div>
            </OffcanvasBody>
        </Offcanvas>
    )
}

export default MobileHeaderMenu
