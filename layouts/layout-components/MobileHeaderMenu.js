"use client";
import Link from "next/link";
import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import {
  FaBuilding,
  FaBriefcase,
  FaFlaskVial,
  FaBlogger,
  FaLocationArrow,
  FaBox,
  FaAward,
  FaPhone,
  FaMap,
  FaHandshake,
  FaPeopleRoof,
  FaBuildingFlag,
  FaHospital,
} from "react-icons/fa6";

import { usePathname } from "next/navigation";
const MobileHeaderMenu = ({ isOpen = false, setIsOpen = () => {} }) => {
  const toggle = () => {
    setIsOpen(false);
  };
  const menuItems = [
    { type: "parent", label: "Packages & Tests" },
    {
      label: "Packages",
      href: "/health-packages",
      icon: <FaBox className="user-left-menu-icon" />,
    },
    {
      label: "Tests",
      href: "/lab-tests",
      icon: <FaFlaskVial className="user-left-menu-icon" />,
    },
    { type: "parent", label: "About Us" },
    {
      label: "Near By Centers",
      icon: <FaLocationArrow className="user-left-menu-icon" />,
      href: "/near-by",
    },

    {
      label: "Company Profile",
      href: "/about-us",
      icon: <FaBuilding className="user-left-menu-icon" />,
    },
    {
      label: "Milestones",
      href: "/about-us/milestones",
      icon: <FaMap className="user-left-menu-icon" />,
    },
    {
      label: "Awards & Acreditations",
      href: "/awards-recognitions",
      icon: <FaAward className="user-left-menu-icon" />,
    },
    { type: "parent", label: "Quick Links" },
    {
      label: "Blogs",
      href: "/blog",
      icon: <FaBlogger className="user-left-menu-icon" />,
    },
    {
      label: "Career",
      href: "/career",
      icon: <FaBriefcase className="user-left-menu-icon" />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      icon: <FaPhone className="user-left-menu-icon" />,
    },
    {
      label: "Membership Card",
      href: "/membership-card",
      icon: <FaPhone className="user-left-menu-icon" />,
    },
    
    {
      label: "Franchising Opportunity",
      href: "/partner-with-us/franchising-opportunity",
      icon: <FaPeopleRoof className="user-left-menu-icon" />,
    },
    {
      label: "Lab Acquisition",
      href: "/partner-with-us/lab-acquisition",
      icon: <FaBuildingFlag className="user-left-menu-icon" />,
    },
    {
      label: "Hospital Lab Management",
      href: "/partner-with-us/hospital-lab-management",
      icon: <FaHospital className="user-left-menu-icon" />,
    },
    {
      label: "Corporate Wellness",
      href: "/partner-with-us/corporate-wellness",
      icon: <FaHandshake className="user-left-menu-icon" />,
    },
  ];
  const pathname = usePathname();

  return (
    <Offcanvas toggle={toggle} isOpen={isOpen} style={{ width: "300px" }}>
      <OffcanvasHeader toggle={toggle}>
        <img
          alt="logo"
          src="/assets/images/elablogo.png"
          style={{
            transition: "transform .3s ease-in-out",
            translate: "translateY(1px)",
            height: 76,
            width: 130,
          }}
        />
      </OffcanvasHeader>
      <OffcanvasBody style={{ padding: "0px" }}>
        <div className="user-left-side-menu">
          {menuItems.map((item, index) => {
            if (item?.type == "parent") {
              return (
                <div className="menu-parent" key={index}>
                  <p>{item?.label}</p>
                </div>
              );
            } else {
              return (
                <Link
                  key={index}
                  href={item?.href}
                  className={`menu-button ${
                    pathname == item?.href ? "selected" : ""
                  }`}
                >
                  <span className="icon-span">{item?.icon}</span>
                  <span className="text-span"> {item?.label}</span>
                </Link>
              );
            }
          })}
        </div>
      </OffcanvasBody>
    </Offcanvas>
  );
};

export default MobileHeaderMenu;
