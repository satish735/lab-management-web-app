"use client";
import LoaderAndNoContent from "@/components/loaders/LoaderAndNoContent";
import useAPI from "@/hooks/useAPI";
import useTopLoader from "@/hooks/useTopLoader";
import transformErrorDefault from "@/utils/transformErrorDefault";
import React from "react";
import toast from "react-hot-toast";
import "./BookingPage.css";
import moment from "moment";
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
            <div className="col-3 status-tracking">
              <p className="order-tracking">Order tracking</p>
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
                <div className="col-12 py-2 m-0">
                  <span>dfg</span> <span>dfg</span> <span>dfg</span>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default BookingPage;
