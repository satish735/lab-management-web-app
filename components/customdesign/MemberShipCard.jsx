import React from "react";
import { FaAward, FaCheck } from "react-icons/fa6";

import "./customdesign.css"

const MemberShipCard = ({
    card_name = "",
    description = "",
    imgsrc = "",
    validity = "",
    price = "",
    

}) => {
    console.log(imgsrc,'imgsrc');
    
    return (
        <div className="bg-white rounded shadow card_view  pt-0 pb-4" style={{ height: '100%' }}  >


            {imgsrc && <a style={{ display: "block", textDecoration: "none", marginBottom: "8px", paddingTop: "10px" }} className="blog_image">
                <img className="img rounded" src={imgsrc} alt="post image" loading="lazy" />
            </a>}


            <div className=" px-4">





                <div className="  ">
                    <div className="pt-3">
                        <h5
                            className="py-2 blog_heading_content text-center" style={{ fontSize: '22px', fontWeight: '600' ,textDecoration:'underline'  }}>
                            {card_name}
                        </h5>
                    </div>

                </div>




                <div className="my-4   " >


                    <p style={{ color: '#828599', fontSize: '17px' }}>
                        {description}
                    </p>

                </div>

             <div className="d-flex justify-content-between">


                <p className={` blog_description `} >
                     <span style={{ color: '#828599', fontSize: '16px', fontWeight: '700' }}>(Validity: {validity})</span>
                </p>

                <p className={` blog_description `} >
                    <span style={{ color: '#46b902', fontSize: '16px', fontWeight: '700' }}>Price: {price}</span>
                </p>

                </div>


            </div>


        </div>
    );
};

export default MemberShipCard;
