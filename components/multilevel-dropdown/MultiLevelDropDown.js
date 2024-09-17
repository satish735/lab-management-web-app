"use client";
import { FaChevronDown } from "react-icons/fa6";
import React, { useState } from "react";
import "./CustomDropdown.css";
const MultiLevelDropDown = ({ data }) => {
  return (
    <div className="multilevel-dropdown">
      <ul className="multilevel-dropdown-menu">
        {data.map((item, index) => (
          <ParentMenu item={item} key={index} />
        ))}
      </ul>
    </div>
  );
};

const MenuItem = ({ item }) => {
  return (
    <li className="menu-item">
      <a href={item?.href}>{item?.label}</a>
    </li>
  );
};

const SubMenu = ({ item }) => {
  return (
    <li className="parent sub-menu">
      <a href={item?.link}>
        {item?.label}
        <span className="expand">»</span>
      </a>
      <ul className="child">
        {item?.menu.map((item1, index) => {
          if (item1?.type == "sub-menu") {
            return <SubMenu item={item1} key={index} />;
          } else {
            return <MenuItem item={item1} key={index} />;
          }
        })}
      </ul>
    </li>
  );
};
const ParentMenu = ({ item }) => {
  return (
    <li className="parent main-parent">
      <a href={item?.href}>
        {item?.label}
        <FaChevronDown size={12}style={{marginLeft:"4px",fontWeight:"bold"}} />
      </a>
      <ul className="child">
        {item?.menu.map((item1, index) => {
          if (item1?.type == "sub-menu") {
            return <SubMenu item={item1} key={index} />;
          } else {
            return <MenuItem item={item1} key={index} />;
          }
        })}
      </ul>
    </li>
  );
};
export default MultiLevelDropDown;
