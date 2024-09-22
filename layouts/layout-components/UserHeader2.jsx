"use client";
import haversine from "haversine";
import { useEffect, useState } from "react";
import "./UserHeader2.css";
import "./AdminHeader.css"
import { Navbar, NavbarBrand, Button, Offcanvas, OffcanvasHeader, OffcanvasBody } from "reactstrap";
import MultiLevelDropDown from "@/components/multilevel-dropdown/MultiLevelDropDown";
import Usercart from "@/layouts/layout-components/cart"

import {
  FaPhone,
  FaClock,
  FaLocationArrow,
  FaMicroscope,
  FaBox,
  FaChevronDown,
  FaCartShopping,
  FaBell,
  FaBook, FaLocationDot,
  FaUserGroup
} from "react-icons/fa6";
import useAPI from "@/hooks/useAPI";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
// const updateLocalStorage = (key, value) => {
//   localStorage.setItem(key, value);
//   window.dispatchEvent(new Event('storageChange')); // Dispatch a custom event
// };
const UserHeader2 = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  //  const updateLocalStorage = (key, value) => {
  //   localStorage.setItem(key, value);

  //   setLocalStorageData(localStorage.getItem(key));
  // };
  const router = useRouter();

  const session = useSession()

  console.log(session)

  const [localStorageData, setLocalStorageData] = useState();
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedData = localStorage?.getItem('testpackage');
      if (storedData !== localStorageData) {
        setLocalStorageData(storedData);
      }
    };
    const intervalId = setInterval(checkLocalStorage, 1000);
    return () => clearInterval(intervalId);
  }, [localStorageData]);

  useEffect(() => {
    const storedData = localStorage?.getItem?.('testpackage');
    let parsedData = null;

    try {
      // Attempt to parse the stored JSON data
      parsedData = storedData ? JSON?.parse?.(storedData) : null;
    } catch (error) {
      // Log the error if parsing fails
      console.error('Failed to parse stored data:', error);
      parsedData = null;
    }

    // Set the cart item count based on parsed data
    setCartItemCount((parsedData?.item ?? []).length);
  }, [localStorageData]);




  const [allCentersResponse, allCentersHandler] = useAPI(
    {
      url: "/getCentersLocation",
      method: "get",
      sendImmediately: true,

    },
    (e) => {

      return e
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting milestones!",
        e
      ));
      return e
    }
  );




  const [getSelectedCenterResponse, getSelectedCenterHandler] = useAPI(
    {
      url: "/getSelectedLocation",
      method: "get",
      sendImmediately: true,

    },
    (e) => {
      // const sessionData = session?.data?.user

      // console.log(sessionData ?? {});

      // session.update({ selectedCity:"jaoiput" } })


      return e
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting selected location!",
        e
      ));
      return e
    }
  );



  const [saveSelectedCenterResponse, saveSelectedCenterHandler] = useAPI(
    {
      url: "/getSelectedLocation",
      method: "put",

    },
    (e) => {

      return e
    },
    (e) => {
      toast.error(transformErrorDefault(
        "Something went wrong while Getting selected location!",
        e
      ));
      return e
    }
  );


  useEffect(() => {
    // let data = JSON.parse(localStorage.getItem("selectedLocation"));

    // setCurrentLocation(data?.selectedLocation)

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
      label: "Packages & Tests",
      menu: [
        { label: "Packages", href: "/health-packages" },

        { label: "Tests", href: "/lab-tests" }
        // { label: "Corporate Report Panel", href: "#" },
      ],
    },
    // {
    //   type: "parent",
    //   label: "Our Team",
    //   menu: [
    //     { label: "Health bulitin", href: "/doctors/health-bulletin" },
    //     // { label: "Corporate Report Panel", href: "#" },
    //   ],
    // },
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
        // { label: "Member ship", href: "/membership-card" },
        { label: "Contact Us", href: "/contact-us" },
        {
          label: "Partner With Us",
          href: "#",
          type: "sub-menu",
          menu: [

            { label: "Franchising Opportunity", href: "/partner-with-us/franchising-opportunity" },
            { label: "Lab Acquisition", href: "/partner-with-us/lab-acquisition" },
            { label: "Hospital Lab Management", href: "/partner-with-us/hospital-lab-management" },
            { label: "Corporate Wellness", href: "/partner-with-us/corporate-wellness" },
            { label: "Regional Partner", href: "/partner-with-us/regional-partner" },
          ],
        },
      ],
    },
  ];
  const [cartItemCount, setCartItemCount] = useState("0");
  const [bellItemCount, setBellItemCount] = useState("4");
  const [isopencart, setisopencart] = useState(false)
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


                      <a href="/lab-tests" className="header-tests">
                        Tests
                      </a>
                    </li>
                  </ul>
                  <div className="miniPopup-language-area location-buttons" style={{ position: 'relative' }}>

                    <button
                      className="miniPopup-language-trigger"
                      type="button"
                    >

                      <span className="btn-text" >
                        {'Select Location' ?? "Select Location"}
                      </span>
                      {/* currentLocation, setCurrentLocation */}
                      <FaChevronDown size={14} className="dropdonw-arrow" />
                      <span className="btn-shape"></span>
                    </button>
                    <div className="location-divs"   >


                      {(allCentersResponse?.data?.cityArray ?? []).map((item) => {
                        return (
                          <>
                            <div onClick={() => {
                              localStorage.setItem('selectedLocation', JSON.stringify({ selectedLocation: item }))
                              setCurrentLocation(item)
                              saveSelectedCenterHandler({
                                body: {
                                  selectedLocation: item
                                }
                              })
                              router.push(`/${item}`)
                            }} className="center-selection-item text-start ps-3 m-0 " style={{ fonSize: '10px', fonWeight: '200' }}>

                              {item}


                            </div>
                            <hr />
                          </>

                        )
                      })}



                    </div>                    {/* <ul className="miniPopup miniPopup-language list-unstyled">
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
                    </ul> */}
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
                  alignItems: "center"
                }}
              >
                <a onClick={() => {
                  setisopencart(!isopencart)
                }} className=" cart-button">
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
                <a type="button" className="btn login-button user-button" href="/login" style={{
                  position: 'relative'
                }}>
                  Login
                  <div className="profile-div"  >
                    <div className="d-flex pt-2" style={{ border: '1px solid green', borderRadius: '6px' }}>
                      <div style={{ width: '30%' }} >
                        <img src="/assets/icons/MEN.png" style={{ height: '60px', width: '60px' }} />
                      </div>
                      <div style={{ width: '70%', textAlign: 'start' }} className="ps-2" >
                        <h1 className=" text-capitalize m-0 p-0" style={{ fontSize: '17px', fontWeight: '400' }}>{'name'}</h1>
                        <p className="text-capitalize  m-0 p-0" style={{ fontSize: '13px', fontWeight: '400', color: 'green' }}>{'role , 5 years'}</p>
                      </div>
                    </div>


                    <div onClick={() => {
                      router.push("/mybookings")
                    }} className=" text-start ps-3" style={{ fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747' }}>
                        <FaBook />

                      </span>
                      <span>My Bookings</span>


                    </div>

                    <div onClick={() => {
                      router.push("/my-address")
                    }} className=" text-start ps-3" style={{ fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747' }}>
                        <FaLocationDot />


                      </span>
                      <span>My Address</span>


                    </div>

                    <div onClick={() => {
                      router.push("/myfamilymembers")
                    }} className=" text-start ps-3" style={{ fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747' }}>
                        <FaUserGroup />

                      </span>
                      <span>My Family Members</span>


                    </div>
                    <div onClick={() => {
                      router.push("/my-profile")
                    }} className=" text-start ps-3" style={{ fonSize: '17px', fonWeight: '500' }}>

                      <span style={{ marginRight: '5px', color: '#003747' }}>
                        <MdAccountCircle />

                      </span>
                      <span>My Profile</span>


                    </div>
                  </div>
                </a>


              </div>






            </div>
          </div>
        </Navbar>
      </div>

      <Usercart isopencart={isopencart} setisopencart={setisopencart} />
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
