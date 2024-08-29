"use client"
import {
    DropdownMenu,
    DropdownToggle,
    Label,
    UncontrolledDropdown,
} from "reactstrap";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

import React from 'react'
import './SortWithOutTable.css'
const SortWithOutTable = ({ sort, options = [], sortAction = () => { } }) => {
    return (
        <div className="sort-options">
            <UncontrolledDropdown>
                <DropdownToggle
                    className="btn sort-button-setting"
                    tag="button"
                ></DropdownToggle>
                <DropdownMenu className="">
                    {options.map((item, index) => {
                        if (sort?.column == item?.value) {
                            return <div key={index} onClick={() => { sortAction(item?.value, sort?.direction == "asc" ? "desc" : "asc") }} className="sort-option-item selected ">
                                <span>{item?.label}</span>{sort?.direction == "asc" ? <FaSortAlphaDown className="sorted-icon" /> : <FaSortAlphaUp className="sorted-icon" />}
                            </div>
                        }
                        else {
                            return <div check key={index} onClick={() => { sortAction(item?.value, "asc") }} className="sort-option-item">
                                {item?.label}
                            </div>
                        }

                    })}
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    )
}

export default SortWithOutTable
