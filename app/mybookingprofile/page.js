"use client"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import InputSelect from "@/components/formInput/select/InputSelect";
const MyBookingProfile = () => {
    return <>
        <div className="m-3" >
            <h3>My Bookings  </h3>
            <div className="row " >
                <div className="col-sm-4 col-12 shadow" >
                    <h4> Track your order</h4>
                </div>

                <div className="col-sm-8 col-12" >

                    <div className="shadow p-2" >
                        <h3>Booking Details - #74816  </h3>
                    </div>

                </div>

            </div>

        </div>
    </>
}
export default MyBookingProfile