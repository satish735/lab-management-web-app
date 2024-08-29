import React from "react";
import { FaAward, FaCheck } from "react-icons/fa6";

import "./customdesign.css"

const AwardCard = ({
    title = "",
    description = "",
    imgsrc = "",
    buttontext = "",
    redirectpath = "",
    authername = "",
    createddate = "",
    minimgsrc = "",
    extraprops = {},

}) => {
    return (
        <div className="bg-white rounded shadow card_view  px-5 py-4 " style={{height:'100%'}}  >


            <div className="d-flex justify-content-between">
                <div className="pt-3">
                    <h5
                        className="py-2 blog_heading_content" style={{ fontSize: '22px', fontWeight: '600' }}>
                        {title}
                    </h5>
                </div>
                <div>
                    <div style={{ fontSize: '50px', color: '#065465', textAlign: 'center' }}>
                        <FaAward />

                    </div>
                </div>
            </div>




            <div className="my-4" >


                <p style={{ color: '#828599', fontSize: '14px' }}>
                    {description}
                </p>

            </div>


            <p className={` blog_description `} >
                <span style={{ padding: '2px 3px', backgroundColor: '#21cdad', color: 'white', borderRadius: '50%' }}><FaCheck /></span> <span style={{color:'#828599',fontSize:'16px',fontWeight:'700'}}>{createddate}</span>  
            </p>




        </div>
    );
};

export default AwardCard;
