"use client"
import useAPI from "@/hooks/useAPI";
import toast from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { Input, Spinner } from 'reactstrap'
import InputSelect from "@/components/formInput/select/InputSelect";
import SideBarProfile from '@/components/profile-side-bar/SideBarProfile'
import moment from "moment";

const MyBooking = () => {


    const [bookingdataResponse, bookingdataHandler] = useAPI(
        {
            url: "/bookings/mybooking",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {
            console?.log(e)

            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting members!",
                e
            ));
            return e
        }
    );

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



    const [getBookingdata, setBookingdata] = useState([]);

    useEffect(() => {
      if (bookingdataResponse?.data) {
        let filteredData = bookingdataResponse.data;
  
        if (BookingStatus) {
          filteredData = filteredData.filter(item => item.status === BookingStatus);
        }
  
        if (Patient) {
          filteredData = filteredData.filter(item => item.teamMemberId?._id === Patient);
        }

        if (Time) {
            const today = moment().startOf('day');
            if (Time === 'today') {
              filteredData = filteredData.filter(item =>
                moment(item.createdAt).isSame(today, 'day')
              );
            } else if (Time === '7day') {
              const sevenDaysAgo = moment().subtract(7, 'days').startOf('day');
              filteredData = filteredData.filter(item =>
                moment(item.createdAt).isBetween(sevenDaysAgo, today.clone().add(1, 'day'), null, '[]') // Inclusive of start and end
              );
            }
          } else if (Time === '30day') {
            startDate = moment().subtract(30, 'days').startOf('day');
            filteredData = filteredData.filter(item =>
              moment(item.createdAt).isBetween(startDate, today.clone().add(1, 'day'), null, '[]')
            );
          } else if (Time === '365day') {
            startDate = moment().subtract(365, 'days').startOf('day');
            filteredData = filteredData.filter(item =>
              moment(item.createdAt).isBetween(startDate, today.clone().add(1, 'day'), null, '[]')
            );
          }
  
        setBookingdata(filteredData);
      }
    }, [bookingdataResponse?.data, BookingStatus, Patient , Time]);


    const [membersResponse, membersHandler] = useAPI(
        {
            url: "/member/list",
            method: "get",
            sendImmediately: true,
            params: {

            },
        },
        (e) => {

            return e?.data
        },
        (e) => {
            toast.error(transformErrorDefault(
                "Something went wrong while Getting members!",
                e
            ));
            return e
        }
    );


    var status = [
        { label: "Created", value: "created", sequence: 1 },
        { label: "Confirmed", value: "confirmed", sequence: 2 },
        { label: "Process Assigned", value: "process_assigned", sequence: 3 },
        { label: "Started", value: "started", sequence: 4 },
        { label: "Collection Done", value: "collection_done", sequence: 5 },
        { label: "Sample Reached", value: "sample_reached", sequence: 6 },
        { label: "Report Approved", value: "report_approved", sequence: 7 },
        { label: "Completed", value: "completed", sequence: 8 },
        { label: "Cancelled", value: "cancelled", sequence: 9 },
    ];

    return <>
        <div className='main-parent-bar-div'>
            <div className='side-bar-main' style={{ backgroundColor: 'white' }}>
                <SideBarProfile />
            </div>

            <div className='item-page-section'>
                <div className="my-3">
                    <div className="row m-3">
                        <div className="col-sm-4 col-12 my-1 ">
                            <InputSelect
                                setValue={setPatient}
                                value={Patient}
                                options={membersResponse?.data?.map((item) => {
                                    return { label: item?.name, value: item?._id }
                                }) ?? []}
                                isTouched={PatientIsTouch}
                                setIsTouched={setPatientIsTouch}
                                className="py-1"
                                label={"Select Patient"}
                                // disabled={true}
                                feedbackMessage={PatientMessage?.message}
                                feedbackType={PatientMessage?.type}
                                validateHandler={PatientSelectValidater}
                            />
                        </div>
                        <div className="col-sm-4 col-12 my-1 ">
                            <InputSelect
                                setValue={setBookingStatus}
                                value={BookingStatus}
                                options={status ?? []}
                                isTouched={BookingStatusIsTouch}
                                setIsTouched={setBookingStatusIsTouch}
                                className="py-1"
                                label={"Select Status"}
                                // disabled={true}
                                feedbackMessage={BookingStatusMessage?.message}
                                feedbackType={BookingStatusMessage?.type}
                                validateHandler={BookingStatusSelectValidater}
                            />
                        </div>
                        <div className="col-sm-4 col-12 my-1 ">
                            <InputSelect
                                setValue={setTime}
                                value={Time}
                                options={[
                                    { label: "Today", value: "today" },
                                    { label: "Last 7  Days", value: "7day" },
                                    { label: "Last 30  Days", value: "30day" },
                                    { label: "Last 365  Days", value: "365day" },
                                ] ?? []}
                                isTouched={TimeIsTouch}
                                setIsTouched={setTimeIsTouch}
                                className="py-1"
                                label={"Select Time"}
                                // disabled={true}
                                feedbackMessage={TimeMessage?.message}
                                feedbackType={TimeMessage?.type}
                                validateHandler={TimeSelectValidater}
                            />
                        </div>
                    </div>

                    {bookingdataResponse?.fetching ? <div className="text-center" > <Spinner size="lg" /> </div> : (getBookingdata ?? [])?.map((item) => {
                        return (<>
                            <div className="shadow   mx-3 my-2" style={{ fontSize: "0.9rem" }} >
                                <div className="p-2 py-3 mt-2" >

                                    <div className="row" >
                                        <div className="col-sm-6 col-12" >
                                            <div className="row">
                                                <div className="col-sm-7 col-12 my-2">
                                                    <span className="px-2 py-2  rounded small" style={{ background: "#dee2db" }}> <dpan style={{ fontWeight: "700" }} >{item?.teamMemberId?.name} </dpan>
                                                       |  {item?.teamMemberId?.gender}</span>
                                                </div>
                                                <div className="col-sm-5 col-12 my-2 small" >
                                                    <span className="px-4 py-2  rounded" style={{ background: "#dee2db" }}> Booking ID: <span style={{ fontWeight: "700" }} >{item?.bookingId}</span> </span>

                                                </div>
                                            </div>
                                        </div  >

                                        <div className="col-sm-6 col-12 my-2 small" >
                                            <span className="px-4 py-2  rounded" style={{ background: "#dee2db" }}> Booking Date & Time:   <dpan style={{ fontWeight: "700" }} >{moment(item?.createdAt)?.format("LLL")}</dpan> </span>

                                        </div>
                                    </div>

                                </div>


                                <div className="m-2 p-3" >
                                    <div className="row" >
                                        <div className="col-sm-7 col-12"  >
                                            <div className="row" >
                                                <div className="col-6 " style={{ color: "#97979" }} >
                                                    <p>Collection Type</p>
                                                    <h4 className="small bold" >{item?.collectionType}</h4>

                                                </div>
                                                <div className="col-6 " style={{ color: "#97979" }} >
                                                    <p>Appoinment Date & Time</p>
                                                    <h4 className="small bold">{item?.slotId?.slotDate?.date} {item?.slotId?.slotStartTime}</h4>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-sm-5 col-12 px-3 bold" style={{ textAlign: "right", color: "rgb(1, 7, 63)" }} >
                                            ₹ 1160
                                        </div>

                                    </div>

                                    <ul className=" px-3  my-3 " >
                                        {(item?.packages ?? [])?.map((packageitem , index)=> {
                                            return <li key={index} style={{ color: "#97979" }} > {packageitem?.name} </li>
                                        })}
   
                                    </ul>


                                    <div className="row my-4">
                                        <div className="col-6" >
                                            <span className="px-4 py-2 mx-4 rounded" style={{ background: "#dee2db" }}>{item?.status}</span>

                                        </div>
                                        <div className="col-6 text-end" >
                                            <button className="card-button-2" > View More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })}

                </div>
            </div>
        </div>


    </>
}

export default MyBooking