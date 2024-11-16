"use client";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import "./UserHeader.css";
import { useState } from "react";

const UserHeader = () => {

  return (
    <>
      <Navbar
        color="light"
        light
        fixed="top"
        style={{
          maxHeight: "72px",
          background: "white !important",
          borderBottom: "1px solid #ccc",
          padding: 0,
        }}
      >
        <div
          className="midbox-inner"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
          <div style={{ display: "flex", padding: "0", alignItems: "center" }}>
            <HeaderLocation />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <a href="/find-nearest-lab" className="header-nearby-labs">
                Find Nearby Labs
              </a>
              <a href="/health-packages" className="header-packages">
                Packages
              </a>
              <a href="/lab-test" className="header-tests">
                Tests
              </a>
            </div>
            <div
              style={{
                width: "max-content",
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <a
                type="button"
                className="btn btn-outline-success  header-call-button"
                href="tel:+919166125555"
              >
                <img
                  src="/assets/icons/header-phone.png"
                  height={20}
                  width={20}
                  style={{ marginTop: "-3px" }}
                />{" "}
                +91 9462308260
              </a>
              <a
                type="button"
                className="btn btn-success  header-login-button"
                href="/login"
              >
                <img
                  src="/assets/icons/profile-icon.png"
                  height={20}
                  width={20}
                  style={{ marginTop: "-3px" }}
                />{" "}
                Login
              </a>
              <button
                type="button"
                className="btn btn-success  header-cart-button"
              >
                <img src="/assets/icons/cart-icon.webp" />{" "}
              </button>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

const HeaderLocation = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [selectedLocation, setSelectedLocation] = useState();
  const [inputValue, setInputValue] = useState("");
  const [locationDropDownList, setLocationDropDownList] = useState([
    { key: "ahemdabad", value: "Ahemdabad" },
    { key: "ajmer", value: "Ajmer" },
    { key: "alwar", value: "Alwar" },
    { key: "bansur", value: "Bansur" },
    { key: "behor", value: "Behor" },
    { key: "chomu", value: "Chomu" },
    { key: "chaksu", value: "Chaksu" },
    { key: "jaipur", value: "Jaipur" },
  ]);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={"down"}>
      <DropdownToggle caret tag="a">
        <input
          className="header-drop-down-input"
          value={
            inputValue ??
            locationDropDownList.find((item) => item?.key == selectedLocation)
              ?.value
          }
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </DropdownToggle>
      <DropdownMenu className="header-location-menu">
        {locationDropDownList
          .filter((item) => item.value.includes(inputValue))
          .map((item,index) => (
            <DropdownItem
            key={index}
              onClick={() => {
                setSelectedLocation(item?.key);
              }}
              active={selectedLocation == item?.key}
            >
              {item?.value}
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default UserHeader;
