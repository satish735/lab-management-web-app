
import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import "./BreadcrumbDiv.css";
const BreadcrumbDiv = ({ options = [] }) => {
  return (
    <Breadcrumb listTag="div" className="breadcrumb-main">
      {options.map((item, index) => {
        return (
          <BreadcrumbItem
            href={item?.link}
            tag={item?.active ? "span" : "a"}
            key={index}
            active={item?.active ? true : false}
            className={`breadcrumb-item ${item?.disabled ? "is-disabled" : ""}`}
          >
            {item?.label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbDiv;
