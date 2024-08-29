"use client"
import moment from "moment";
import React, { useState } from "react";
import "./UpcomingSlots.css";
const UpcomingSlots = ({ slotData = [] }) => {
  const [selectedSlotDate, setSelectedSlotDate]
    = useState(null)
  return (
    <> {
      slotData.length > 0 && <div className="upcoming-slots-section">
        <div className="date-section">
          {slotData.map((slotDateItem) => {
            return (
              <div className="date-block" onClick={() => { setSelectedSlotDate(slotDateItem) }}>
                <p className="date-month">{moment(slotDateItem?.date).format("DD")}{" " + moment(slotDateItem?.date).format("MMM")}</p>
                <p className="year">{moment(slotDateItem?.date).format("YYYY")}</p>
                <p className="day">{moment(slotDateItem?.date).format('ddd')}</p>
              </div>
            );
          })}
        </div>

        {selectedSlotDate && <div className="slot-setion">
          <TimeGroupedView items={selectedSlotDate?.slotTimes ?? []} />
        </div>}
      </div>
    }</>
  );
};

export default UpcomingSlots;
// Determine the slot based on AM/PM format
const getSlot = (timeStr) => {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  // Handle 12:00 AM specifically
  if (hours === 12 && period === 'AM') {
    return 'Morning';
  }

  // Handle 12:00 PM specifically
  if (hours === 12 && period === 'PM') {
    return 'Afternoon';
  }

  // Convert hours to 24-hour format for simplicity
  let hours24 = hours;
  if (period === 'PM' && hours !== 12) {
    hours24 += 12;
  }
  if (period === 'AM' && hours === 12) {
    hours24 = 0;
  }

  // Determine slot based on 24-hour hours
  if (hours24 >= 0 && hours24 < 12) {
    return 'Morning';
  } else if (hours24 >= 12 && hours24 < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
};

// Group items by time slot
const groupBySlot = (items) => {
  return items.reduce((acc, item) => {
    const slot = getSlot(item.slotStartTime);
    if (!acc[slot]) {
      acc[slot] = [];
    }
    acc[slot].push(item);
    return acc;
  }, {});
};

const TimeGroupedView = ({ items }) => {
  const groupedItems = groupBySlot(items);

  return (
    <div>
      {Object.keys(groupedItems).map((slot) => (
        <div key={slot} className="py-2">
          <h2 className="slot-category-heading">{slot}</h2>
          <div>
            {groupedItems[slot].map((item, index) => (
              <div key={index} className="slot-time-slot">{item.slotStartTime}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};