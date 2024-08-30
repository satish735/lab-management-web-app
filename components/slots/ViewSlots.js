"use client"
import { Input, Spinner } from 'reactstrap'
import './Slots.css'
import React, { useState } from 'react'
import moment from 'moment'
import { FaXmark } from "react-icons/fa6";

const ViewSlots = ({ loading = false, slots = [], type = "view", setSlots = () => { }, selectedSlotList = [], setSelectedSlotList = () => { }, totalSlots = 0, style = {} }) => {
    const [selectedSlot, setSelectedSlot] = useState(null)
    const groupedSlots = groupTimeSlots(selectedSlot?.slotTimes ?? []);
    const removeSlot = (date) => {
        setSlots(prev => prev.filter(dateItem => dateItem?.date != date))
    }
    const removeSlotTime = (date, time) => {
        setSlots(prev => prev.map(dateItem => {
            if (dateItem?.date == date) {
                var newSlot = { ...dateItem, slotTimes: (dateItem?.slotTimes ?? []).filter(slotTimeItem => slotTimeItem?.slotStartTime != time) }
                setSelectedSlot(newSlot)
                return newSlot
            }
            return dateItem
        }).filter(dateItem => dateItem?.slotTimes && dateItem?.slotTimes.length > 0))
    }

    return (
        <>
            {["view"].includes(type) && selectedSlotList.length > 0 && <div
                className="w-100 justify-content-between d-flex p-2 px-3"
                style={{ backgroundColor: "rgb(227, 242, 253)" }}
            >
                <span>
                    {selectedSlotList.length}/{totalSlots} Item
                    {selectedSlotList.length === 1 ? "" : "s"} Selected
                </span>
                <span
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        setSelectedSlotList([]);
                    }}
                >
                    Clear
                </span>
            </div>}
            <div className='view-slots-section' style={style}>
                {loading && <div className="loading">
                    <Spinner
                        style={{
                            height: "3rem",
                            width: "3rem",
                            color: "#00265c",
                        }}
                    />
                </div>}
                {(!slots || slots?.length == 0) && !loading && (
                    <div className="no-content-found">
                        <img
                            src="/assets/icons/custom-tables/NoContentIcon.svg"
                            alt="No content found icon"
                            height="88px"
                            width={"160px"}
                        />
                        <p className="mt-2">No content found</p>
                    </div>
                )}
                {!loading && slots.length > 0 && <div className='w-100'>
                    {slots.map((slotItem, index) => {
                        var color_class = slotItem?.status == "disabled" ?
                            "disabled" :
                            moment(slotItem?.date).isBefore(moment(), 'day') ?
                                "past" :
                                moment(slotItem?.date).isSame(moment(), 'day') ?
                                    "current" :
                                    "upcoming"
                        var isSlotSelected = selectedSlot?.date && moment(slotItem?.date).isSame(moment(selectedSlot?.date), 'day') ? true : false
                        var isChecked = selectedSlotList.some(selectedSlotListItem => selectedSlotListItem?.date == slotItem?.date)
                        return <><div onClick={() => setSelectedSlot(isSlotSelected ? null : slotItem)} className={` slot-date-section ${color_class} ${isSlotSelected ? "selected" : ""}`} key={index}>
                            <p className="date-month">{moment(slotItem?.date).format("DD")}{" " + moment(slotItem?.date).format("MMM")}</p>
                            <p className="year">{moment(slotItem?.date).format("YYYY")}</p>
                            <p className={`day ${color_class} `}>{moment(slotItem?.date).format('ddd')}</p>
                            {["edit", "create"].includes(type) && <FaXmark className='remove-icon' onClick={(e) => {
                                e.stopPropagation();
                                removeSlot(slotItem?.date)
                            }} />}
                            {["view"].includes(type) && !moment(slotItem?.date).isBefore(moment(), 'day') && <Input
                                className='select-check'
                                type="checkbox"
                                checked={isChecked}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                onChange={(e) => {
                                    if (isChecked) {
                                        setSelectedSlotList(selectedSlotList.filter(selectedSlotListItem => selectedSlotListItem?.date != slotItem?.date))
                                    }
                                    else {
                                        setSelectedSlotList([...selectedSlotList, slotItem])
                                    }
                                }}
                            />}

                        </div>
                            {isSlotSelected && selectedSlot?.slotTimes && selectedSlot?.slotTimes.length > 0 && <div className='slot-time-section'>
                                {Object.entries(groupedSlots).map(([category, slots]) => (
                                    slots.length > 0 && (
                                        <div key={category}>
                                            <h2>{category} - Timings</h2>
                                            {slots.map((slot, index) => {
                                                var slot_color_class = slot?.status == "active" ? slot?.maxUse == slot?.currentUse ? "full" :
                                                    color_class == "current" && moment().isAfter(moment(slot?.slotStartTime, 'hh:mm A')) ? "past" : color_class : "disabled";
                                                return <div key={index} className='slot-time-block'>
                                                    <p className='timing'>{slot?.slotStartTime}</p>
                                                    <p className={`consumed ${slot_color_class}`}>{slot?.currentUse ?? 0}/{slot?.maxUse ?? 0}</p>
                                                    {["edit", "create"].includes(type) && <FaXmark className='remove-icon' onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeSlotTime(slotItem?.date, slot?.slotStartTime)
                                                    }} />}
                                                </div>
                                            }
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>}
                        </>
                    })}
                </div>}
            </div></>
    )
}

export default ViewSlots
const groupTimeSlots = (slots) => {
    const groups = {
        Morning: [],
        Afternoon: [],
        Evening: []
    };

    const categorizeTime = (timeStr) => {
        const [time, period] = timeStr.split(' ');
        const [hour] = time.split(':').map(Number);

        if (period === 'AM') {
            return hour === 12 ? 'Morning' : 'Morning'; // 12 AM is considered Morning, and other AM times
        } else if (period === 'PM') {
            if (hour === 12) return 'Afternoon'; // 12 PM (Noon) is considered Afternoon
            return hour >= 1 && hour <= 5 ? 'Afternoon' : 'Evening'; // 1 PM to 5 PM, and 6 PM to 11 PM
        }
        return 'Evening'; // Default case (shouldn't be hit)
    };

    slots.forEach(slot => {
        const category = categorizeTime(slot.slotStartTime);
        groups[category].push(slot);
    });

    return groups;
};