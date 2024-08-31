"use client";
import haversine from "haversine";
import { useEffect, useState } from "react";
import "./UserHeader2.css";
import { Navbar, NavbarBrand } from "reactstrap";
import MultiLevelDropDown from "@/components/multilevel-dropdown/MultiLevelDropDown";
import { Navigation, Phone } from "lucide-react";
import {
  FaPhone,
  FaClock,
  FaLocationArrow,
  FaMicroscope,
  FaBox,
  FaChevronDown,
  FaCartShopping,
  FaBell,
} from "react-icons/fa6";
const UserHeader2 = () => {
  const [currentCity, setCurrentCity] = useState(null);
  useEffect(() => {
    const findNearestCity = (currentLat, currentLon) => {
      let nearestCity = null;
      let shortestDistance = Infinity;
      for (let city of cityList) {
        const start = { latitude: currentLat, longitude: currentLon };
        const end = {
          latitude: parseFloat(city.Latitude),
          longitude: parseFloat(city.Longitude),
        };
        const distance = haversine(start, end);
        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestCity = city?.QueryCityName;
        }
      }
      return nearestCity;
    };
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const nearestCity = findNearestCity(latitude, longitude);
          setCurrentCity(nearestCity);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);
  const menuItems = [
    {
      type: "parent",
      label: "Tests & Packages",
      menu: [
        { label: "Tests", href: "/home-collection" },
        { label: "Packages", href: "/health-packages" },
        // { label: "Corporate Report Panel", href: "#" },
      ],
    },
    {
      type: "parent",
      label: "Our Team",
      menu: [
        { label: "Health bulitin", href: "/doctors/health-bulletin" },
        // { label: "Corporate Report Panel", href: "#" },
      ],
    },
    {
      type: "parent",
      label: "About Us",
      menu: [
        { label: "Company Profile", href: "/about-us" },
        { label: "Milestones", href: "/about-us/milestones" },
        { label: "Awards & Acreditations", href: "/awards-recognitions" },
        // { label: "Life at Blal Labs", href: "#" },
      ],
    },
    {
      type: "parent",
      label: "Quick Links",
      menu: [
        { label: "Blogs", href: "/blog" },
        { label: "Career", href: "/career" },
        { label: "Member ship", href: "/membership-card" },
        { label: "Contact Us", href: "#" },
        {
          label: "Partner With Us",
          href: "#",
          type: "sub-menu",
          menu: [

            { label: "Franchising Opportunity", href: "#" },
            { label: "Lab Acquisition", href: "#" },
            { label: "Hospital Lab Management", href: "#" },
            { label: "Corporate Wellness", href: "#" },
            { label: "Regional Partner", href: "#" },
          ],
        },
      ],
    },
  ];
  const [cartItemCount, setCartItemCount] = useState("4");
  const [bellItemCount, setBellItemCount] = useState("4");

  return (
    <div className="header header-layout1">
      <div className="header-topbar">
        <div className="midbox-inner">
          <div className="row align-items-center">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between">
                <ul className="contact-list d-flex flex-wrap align-items-center list-unstyled mb-0">
                  <li>
                    <FaPhone size={18} className="phone-icon" />
                    <a href="tel:+5565454117">9739923174 | 1800000000 </a>
                  </li>
                  <li>
                    <FaClock size={18} className="phone-icon" />
                    <a href="contact-us.html">  8:00 AM - 8:00 PM - (365 Days)</a>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <ul className="header-topbar-links d-flex list-unstyled mb-0 mr-10">
                    <li>
                      <FaLocationArrow size={18} className="phone-icon" />
                      <a
                        href="/near-by"
                        className="header-nearby-labs"
                      >
                        Find Nearby Labs
                      </a>
                    </li>
                    <li>
                      <FaBox size={18} className="phone-icon" />

                      <a href="/health-packages" className="header-packages">
                        Packages
                      </a>
                    </li>
                    <li>
                      <FaMicroscope size={18} className="phone-icon" />

                      <a href="/home-collection" className="header-tests">
                        Tests
                      </a>
                    </li>
                  </ul>
                  <div className="miniPopup-language-area">
                    <button
                      className="miniPopup-language-trigger"
                      type="button"
                    >
                      <span className="btn-text">
                        {cityList.find(
                          (item) => item?.QueryCityName == currentCity
                        )?.CityName ?? "Select Location"}
                      </span>

                      <FaChevronDown size={14} className="dropdonw-arrow" />
                      <span className="btn-shape"></span>
                    </button>
                    <ul className="miniPopup miniPopup-language list-unstyled">
                      <li>
                        <button>
                          <img src="/assets/icons/en.png" alt="en" />
                          <span>English</span>
                        </button>
                      </li>
                      <li>
                        <button>
                          <img src="/assets/icons/gr.png" alt="en" />
                          <span>Germany</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottombar">
        <Navbar
          color="light"
          light
          // fixed="top"
          style={{
            height: "80px",
            background: "white !important",
            padding: 0,
          }}
        >
          <div
            className="midbox-inner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              verticalAlign: "center",
            }}
          >
            <div className="d-flex" style={{ alignItems: "center" }}>
              <NavbarBrand href="/">
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
              </NavbarBrand>
              <MultiLevelDropDown data={menuItems} />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "max-content",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <a href="/cart" className=" cart-button">
                  <FaCartShopping size={20} className="cart-icon" />
                  {Number.isInteger(Number(cartItemCount)) &&
                    Number(cartItemCount) > 0 && (
                      <div className="cart-badge">{cartItemCount}</div>
                    )}
                </a>
                {/* <a className=" cart-button">
                  <FaBell size={20} className="cart-icon" />
                  {Number.isInteger(Number(cartItemCount)) &&
                    Number(cartItemCount) > 0 && (
                      <div className="cart-badge">{cartItemCount}</div>
                    )}
                </a> */}
                <a
                  type="button"
                  className="btn  call-button"
                  href="tel:+919166125555"
                >
                  <FaPhone size={18} className="call-icon" />
                  +91 9739923174
                </a>
                <a type="button" className="btn login-button" href="/login">
                  Login
                </a>
              </div>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
};
const cityList = [
  {
    QueryCityName: "jaipur",
    Latitude: 26.9124,
    Longitude: 75.7873,
    CityName: "Jaipur",
  },
  {
    QueryCityName: "ajmer",
    Latitude: 26.4499,
    Longitude: 74.6399,
    CityName: "Ajmer",
  },
  {
    QueryCityName: "kota",
    Latitude: 25.2138,
    Longitude: 75.8648,
    CityName: "Kota",
  },
  {
    QueryCityName: "udaipur",
    Latitude: 24.5854,
    Longitude: 73.7125,
    CityName: "Udaipur",
  },
  {
    QueryCityName: "jodhpur",
    Latitude: 26.2389,
    Longitude: 73.0243,
    CityName: "Jodhpur",
  },
  {
    QueryCityName: "bikaner",
    Latitude: 28.0229,
    Longitude: 73.3119,
    CityName: "Bikaner",
  },
  {
    QueryCityName: "alwar",
    Latitude: 27.5525,
    Longitude: 76.625,
    CityName: "Alwar",
  },
  {
    QueryCityName: "bhilwara",
    Latitude: 25.3501,
    Longitude: 74.635,
    CityName: "Bhilwara",
  },
  {
    QueryCityName: "sikar",
    Latitude: 27.6094,
    Longitude: 75.1393,
    CityName: "Sikar",
  },
];
export default UserHeader2;
