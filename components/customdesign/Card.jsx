import React from "react";

import "./customdesign.css"

const Card = ({
    title = "",
    description = "",
    imgsrc = "",
    buttontext = "",
    redirectpath = "",
    authername = "",
    createddate = "",
    minimgsrc = "",
    extraprops = {}
}) => {
    return (
        <div className="bg-white rounded shadow card_view  p-2" style={{ height: "100%" }} >

            {imgsrc && <a style={{ display: "block", textDecoration: "none", marginBottom: "8px", paddingTop: "10px", }} href={redirectpath ? `${redirectpath}` : "#"} className="blog_image">
                <img className="img rounded" style={{height:'240px'}} src={imgsrc ?? "/assets/images/blog1.jpg"} alt="post image" loading="lazy" />
            </a>}

            {minimgsrc && <a className="px-2" style={{ display: "block", textDecoration: "none" }} href={redirectpath ? `${redirectpath}` : "#"} >
                <img className="img rounded" src={minimgsrc} alt="post" loading="lazy" style={{ width: "40px", height: "40px" }} />
            </a>}



            <div className="px-3 py-3 my-3 blog_text" style={{ height: "100%" }}>
                {title ? <h5
                    className="py-2 blog_heading_content">
                    {title}
                </h5> : ""}

                {authername && <div>

                    {createddate && <span className="" style={{ fontSize: "0.7rem", color: "#828599", marginRight: "8px" }} >
                        {createddate}
                    </span>}

                    {authername && <span style={{ color: "#002678", fontSize: "0.9rem" }}>
                        {authername}
                    </span>}


                </div>}


                {description ? <p className=" description" >
                    {description}
                </p> : ""}

                {buttontext ? <a style={{ display: "block", textDecoration: "none" }} href={redirectpath ? `${redirectpath}` : "#"} className="plus_icon_border m-3 py-3"  >
                    <span className="plus_icon my-2">
                        <span>+</span>
                    </span>
                    <span className="px-2 plus_icon_txt">
                        {buttontext}
                    </span>
                </a> : ""}

            </div>
        </div>
    );
};

export default Card;
