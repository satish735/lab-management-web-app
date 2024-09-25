"use client";
import Link from "next/link";
import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import {
  FaSquarePollVertical,
  FaCalendarDay,
  FaTicket,
  FaCoins,
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaFlaskVial,
  FaHandHoldingMedical,
  FaLungs,
  FaBlogger,
} from "react-icons/fa6";
import {
  FaHouseUser,
  FaHospitalUser,
  FaUser,
  FaQuestion,
  FaTags,
} from "react-icons/fa";
import {
  TbLayoutDashboardFilled,
  TbReportSearch,
  TbPackages,
} from "react-icons/tb";
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
      icon: <FaFlaskVial className="admin-left-menu-icon" />,
    },
    {
      label: "Tests",
      href: "/lab-tests",
      icon: <FaFlaskVial className="admin-left-menu-icon" />,
    },
    { type: "parent", label: "About Us" },
    {
      label: "Company Profile",
      href: "/about-us",
      icon: <FaBuilding className="admin-left-menu-icon" />,
    },
    {
      label: "Milestones",
      href: "/about-us/milestones",
      icon: <FaBuilding className="admin-left-menu-icon" />,
    },
    {
      label: "Awards & Acreditations",
      href: "/awards-recognitions",
      icon: <FaBuilding className="admin-left-menu-icon" />,
    },
    { type: "parent", label: "Quick Links" },
    {
      label: "Blogs",
      href: "/blog",
      icon: <FaBlogger className="admin-left-menu-icon" />,
    },
    {
      label: "Career",
      href: "/career",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
    {
      label: "Franchising Opportunity",
      href: "/partner-with-us/franchising-opportunity",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
    {
      label: "Lab Acquisition",
      href: "/partner-with-us/lab-acquisition",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
    {
      label: "Hospital Lab Management",
      href: "/partner-with-us/hospital-lab-management",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
    {
      label: "Corporate Wellness",
      href: "/partner-with-us/corporate-wellness",
      icon: <FaBriefcase className="admin-left-menu-icon" />,
    },
  ];
  const pathname = usePathname();

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
      <OffcanvasBody style={{ padding: "0px" }}>
        <div className="user-left-side-menu">
          {menuItems.map((item, index) => {
            if (item?.type == "parent") {
              return (
                <div className="menu-parent">
                  <p>{item?.label}</p>
                </div>
              );
            } else {
              return (
                <Link
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
