"use client"
import React, { useEffect, useState } from 'react'
import InputSelect from '../formInput/select/InputSelect'
import DatePicker, { Calendar, DateObject } from 'react-multi-date-picker'
import { FormGroup } from 'reactstrap'
import "react-multi-date-picker/styles/layouts/mobile.css"
import colors from "react-multi-date-picker/plugins/colors"
import moment from 'moment'
import InputMultipleSelect from '../formInput/select/InputMultipleSelect'
import toast from 'react-hot-toast'
const GenrateSlots = ({ slots = [], setSlots = () => { }, centerId = "" }) => {
    const [selectedPickType, setSelectedPickType] = useState()
    const [selectedRangeValues, setSelectedRangeValues] = useState()
    const [selectedMultiPick, setSelectedMultiPick] = useState()
    const [maxUse, setMaxUse] = useState(50)
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const disabledDateStrings = (slots ?? []).map(item => moment(item?.date).format('YYYY/MM/DD'));
    const [selectedInterval, setSelectedInterval] = useState(60)
    const [selectedSlots, setSelectedSlots] = useState([])
    const generateDateHandler = () => {
        if (!selectedPickType) {
            toast.error("select Dates to generate Slots.")
            return
        }
        if (!selectedSlots || selectedSlots.length === 0) {
            toast.error("select slot-timings to generate Slots.")
            return
        }
        if (selectedPickType == "range") {
            if ((!selectedRangeValues || selectedRangeValues.length == 0)) {
                toast.error("select date ranges to generate Slots.")
                return

            }
            var slotDates = selectedRangeValues.map(([startItem, endItem]) => {
                var startDate = moment(startItem.format("YYYY-MM-DD"), "YYYY-MM-DD");
                var endDate = moment(endItem.format("YYYY-MM-DD"), "YYYY-MM-DD");
                const datesList = [];

                // Loop through each date from startDate to endDate
                let currentDate = startDate.clone(); // Use clone to avoid modifying the original startDate
                while (currentDate <= endDate) {
                    datesList.push(currentDate.format("YYYY-MM-DD"));
                    currentDate.add(1, 'day'); // Move to the next day
                }

                return datesList;


            })
            setSlots(prev => [...prev, ...generateSlotAndTimeObjectFromDate(slotDates.flat(), selectedSlots)])
        }

        if (selectedPickType == "multi-pick") {
            if (!selectedMultiPick || selectedMultiPick.length == 0) {
                toast.error("select dates to generate Slots.")
                return
            }
            var slotDates = selectedMultiPick.map(item => item?.format("YYYY-MM-DD"))
            setSlots(prev => [...prev, ...generateSlotAndTimeObjectFromDate(slotDates, selectedSlots)])

        }
        genrateAfterMath()
    }
    const generateSlotAndTimeObjectFromDate = (dateArray = [], slotTimingArray = []) => {
        var slotNewArray = slotTimingArray.map(slotItem => {
            return {
                slotStartTime: slotItem?.value,
                status: "active",
                timeInterval: selectedInterval,
                maxUse: maxUse
            }
        })
        var slotDateArray = dateArray.map((dateItem) => {
            return {
                date: dateItem,
                centerId: centerId,
                status: "active",
                day: moment(dateItem).format('dddd').toLowerCase(),
                slotTimes: slotNewArray
            }
        })
        return slotDateArray
    }
    const genrateAfterMath = () => {
        setSelectedPickType(null)
        setSelectedRangeValues([])
        setSelectedMultiPick([])
        setSelectedSlots([])
    }
    return (
        <div>
            <h1>Genrate Slots </h1>
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-12'>
                    <InputSelect options={[{ value: "range", label: "With Range" }, { value: "multi-pick", label: "With Multi Picker" }]}
                        value={selectedPickType}
                        setValue={setSelectedPickType}
                        label='Select Picker Type'
                    />
                </div>
                {selectedPickType == "range" && <div className='col-lg-6 col-md-6 col-12'>
                    <FormGroup>
                        <label
                            className="ml-1  text-truncate w-100 "
                            htmlFor={"multi-range-picker-slots"}
                            style={{
                                userSelect: "none",
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "#0F0F0F",
                            }}
                        >
                            Select Multiple Ranges <span className="text-danger"> *</span>
                        </label>
                        <DatePicker
                            numberOfMonths={2}
                            inputClass='form-control w-100'
                            style={{ width: "100%" }}
                            containerStyle={{
                                width: "100%"
                            }}
                            name="multi-range-picker-slots"
                            className="rmdp-mobile"
                            value={selectedRangeValues}
                            multiple
                            range
                            headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                            mobileButtons={[
                                {
                                    label: "RESET",
                                    type: "button",
                                    className: "rmdp-button rmdp-action-button",
                                    onClick: () => setSelectedRangeValues(null),
                                },
                            ]}
                            onChange={(ranges) => {
                                const checkIfIsInRange = ranges.some(([start, end]) => {
                                    const startStr = start?.format?.();
                                    const endStr = end?.format?.();
                                    const startDate = new Date(startStr);
                                    const endDate = new Date(endStr);
                                    return (
                                        (disabledDateStrings).some(dateStr => {
                                            const date = new Date(dateStr);
                                            return date >= startDate && date <= endDate
                                        })
                                    );
                                });
                                console.log(checkIfIsInRange, "check")
                                if (checkIfIsInRange) return false;
                                setSelectedRangeValues(ranges);
                            }}
                            mapDays={({ date }) => {
                                let className;
                                const strDate = date.format();
                                if (disabledDateStrings.includes(strDate)) {
                                    className = "in-service"
                                };
                                // if (isInService(strDate)) className = "in-service";
                                if (className) return { className };
                            }}
                            minDate={minDate}
                        />
                    </FormGroup>
                </div>}
                {selectedPickType == "multi-pick" && <div className='col-lg-6 col-md-6 col-12'>
                    <FormGroup>
                        <label
                            className="ml-1  text-truncate w-100 "
                            htmlFor={"multi-range-picker-slots"}
                            style={{
                                userSelect: "none",
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "#0F0F0F",
                            }}
                        >
                            Select Multiple Dates <span className="text-danger"> *</span>
                        </label>
                        <DatePicker
                            numberOfMonths={2}
                            inputClass='form-control w-100'
                            style={{ width: "100%" }}
                            containerStyle={{
                                width: "100%"
                            }}
                            name="multi-range-picker-slots"
                            className="rmdp-mobile"
                            value={selectedMultiPick}
                            multiple

                            headerOrder={["MONTH_YEAR", "LEFT_BUTTON", "RIGHT_BUTTON"]}
                            mobileButtons={[
                                {
                                    label: "RESET",
                                    type: "button",
                                    className: "rmdp-button rmdp-action-button",
                                    onClick: () => setSelectedRangeValues(null),
                                },
                            ]}
                            onChange={(dates) => {
                                console.log(dates)
                                var newMultiDates = (dates ?? []).filter((singleDate) => !disabledDateStrings.includes(singleDate.format()))
                                console.log(newMultiDates)
                                setSelectedMultiPick(newMultiDates);
                            }}
                            mapDays={({ date }) => {
                                let className;
                                const strDate = date.format();
                                if (disabledDateStrings.includes(strDate)) {
                                    className = "in-service"
                                };
                                // if (isInService(strDate)) className = "in-service";
                                if (className) return { className };
                            }}
                            minDate={minDate}
                        />
                    </FormGroup>
                </div>}
                {!["range", "multi-pick"].includes(selectedPickType) && <div className='col-lg-6 col-md-6 col-12'></div>}
                <div className='col-lg-6 col-md-6 col-12'>
                    <InputSelect options={[{ value: 60, label: "60 mins" }]}
                        value={selectedInterval}
                        setValue={() => { }}
                        label='Select Slot Interval time in min'
                    />
                </div>
                <div className='col-lg-6 col-md-6 col-12'>
                    <InputMultipleSelect options={[
                        { label: "12:00 AM", value: "12:00 AM" },
                        { label: "01:00 AM", value: "01:00 AM" },
                        { label: "02:00 AM", value: "02:00 AM" },
                        { label: "03:00 AM", value: "03:00 AM" },
                        { label: "04:00 AM", value: "04:00 AM" },
                        { label: "05:00 AM", value: "05:00 AM" },
                        { label: "06:00 AM", value: "06:00 AM" },
                        { label: "07:00 AM", value: "07:00 AM" },
                        { label: "08:00 AM", value: "08:00 AM" },
                        { label: "09:00 AM", value: "09:00 AM" },
                        { label: "10:00 AM", value: "10:00 AM" },
                        { label: "11:00 AM", value: "11:00 AM" },
                        { label: "12:00 PM", value: "12:00 PM" },
                        { label: "01:00 PM", value: "01:00 PM" },
                        { label: "02:00 PM", value: "02:00 PM" },
                        { label: "03:00 PM", value: "03:00 PM" },
                        { label: "04:00 PM", value: "04:00 PM" },
                        { label: "05:00 PM", value: "05:00 PM" },
                        { label: "06:00 PM", value: "06:00 PM" },
                        { label: "07:00 PM", value: "07:00 PM" },
                        { label: "08:00 PM", value: "08:00 PM" },
                        { label: "09:00 PM", value: "09:00 PM" },
                        { label: "10:00 PM", value: "10:00 PM" },
                        { label: "11:00 PM", value: "11:00 PM" }
                    ]}
                        value={selectedSlots}
                        setValue={setSelectedSlots}
                        label='Select Slots'
                    />
                </div>
            </div>

            <div className='text-end'><button className='btn btn-theme primary' onClick={generateDateHandler}>Generate Slots</button></div>
        </div>
    )
}

export default GenrateSlots
