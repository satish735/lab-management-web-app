import React from "react";

import "./customdesign.css"

const Banner = ({
    heading = "",
    paragraph = "",
    imgsrc = "/assets/images/pagetittle1.jpg"
}) => {
    return (
        <div className="banner" >
            <img className="banner_image" src={imgsrc} alt="post image" loading="lazy" />
            <div className="banner_content text-center" style={{ margin: "0 auto" }} >
                <div className="col-sm-5 col-9" style={{ margin: "0 auto" }}>
                    {heading ? <h2 style={{ fontWeight: "800", fontSize: "3rem", color: "white" }}>{heading}</h2> : ""}
                    {paragraph ? <p style={{ fontWeight: "700", fontSize: "0.9rem", color: "white" }}>{paragraph}
                    </p> : ""}
                </div>
            </div>

            <div className="curve-top-shape">
            </div>
        </div>
    );
};

export default Banner;
