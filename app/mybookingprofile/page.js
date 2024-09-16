"use client"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
const MyBookingProfile = () => {


    
    return <>


        <div className='main-parent-bar-div'>

            <div className='side-bar-main' style={{ backgroundColor: 'white' }}>

                <SideBarProfile />
            </div>

            <div className='item-page-section'>
                <div className="m-3 px-3" >
                    <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>My Bookings  </h3>
                    <div className="row " >
                        <div className="col-sm-4 col-12 shadow rounded  p-3" >
                            <h4 style={{ fontSize: "1.1rem", fontWeight: "700" }}> Track your order</h4>
                        </div>

                        <div className="col-sm-8 col-12" >

                            <div className="shadow rounded  p-3" >
                                <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Booking Details - #74816  </h3>
                            </div>

                            <div className=" p-3 shadow rounded">
                                <p className="small py-2" style={{ borderBottom: "1px solid #7c7c7c", color: "#7c7c7c" }} ><span style={{ fontSize: "1.1rem", fontWeight: "700", color: "black" }} >KAP</span>  Female, 20 DAYS(S), Other</p>
                                <div className="row" >
                                    <div className="col-sm-4" >
                                        <p className=" p-0 m-0" style={{ color: "#7c7c7c", fontSize: "0.8rem" }} >Test Included</p>
                                        <h6 style={{ color: "#206e65", fontSize: "1.0rem" }} > ADVANCE SURAKSHA PACKAGE-MALE </h6>
                                    </div>
                                    <div className="col-sm-4" >
                                        <p className=" p-0 m-0" style={{ color: "#7c7c7c", fontSize: "0.8rem" }} >Preperation</p>
                                        <h6 style={{ color: "#206e65", fontSize: "1.0rem" }}> </h6>

                                    </div>
                                    <div className="col-sm-4" >
                                        <p className=" p-0 m-0" style={{ color: "#7c7c7c", fontSize: "0.8rem" }} >Price</p>
                                        <h6 style={{ color: "#206e65", fontSize: "1.0rem" }}>₹6790</h6>

                                    </div>

                                </div>
                            </div>


                            <div className="shadow rounded  p-3" >
                                <h3 className="py-2" style={{ fontSize: "1.1rem", fontWeight: "700" }}>Collection Scheduled </h3>
                                <div className="row" >
                                    <div className="col-sm-4" >
                                        <p className=" p-0 m-0" style={{ color: "#7c7c7c", fontSize: "0.8rem" }} >Address</p>
                                        <h6 style={{ color: "#206e65", fontSize: "1.0rem" }}></h6>

                                    </div>
                                    <div className="col-sm-4" >
                                        <p className=" p-0 m-0" style={{ color: "#7c7c7c", fontSize: "0.8rem" }} >Date & Time</p>
                                        <h6 style={{ color: "#206e65", fontSize: "1.0rem" }}>Invalid date</h6>

                                    </div>

                                </div>
                            </div>



                            <div className=" p-3 shadow rounded">
                                <div className="row py-3" style={{ borderBottom: "1px solid #7c7c7c" }}>
                                    <div className="col-6" >
                                        <h6 style={{ fontSize: "1.1rem", fontWeight: "700" }} >Payment Option</h6>
                                    </div>

                                    <div className="col-6 text-end" >
                                        <button className="card-button-2">Paid Online</button>
                                    </div>

                                </div>

                                <div className="py-2" style={{ borderBottom: "1px solid #7c7c7c" }}>
                                    <div className="row" >
                                        <div className="col-6" >
                                            <p className="small" style={{ color: "#7c7c7c" }} >Total Price</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small text-end" style={{ color: "#7c7c7c" }} >₹0</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small" style={{ color: "#7c7c7c" }} >Discount</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small text-end" style={{ color: "#7c7c7c" }} >₹0</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small" style={{ color: "#7c7c7c" }} >Home Collection Charge</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small text-end" style={{ color: "#7c7c7c" }} >₹0</p>
                                        </div>

                                    </div>
                                </div>


                                <div className="py-2" >
                                    <div className="row" >
                                        <div className="col-6" >
                                            <p className="small" style={{ color: "#7c7c7c" }} >Total</p>
                                        </div>
                                        <div className="col-6" >
                                            <p className="small text-end" style={{ color: "#7c7c7c" }} >₹0</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>



                </div>
            </div>
        </div>

    </>
}
export default MyBookingProfile