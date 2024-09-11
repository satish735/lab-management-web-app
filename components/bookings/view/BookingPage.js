"use client";
import LoaderAndNoContent from "@/components/loaders/LoaderAndNoContent";
import useAPI from "@/hooks/useAPI";
import useTopLoader from "@/hooks/useTopLoader";
import transformErrorDefault from "@/utils/transformErrorDefault";
import React from "react";
import toast from "react-hot-toast";
import "./BookingPage.css";
import moment from "moment";
import BookingTimeLineOne from "./BookingTimeLineOne";
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
  return (
    <div className="w-100 booking-details-section">
      {/* {JSON.stringify(getBookingResponse?.data)} */}
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
            <div className="col-3 booking-timeline-one">
              <p className="order-tracking">Order tracking</p>
              <BookingTimeLineOne></BookingTimeLineOne>
            </div>
            <div className="col-9">
              <div className="general-details row m-0 py-0">
                <div className="col-12 py-2 m-0">
                  <span className="full-name">
                    {getBookingResponse?.data?.teamMemberId?.name}
                  </span>{" "}
                  <span className="gender">
                    {getBookingResponse?.data?.teamMemberId?.gender},
                  </span>{" "}
                  <span className="dob">
                    Age :{" "}
                    {getBookingResponse?.data?.teamMemberId?.dob
                      ? moment().diff(
                          getBookingResponse?.data?.teamMemberId?.dob,
                          "years",
                          false
                        )
                      : ""}
                    ,
                  </span>{" "}
                  <span className="gender">
                    {getBookingResponse?.data?.teamMemberId?.relation}
                  </span>
                </div>
                <hr className="m-0" />
                <div className="col-12 py-2 m-0 general-details-2">
                  <div className="section">
                    <p className="heading">Test Included</p>
                    {getBookingResponse?.data?.packages?.map?.((item,index) => {
                      return <p className="values" key={index}>{item?.name}</p>;
                    })}
                  </div>
                  <div className="section">
                    <p className="heading">Preperation</p>
                  </div>
                  <div className="section">
                    <p className="heading">Price</p>
                    <p className="values">${getBookingResponse?.data?.total}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default BookingPage;
