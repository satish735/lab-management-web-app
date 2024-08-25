"use client"
import moment from "moment";
import React from "react";
import "./UpcomingSlots.css";
const UpcomingSlots = ({ slotData = [] }) => {
  return (
    <div className="upcoming-slots-section">
      <div className="date-section">
        {slotData.map((slotDateItem) => {
          return (
            <div className="date-block">
              <p>{moment(slotDateItem?.date).format("DD")}</p>
              <p>{moment(slotDateItem?.date).format("MMM")}</p>
              <p>{moment(slotDateItem?.date).format("YYYY")}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingSlots;
