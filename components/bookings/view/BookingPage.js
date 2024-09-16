"use client";
import LoaderAndNoContent from "@/components/loaders/LoaderAndNoContent";
import useAPI from "@/hooks/useAPI";
import useTopLoader from "@/hooks/useTopLoader";
import transformErrorDefault from "@/utils/transformErrorDefault";
import React, { useState } from "react";
import toast from "react-hot-toast";
import "./BookingPage.css";
import moment from "moment";
import BookingTimeLineOne from "./BookingTimeLineOne";
import { Accordion, AccordionBody, AccordionItem, AccordionHeader } from "reactstrap";
import ActivityTimeLine from "./ActivityTimeLine";
const BookingPage = ({ bookingNumber = null }) => {
  const [getBookingResponse, getBookingHandler] = useAPI(
    {
      url: `/bookings/${bookingNumber}`,
      method: "get",
      sendImmediately: true,
    },
    (e) => {
      if (!e) {
        toast.error("Booking number not found in database!");
      }
      return e ?? null;
    },
    (e) => {
      toast.error(
        transformErrorDefault("Something went wrong while Booking Details!", e)
      );
      return e;
    }
  );
  const toploaderhook = useTopLoader(getBookingResponse?.fetching);
  var bookingDetails = getBookingResponse?.data
  var SlotDetails = getBookingResponse?.data?.slotId
  var AddressDetails = getBookingResponse?.data?.addressId


  const [activityAccordionOpen, setActivityAccordionOpen] = useState('1');
  const toggleActivityAccordion = (id) => {
    if (activityAccordionOpen === id) {
      setActivityAccordionOpen();
    } else {
      setActivityAccordionOpen(id);
    }
  };

  return (
    <div className="w-100 booking-details-section">
      <LoaderAndNoContent
        noContentMessage="Booking details not found"
        state={
          getBookingResponse?.fetching
            ? "loading"
            : [null, undefined].includes(getBookingResponse?.data)
              ? "no-content"
              : "none"
        }
      />
      {!getBookingResponse?.fetching &&
        !getBookingResponse?.error &&
        getBookingResponse?.data && (
          <div className="row p-0 m-0">
            <div className="col-12 mb-2 text-end">
              {bookingDetails?.isCancelled != true && !["created", "completed"].includes(bookingDetails?.status) && ["pending", "failed"].includes(bookingDetails?.paymentStatus) && <button
                className=" btn btn-theme primary-outline ms-2"
                type="button"
              >
                Mark Payment
              </button>}
              {['confirmed', 'process_assigned', 'started', 'collection_done', "sample_reached", "report_approved"].includes(bookingDetails?.status) && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
              >
                Update Booking Status
              </button>}
              {bookingDetails?.status == "created" && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
              >
                Confirm Booking
              </button>}

            </div>
            <div className="col-md-3 col-12 mb-2 booking-timeline-one">
              <p className="order-tracking">Order tracking</p>
              <BookingTimeLineOne isCancelled={bookingDetails?.isCancelled == true} selected={bookingDetails?.status}></BookingTimeLineOne>
            </div>
            <div className="col-md-9 col-12 p-0 ps-md-2">
              <div className="general-details row m-0 p-0 mb-2">
                <div className="col-12 py-2 m-0">
                  <span className="full-name">
                    {bookingDetails?.teamMemberId?.name}
                  </span>{" "}
                  <span className="gender">
                    {bookingDetails?.teamMemberId?.gender},
                  </span>{" "}
                  <span className="dob">
                    Age :{" "}
                    {bookingDetails?.teamMemberId?.dob
                      ? moment().diff(
                        bookingDetails?.teamMemberId?.dob,
                        "years",
                        false
                      )
                      : ""}
                    ,
                  </span>{" "}
                  <span className="gender">
                    {bookingDetails?.teamMemberId?.relation}
                  </span>
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Package/Test Included</p>
                    {bookingDetails?.packages?.map?.((item, index) => {
                      return <p className="values" key={index}>{item?.name}</p>;
                    })}
                  </div>
                  <div className="section">
                    <p className="heading">Preparations</p>
                  </div>
                  <div className="section">
                    <p className="heading">Price</p>
                    <p className="values">₹{bookingDetails?.total}</p>
                  </div>
                </div>
              </div>
              {/* Slot section */}
              <div className="general-details row m-0 py-0 mb-2">
                <div className="col-12 py-2 m-0">
                  <span className="full-name">
                    Slot
                  </span>{" "}
                  <span className="gender">
                    Type : {{ lab: "Lab collection", home: "Home Collection" }[bookingDetails?.collectionType]}
                  </span>{" "}
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Time & Date</p>
                    <p className="values" >{moment(SlotDetails?.slotDate?.date).format("DD MMMM YYYY")} {SlotDetails?.slotStartTime}</p>

                  </div>

                </div>
              </div>
              {/* Payment section */}
              <div className="general-details row m-0 py-0 mb-2">
                <div className="col-12 py-2 m-0">
                  <span className="full-name">
                    Payment Details
                  </span>{" "}
                  <span className="gender">
                    Type : {{ cash: "Cash", Online: "Online" }[bookingDetails?.paymentType]},
                  </span>{" "}
                  <span className="gender" >
                    Status : {bookingDetails?.paymentStatus}
                  </span>{" "}
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <table className="w-100">
                    <tr>
                      <td className="heading">Test & Package Price</td>
                      <td className="values" style={{ textAlign: "right" }}>₹{bookingDetails?.testAmount ?? 0}</td>
                    </tr>
                    <tr>
                      <td className="heading">Discount</td>
                      <td className="values" style={{ textAlign: "right" }}>₹{bookingDetails?.discount ?? 0}</td>
                    </tr>
                    {bookingDetails?.collectionType == "home" && <tr >
                      <td className="heading" >Home Collection Charge</td>
                      <td className="values " style={{ textAlign: "right" }}>₹{bookingDetails?.homeCollectionCharge ?? 0}</td>
                    </tr>}
                    <tr style={{ borderTop: "0.5px solid #3939392c" }} ><td className="pb-1 mt-1"></td> </tr>
                    <tr >
                      <td className="heading">Total</td>
                      <td className="values" style={{ textAlign: "right" }}>₹{bookingDetails?.total ?? 0}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            {/* Home Collection Section */}
            <div className="col-12 mb-2 text-end">
              <button
                className=" btn btn-theme secondary"
                type="button"
              >Update Home Collection</button>
              <button
                className=" btn btn-theme secondary ms-2"
                type="button"
              >Create Home Collection
              </button>

            </div>
            <div className="col-12 p-0">
              <div className="general-details row m-0 p-0 mb-2">
                <div className="col-12 py-2 m-0">
                  <span className="full-name">
                    Home Collection
                  </span>{" "}
                  <span className="gender">
                    Status : picked,
                  </span>{" "}
                  <span className="dob">
                    Date :{" "}
                    {moment("2024-09-09").format("DD MMMM YYYY")} {"10:00 PM"}
                  </span>{" "}
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Sample To be Collected</p>
                    {["Urine", "Sliva"]?.map?.((item, index) => {
                      return <p className="values" key={index}>{item}</p>;
                    })}
                  </div>
                  <div className="section">
                    <p className="heading">Samples Collected</p>
                    {["Urine", "Sliva"]?.map?.((item, index) => {
                      return <p className="values" key={index}>{item}</p>;
                    })}
                  </div>
                  <div className="section">
                    <p className="heading">Original Pickup</p>
                    <p className="values">{moment("2024-09-09").format("DD MMMM YYYY")} {"10:00 PM"}</p>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Sample Picked Up By</p>
                    <p className="values" >Jai Soni</p>

                  </div>
                  <div className="section">
                    <p className="heading">Picked Up By Contact</p>
                    <p className="values" >998122387</p>
                  </div>
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Address Type</p>
                    <p className="values" >{AddressDetails?.addressType}</p>
                  </div>
                  <div className="section">
                    <p className="heading">Contact</p>
                    <p className="values" >{AddressDetails?.phone}</p>
                  </div>
                  <div className="section">
                    <p className="heading">Address</p>
                    <p className="values" >{AddressDetails?.houseNo}, {AddressDetails?.addressLine1}, {AddressDetails?.city}, {AddressDetails?.state}, {AddressDetails?.pincode}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 p-0">
              <Accordion open={activityAccordionOpen} toggle={toggleActivityAccordion}>
                <AccordionItem>
                  <AccordionHeader targetId="1">Booking Activity</AccordionHeader>
                  <AccordionBody accordionId="1" className="booking-activity-timeline">
                    <ActivityTimeLine timelineList={timeLineRecords1} />
                  </AccordionBody>
                </AccordionItem>
                <AccordionItem>
                  <AccordionHeader targetId="2">Home Collection Activity</AccordionHeader>
                  <AccordionBody accordionId="2" className="booking-activity-timeline">
                    <ActivityTimeLine timelineList={timeLineRecords1} />
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        )}
      <pre>
        {JSON.stringify(getBookingResponse?.data ?? "", null, 2)}
      </pre>
    </div>
  );
};

export default BookingPage;

var timeLineRecords1 = [
  {
    "activityDate": "2024-09-16T08:00:00Z",
    "activityType": "Workout",
    "description": "<p>Morning jog in the <strong>park</strong></p>"
  },
  {
    "activityDate": "2024-09-16T09:30:00Z",
    "activityType": "Meeting",
    "description": "<p><em>Project team meeting</em> in the conference room</p>"
  },
  {
    "activityDate": "2024-09-16T12:00:00Z",
    "activityType": "Lunch",
    "description": "<p>Lunch with colleagues at a <a href='http://example.com'>cafe</a></p>"
  },
  {
    "activityDate": "2024-09-16T14:00:00Z",
    "activityType": "Conference",
    "description": "<p>Tech conference on <strong>AI advancements</strong></p>"
  },
  {
    "activityDate": "2024-09-16T16:00:00Z",
    "activityType": "Study",
    "description": "<p><span style='color:blue;'>Study session</span> for upcoming exams</p>"
  },
  {
    "activityDate": "2024-09-16T18:00:00Z",
    "activityType": "Exercise",
    "description": "<p>Evening gym <b>workout</b> session</p>"
  },
  {
    "activityDate": "2024-09-17T08:00:00Z",
    "activityType": "Workshop",
    "description": "<p>Workshop on <i>leadership skills</i></p>"
  },
  {
    "activityDate": "2024-09-17T10:00:00Z",
    "activityType": "Call",
    "description": "<p>Phone call with a <u>client</u></p>"
  },
  {
    "activityDate": "2024-09-17T13:00:00Z",
    "activityType": "Shopping",
    "description": "<p>Grocery <strike>shopping</strike> at the local market</p>"
  },
  {
    "activityDate": "2024-09-17T19:00:00Z",
    "activityType": "Dinner",
    "description": "<p>Dinner at a new <mark>restaurant</mark></p>"
  }
]