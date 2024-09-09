"use client"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import InputSelect from "@/components/formInput/select/InputSelect";

const MyBooking = () => {




    // const [BookingsResponse, BookingsHandler] = useAPI(
    //     {
    //         url: "/booking/list",
    //         method: "get",
    //         sendImmediately: true,
    //         params: {

    //         },
    //     },
    //     (e) => {

    //         return e?.data
    //     },
    //     (e) => {
    //         toast.error(transformErrorDefault(
    //             "Something went wrong while Getting Bookings!",
    //             e
    //         ));
    //         return e
    //     }
    // );


    const [Patient, setPatient] = useState();
    const [PatientIsTouch, setPatientIsTouch] = useState(false);

    const [PatientMessage, setPatientMessage] = useState({
        type: "info",
        message: "",
    });
    const PatientSelectValidater = (value) => {
        if (value === "" || !value) {
            setPatientMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setPatientMessage({ type: "info", message: "" });

        return true;
    };


    const [BookingStatus, setBookingStatus] = useState();
    const [BookingStatusIsTouch, setBookingStatusIsTouch] = useState(false);

    const [BookingStatusMessage, setBookingStatusMessage] = useState({
        type: "info",
        message: "",
    });
    const BookingStatusSelectValidater = (value) => {
        if (value === "" || !value) {
            setBookingStatusMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setBookingStatusMessage({ type: "info", message: "" });

        return true;
    };



    const [Time, setTime] = useState();
    const [TimeIsTouch, setTimeIsTouch] = useState(false);

    const [TimeMessage, setTimeMessage] = useState({
        type: "info",
        message: "",
    });
    const TimeSelectValidater = (value) => {
        if (value === "" || !value) {
            setTimeMessage({ type: "error", message: "Field Required!" });
            return false;
        }
        setTimeMessage({ type: "info", message: "" });

        return true;
    };


    const genderoption = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];





    return <>

        <div className="my-3">
            <div className="row m-3">
                <div className="col-sm-4 col-12 my-1 ">
                    <InputSelect
                        setValue={setPatient}
                        value={Patient}
                        options={genderoption ?? []}
                        isTouched={PatientIsTouch}
                        setIsTouched={setPatientIsTouch}
                        className="py-1"
                        label={"Select Patient"}
                        disabled={true}
                        feedbackMessage={PatientMessage?.message}
                        feedbackType={PatientMessage?.type}
                        validateHandler={PatientSelectValidater}
                    />
                </div>
                <div className="col-sm-4 col-12 my-1 ">
                    <InputSelect
                        setValue={setBookingStatus}
                        value={BookingStatus}
                        options={genderoption ?? []}
                        isTouched={BookingStatusIsTouch}
                        setIsTouched={setBookingStatusIsTouch}
                        className="py-1"
                        label={"Select Status"}
                        disabled={true}
                        feedbackMessage={BookingStatusMessage?.message}
                        feedbackType={BookingStatusMessage?.type}
                        validateHandler={BookingStatusSelectValidater}
                    />
                </div>
                <div className="col-sm-4 col-12 my-1 ">
                    <InputSelect
                        setValue={setTime}
                        value={Time}
                        options={genderoption ?? []}
                        isTouched={TimeIsTouch}
                        setIsTouched={setTimeIsTouch}
                        className="py-1"
                        label={"Select Time"}
                        disabled={true}
                        feedbackMessage={TimeMessage?.message}
                        feedbackType={TimeMessage?.type}
                        validateHandler={TimeSelectValidater}
                    />
                </div>
            </div>


            <div  className="shadow   mx-3 my-2" style={{fontSize:"0.9rem"}} >
                <div className="my-2" >

                    <div className="row" >
                        <div className="col-sm-7 col-12" >
                            <div className="row">
                                <div className="col-sm-7 col-12 my-2">
                                    <span className="px-4 py-2 mx-4 rounded" style={{ background: "#dee2db" }}> <dpan style={{ fontWeight: "700" }} >KAP </dpan>  |  20 DAYS  |  Female</span>


                                </div>
                                <div className="col-sm-5 col-12 my-2" >
                                    <span className="px-4 py-2 mx-4 rounded" style={{ background: "#dee2db" }}> Booking ID: <span style={{ fontWeight: "700" }} >74816</span> </span>

                                </div>
                            </div>
                        </div  >

                        <div className="col-sm-5 col-12 my-2" >
                            <span className="px-4 py-2 mx-4 rounded" style={{ background: "#dee2db" }}> Booking Date & Time:   <dpan style={{ fontWeight: "700" }} >31-08-2024 03:40 PM </dpan> </span>

                        </div>
                    </div>

                </div>


                <div className="m-2 p-3" >
                    <div className="row" >
                        <div className="col-sm-7 col-12"  >
                            <div className="row" >
                                <div className="col-6 " style={{ color: "#97979" }} >
                                    <p>Collection Type</p>
                                    <h4 className="small bold" >Lab</h4>

                                </div>
                                <div className="col-6 " style={{ color: "#97979" }} >
                                    <p>Appoinment Date & Time</p>
                                    <h4 className="small bold">02-09-2024 08:00 AM</h4>

                                </div>

                            </div>
                        </div>
                        <div className="col-sm-5 col-12 px-3 bold" style={{ textAlign: "right", color: "rgb(1, 7, 63)" }} >
                            ₹ 1160
                        </div>

                    </div>

                    <ul className=" px-3  my-3 " >
                        <li style={{ color: "#97979" }} >GLUCOSE (FASTING) </li>
                        <li style={{ color: "#97979" }} >THYROID PROFILE  </li>
                        <li style={{ color: "#97979" }} >KFT-KIDNEY FUNCTION TEST  </li>
                    </ul>


                    <div className="row my-4">
                        <div className="col-6" >
                            <span className="px-4 py-2 mx-4 rounded" style={{ background: "#dee2db" }}>Cancelled</span>

                        </div>
                        <div className="col-6 text-end" >
                            <button className="card-button-2" > View More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default MyBooking