"use client"
import { Spinner } from "reactstrap"
import "./LoaderAndNoContent.css"
import React from 'react'

const LoaderAndNoContent = ({ state = "none", noContentMessage = "No content found" }) => {
    if (state == "none") {
        return null
    }
    return (
        <div className="w-100 default-loading-component text-center">
            {state == "loading" && <div className="loading">
                <Spinner
                    style={{
                        height: "3rem",
                        width: "3rem",
                        color: "#00265c",
                    }}
                />
            </div>}
            {state == "no-content" && <div className="no-content-found">
                <img
                    src="/assets/icons/custom-tables/NoContentIcon.svg"
                    alt="No content found icon"
                    height="88px"
                    width={"160px"}
                />
                <p className="mt-2">{noContentMessage}</p>
            </div>}
        </div>
    )
}

export default LoaderAndNoContent
