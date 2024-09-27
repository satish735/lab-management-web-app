"use client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./UpcomingSlots.css";
import { FaXmark } from "react-icons/fa6";
import useAPI from "@/hooks/useAPI";
import { Spinner } from "reactstrap";
import toast from "react-hot-toast";
import transformErrorDefault from "@/utils/transformErrorDefault";
import { FaCheckToSlot } from "react-icons/fa6";
const UpcomingSlots = ({
  selectedSlot = null,
  onChange = () => {},
  setslotdata = () => {},
  selectedCenter = null,
}) => {
  const [selectedSlotDate, setSelectedSlotDate] = useState(null);
  const [getUpcomingSlotsResponse, getUpcomingSlotsHandler] = useAPI(
    {
      url: "/slots/upcoming-slots",
      method: "get",
      sendImmediately: false,
      params: {
        center_id: "66d0bfdc53c49c313401480e",
      },
    },
    (e) => {
      return e.data ?? [];
    },
    (e) => {
      toast.error(
        transformErrorDefault(
          "Something went wrong while Fetching Upcoming Slots!",
          e
        )
      );
      return e;
    }
  );
  useEffect(() => {
    if (selectedCenter) {
      getUpcomingSlotsHandler({
        params: {
          center_id: selectedCenter,
        },
      });
    }
  }, [selectedCenter]);
  const groupedSlots = groupTimeSlots(
    (selectedSlotDate?.slotTimes ?? []).filter(
      (slotTimeItem) => slotTimeItem?.type != "removed"
    )
  );
  return (
    <div className="w-100 text-center">
      <div className="upcoming-slots-date-section">
        {getUpcomingSlotsResponse?.fetching && (
          <div className="loading">
            <Spinner
              style={{
                height: "3rem",
                width: "3rem",
                color: "#00265c",
              }}
            />
          </div>
        )}
        {(!getUpcomingSlotsResponse?.data ||
          getUpcomingSlotsResponse?.data?.length == 0) &&
          !getUpcomingSlotsResponse?.fetching && (
            <div className="no-content-found">
              <img
                src="/assets/icons/custom-tables/NoContentIcon.svg"
                alt="No content found icon"
                height="88px"
                width={"160px"}
              />
              <p className="mt-2">No Upcoming Slots found</p>
            </div>
          )}
        {!getUpcomingSlotsResponse?.fetching &&
          Array.isArray(getUpcomingSlotsResponse?.data) && (
            <div className="w-100 text-start">
              {(getUpcomingSlotsResponse?.data ?? [])
                .filter((slotItem) => slotItem?.type != "removed")
                .map((slotItem, index) => {
                  var color_class =
                    slotItem?.status == "disabled"
                      ? "disabled"
                      : moment(slotItem?.date).isBefore(moment(), "day")
                      ? "past"
                      : moment(slotItem?.date).isSame(moment(), "day")
                      ? "current"
                      : "upcoming";
                  var isSlotSelected =
                    selectedSlotDate?.date &&
                    moment(slotItem?.date).isSame(
                      moment(selectedSlotDate?.date),
                      "day"
                    )
                      ? true
                      : false;
                  return (
                    <div
                      onClick={() =>
                        setSelectedSlotDate(isSlotSelected ? null : slotItem)
                      }
                      className={` slot-date-section ${color_class} ${
                        isSlotSelected ? "selected" : ""
                      }`}
                      key={index}
                    >
                      <p className="date-month">
                        {moment(slotItem?.date).format("DD")}
                        {" " + moment(slotItem?.date).format("MMM")}
                      </p>
                      <p className="year">
                        {moment(slotItem?.date).format("YYYY")}
                      </p>
                      <p className={`day ${color_class} `}>
                        {moment(slotItem?.date).format("ddd")}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
      </div>

      {selectedSlotDate && (
        <div className="upcoming-slots-time-section">
          {Object.entries(groupedSlots).map(
            ([category, slots]) =>
              slots.length > 0 && (
                <div key={category}>
                  <h2>{category} - Timings</h2>
                  {slots.map((slot, index) => {
                    var slot_color_class =
                      slot?.status == "active"
                        ? slot?.maxUse == slot?.currentUse
                          ? "full"
                          : moment(
                              `${selectedSlotDate?.date} ${slot?.slotStartTime}`,
                              "YYYY-MM-DD hh:mm A"
                            ).isBefore(moment())
                          ? "disabled"
                          : "upcoming"
                        : "disabled";
                    return (
                      <div
                        key={index}
                        className={`slot-time-block ${slot_color_class} ${
                          selectedSlot == slot?._id ? "selected" : ""
                        }`}
                        onClick={() => {
                          if (slot_color_class == "full") {
                            toast.error(
                              "Slot is fully booked.Please select available slot Time!"
                            );
                          } else if (
                            slot_color_class == "past" ||
                            slot_color_class == "disabled"
                          ) {
                            toast.error(
                              "Slot Time is over please select Upcoming Slot!"
                            );
                          } else if (slot_color_class == "upcoming") {
                            onChange(slot?._id);
                            setslotdata(slot);
                          }
                        }}
                      >
                        <p className="timing">{slot?.slotStartTime}</p>
                        <p className={`consumed ${slot_color_class}`}>
                          {slot?.currentUse ?? 0}/{slot?.maxUse ?? 0}
                        </p>
                        {selectedSlot == slot?._id && (
                          <FaCheckToSlot className="checked-icon" />
                        )}
                      </div>
                    );
                  })}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingSlots;

const groupTimeSlots = (slots) => {
  const groups = {
    Morning: [],
    Afternoon: [],
    Evening: [],
  };

  const categorizeTime = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    const [hour] = time.split(":").map(Number);

    if (period === "AM") {
      return hour === 12 ? "Morning" : "Morning"; // 12 AM is considered Morning, and other AM times
    } else if (period === "PM") {
      if (hour === 12) return "Afternoon"; // 12 PM (Noon) is considered Afternoon
      return hour >= 1 && hour <= 5 ? "Afternoon" : "Evening"; // 1 PM to 5 PM, and 6 PM to 11 PM
    }
    return "Evening"; // Default case (shouldn't be hit)
  };

  slots.forEach((slot) => {
    const category = categorizeTime(slot.slotStartTime);
    groups[category].push(slot);
  });

  return groups;
};
