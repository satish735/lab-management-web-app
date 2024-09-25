"use client"
import { Spinner } from "reactstrap"
import "./LoaderAndNoContent.css"
import React from 'react'

const LoaderGeneral = ({ state = "none", noContentMessage = "No content found" }) => {
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
             
        </div>
    )
}

export default LoaderGeneral
