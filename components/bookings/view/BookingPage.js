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
import BookingConfirmModal from "./BookingConfirmModal";
import { useRouter } from "next/navigation";
import MarkPaymentModal from "./MarkPaymentModal";
import UpdateBookingStatusModal from "./UpdateBookingStatusModal";
import CreateHomeCollectionModal from "./CreateHomeCollectionModal";
import UpdateHomeCollectionModal from "./UpdateHomeCollectionModal";
import CreateActivityModal from "./CreateActivityModal";

const BookingPage = ({ bookingNumber = null }) => {
  const router = useRouter();
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
  var homeCollection = getBookingResponse?.data?.homeCollection

  const [activityAccordionOpen, setActivityAccordionOpen] = useState('1');
  const toggleActivityAccordion = (id) => {
    if (activityAccordionOpen === id) {
      setActivityAccordionOpen();
    } else {
      setActivityAccordionOpen(id);
    }
  };


  const [confirmBookingOpen, setConfirmBookingOpen] = useState(false)
  const confirmBookingSuccessHandler = async () => {
    await getBookingHandler()
    setConfirmBookingOpen(false)
  }
  const [markPaymentOpen, setMarkPaymentOpen] = useState(false)
  const markPaymentSuccessHandler = async () => {
    await getBookingHandler()
    setMarkPaymentOpen(false)
  }
  const [updateBookingStatusOpen, setUpdateBookingStatusOpen] = useState(false)
  const updateBookingStatusSuccessHandler = async () => {
    await getBookingHandler()
    setUpdateBookingStatusOpen(false)
  }

  const [createHomeCollectionOpen, setCreateHomeCollectionOpen] = useState(false)
  const createHomeCollectionSuccessHandler = async () => {
    await getBookingHandler()
    setCreateHomeCollectionOpen(false)
  }

  const [updateHomeCollectionOpen, setUpdateHomeCollectionOpen] = useState(false)
  const UpdateHomeCollectionSuccessHandler = async () => {
    await getBookingHandler()
    setUpdateHomeCollectionOpen(false)
  }

  const [createActivityOpen, setCreateActivityOpen] = useState(false)
  const createActivitySuccessHandler = async () => {
    await getBookingHandler()
    setCreateActivityOpen(false)
  }
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
                onClick={() => { setMarkPaymentOpen(true) }}
                style={{ minWidth: "130px" }}
              >
                Mark Payment as Paid
              </button>}
              {bookingDetails?.isCancelled != true && ['confirmed', 'process_assigned', 'started', 'collection_done', "sample_reached", "report_approved"].includes(bookingDetails?.status) && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
                onClick={() => { setUpdateBookingStatusOpen(true) }}
              >
                Update Booking Status
              </button>}
              {bookingDetails?.status == "created" && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
                onClick={() => { setConfirmBookingOpen(true) }}
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
              {homeCollection && bookingDetails?.collectionType == "home" && <button
                className=" btn btn-theme secondary"
                type="button"
                onClick={() => { setUpdateHomeCollectionOpen(true) }}
              >Update Home Collection</button>}
              {!homeCollection && bookingDetails?.collectionType == "home" && bookingDetails?.isCancelled != true && !["created", "completed"].includes(bookingDetails?.status) && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
                onClick={() => { setCreateHomeCollectionOpen(true) }}
              >Create Home Collection
              </button>}

            </div>
            {homeCollection && <div className="col-12 p-0">
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
            </div>}
            {/* Accordion Section */}
            <div className="col-12 mb-2 text-end">
              {bookingDetails?.isCancelled != true && !["created", "completed"].includes(bookingDetails?.status) && <button
                className=" btn btn-theme secondary ms-2"
                type="button"
                onClick={() => { setCreateActivityOpen(true) }}
              >Create Activity
              </button>}

            </div>
            <div className="col-12 p-0">
              <Accordion open={activityAccordionOpen} toggle={toggleActivityAccordion}>
                {Array.isArray(bookingDetails?.activities) && bookingDetails?.activities.length > 0 && < AccordionItem >
                  <AccordionHeader targetId="1">Booking Activity</AccordionHeader>
                  <AccordionBody accordionId="1" className="booking-activity-timeline">
                    <ActivityTimeLine timelineList={bookingDetails?.activities} />
                  </AccordionBody>
                </AccordionItem>}
                {homeCollection && Array.isArray(homeCollection?.activities) && homeCollection?.activities.length > 0 && <AccordionItem>
                  <AccordionHeader targetId="2">Home Collection Activity</AccordionHeader>
                  <AccordionBody accordionId="2" className="booking-activity-timeline">
                    <ActivityTimeLine timelineList={homeCollection?.activities} />
                  </AccordionBody>
                </AccordionItem>}
                {Array.isArray(bookingDetails?.transactions) && bookingDetails?.transactions.length > 0 && < AccordionItem >
                  <AccordionHeader targetId="1">Transactions</AccordionHeader>
                  <AccordionBody accordionId="1" className="booking-activity-timeline">
                    {bookingDetails?.transactions.map(((tItem, index) => {
                      return <div className="general-details row m-0 py-0 mb-2" key={index}>
                        <div className="col-12 py-2 m-0">
                          <span className="full-name">
                            {tItem?.transactionId}
                          </span>{" "}
                          <span className="gender">
                            Status : {tItem?.status},
                          </span>{" "}<span className="gender">
                            Method : {tItem?.paymentMethod}
                          </span>,
                          {" "}<span className="gender">
                            Amount : ₹{tItem?.amount}
                          </span>
                        </div>
                        <hr className="m-0" />
                        <div className="col-12 py-2 m-0 general-details-2">
                          <div className="section">
                            <p className="heading">Time & Date</p>
                            <p className="values" >{moment(tItem?.transactionDate).format("DD MMMM YYYY hh:mm A")}</p>
                          </div>
                          <div className="section">
                            <p className="heading">Reference TId</p>
                            <p className="values" >{tItem?.referenceTransactionId}</p>
                          </div>
                          <div className="section">
                            <p className="heading">Description</p>
                            <p className="values" >{tItem?.description}</p>
                          </div>
                        </div>
                      </div>
                    }))}
                  </AccordionBody>
                </AccordionItem>}
              </Accordion>
            </div>
          </div>
        )
      }
      <pre>
        {JSON.stringify(getBookingResponse?.data ?? "", null, 2)}
      </pre>
      {confirmBookingOpen && <BookingConfirmModal isOpen={confirmBookingOpen} setIsOpen={setConfirmBookingOpen} successHandler={confirmBookingSuccessHandler} bookingDetails={bookingDetails} />}
      {markPaymentOpen && <MarkPaymentModal isOpen={markPaymentOpen} setIsOpen={setMarkPaymentOpen} successHandler={markPaymentSuccessHandler} bookingDetails={bookingDetails} />}
      {updateBookingStatusOpen && <UpdateBookingStatusModal isOpen={updateBookingStatusOpen} setIsOpen={setUpdateBookingStatusOpen} successHandler={updateBookingStatusSuccessHandler} bookingDetails={bookingDetails} />}
      {createHomeCollectionOpen && <CreateHomeCollectionModal isOpen={createHomeCollectionOpen} setIsOpen={setCreateHomeCollectionOpen} successHandler={createHomeCollectionSuccessHandler} bookingDetails={bookingDetails} />}
      {updateHomeCollectionOpen && <UpdateHomeCollectionModal isOpen={updateHomeCollectionOpen} setIsOpen={setUpdateHomeCollectionOpen} successHandler={UpdateHomeCollectionSuccessHandler} bookingDetails={bookingDetails} />}
      {createActivityOpen && <CreateActivityModal isOpen={createActivityOpen} setIsOpen={setCreateActivityOpen} successHandler={createActivitySuccessHandler} bookingDetails={bookingDetails} />}

    </div >
  );
};

export default BookingPage;
