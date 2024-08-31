"use client";
import React, { useEffect, useState } from "react";

import "@/app/cart/cart.css"

import Addmember from "@/app/cart/addmember"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import {
    Offcanvas,
    OffcanvasBody,
    NavItem,
    Nav,
    Button
} from "reactstrap";

const Usercart = ({ isopencart, setisopencart }) => {








    const [cartitem, setcartitem] = useState()

    useEffect(() => {
        const storedData = localStorage.getItem('testpackage');
        const parsedData = storedData ? JSON.parse(storedData) : [];
        setcartitem(parsedData?.item ?? [])
    }, [isopencart])

    const deleteitem = (data) => {


        let updatecart = (cartitem ?? []).filter((key) => key?._id !== data?._id);
        setcartitem(updatecart)
        localStorage.setItem('testpackage', JSON.stringify({ item: updatecart }));
    }


    return (
        <div className="midbox-inner " style={{ backgroundColor: "#dee2db" }}>

            <Offcanvas
                direction="end"
                toggle={() => { setisopencart(!isopencart) }}
                isOpen={isopencart}
                className="isopencart "
            >

                <OffcanvasBody>
                    <button type="button"
                        className="close border-0"
                        onClick={() => { setisopencart(!isopencart) }}
                        style={{ position: 'relative', float: "right", background: "white", fontSize: "1.6rem" }}>
                        &times;
                    </button>


                    <div className="p-2 mt-5" >

                        {(cartitem ?? [])?.map((item) => {
                            return (<div className="row pt-2 my-1 rounded" style={{ border: "1px solid #dee2db" }}>
                                <div className="col-2 " >
                                    <img
                                        src="/assets/images/test-icon.png"
                                        style={{ height: "40px", width: "40px", background: "#deead7" }}
                                        className="p-2 mt-1 rounded-circle"
                                    />
                                </div>
                                <div className="col-7 mt-1" style={{ fontSize: "0.7rem" }}>
                                    <span style={{ fontWeight: "600" }}>{item?.name}</span>
                                    <p className="small pt-1">₹ {item?.rate}</p>

                                </div>
                                <div className="col-3" >
                                    <img
                                        src="/assets/images/deleteicon.png"
                                        style={{ height: "35px", width: "35px" }}
                                        className="mt-2"
                                        onClick={() => {
                                            deleteitem(item)
                                        }}

                                    />
                                </div>
                            </div>)
                        })}

                    </div>


                    <div className="bg-white rounded p-3" style={{ border: "1px solid #dee2db" }}>
                        <div className="row ">
                            <div className="col-6 ">
                                <span className="px-2 small" >Price</span>
                            </div>
                            <div className="col-6 " style={{ float: "right" }} >
                                <span className="px-2 small" >₹ 6790.00</span>
                            </div>

                        </div>
                    </div>


                    <div className="my-4 ">
                        <a href="/cart" className="text-white card-button-2 "  style={{
                            display: "block",
                            width:"100%",
                
                            textAlign: "center",
                            textDecoration:"none",
                          
                        }}>
                            Book Now
                        </a>
                    </div>

                </OffcanvasBody>
            </Offcanvas>

        </div >
    );
};

export default Usercart;
