"use client"
import React, { useState } from 'react'
import './Slots.css'
import GenrateSlots from './GenrateSlots'
import UpcomingSlots from './UpcomingSlots'

const CreateSlots = () => {
    const [slots, setSlots] = useState([{
        _id: "64e0c3e4c9d3e7000a0b8d1b",
        date: "2024-08-29T00:00:00.000Z",
        centerId: "64e0c3e4c9d3e7000a0b8d1a",
        status: "active",
        slotTimes: [
            {
                _id: "64e0c3e4c9d3e7000a0b8d28",
                slotStartTime: "08:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "10:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "12:00 PM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "02:00 PM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "04:00 PM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "10:00 PM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d29",
                slotStartTime: "12:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-25T08:00:00.000Z",
                updatedAt: "2024-08-25T08:00:00.000Z",
            },
            // More slotTimes can be added here
        ],
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
    },
    {
        _id: "64e0c3e4c9d3e7000a0b8d1c",
        date: "2024-08-30T00:00:00.000Z",
        centerId: "64e0c3e4c9d3e7000a0b8d1a",
        status: "active",
        slotTimes: [
            {
                _id: "64e0c3e4c9d3e7000a0b8d2a",
                slotStartTime: "08:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-26T08:00:00.000Z",
                updatedAt: "2024-08-26T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d2b",
                slotStartTime: "10:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-26T08:00:00.000Z",
                updatedAt: "2024-08-26T08:00:00.000Z",
            },
            // More slotTimes can be added here
        ],
        createdAt: "2024-08-26T08:00:00.000Z",
        updatedAt: "2024-08-26T08:00:00.000Z",
    },
    {
        _id: "64e0c3e4c9d3e7000a0b8d1c",
        date: "2024-09-01T00:00:00.000Z",
        centerId: "64e0c3e4c9d3e7000a0b8d1a",
        status: "active",
        slotTimes: [
            {
                _id: "64e0c3e4c9d3e7000a0b8d2a",
                slotStartTime: "08:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-26T08:00:00.000Z",
                updatedAt: "2024-08-26T08:00:00.000Z",
            },
            {
                _id: "64e0c3e4c9d3e7000a0b8d2b",
                slotStartTime: "10:00 AM",
                status: "active",
                timeInterval: 60,
                createdAt: "2024-08-26T08:00:00.000Z",
                updatedAt: "2024-08-26T08:00:00.000Z",
            },
            // More slotTimes can be added here
        ],
        createdAt: "2024-08-26T08:00:00.000Z",
        updatedAt: "2024-08-26T08:00:00.000Z",
    },])
    return (
        <div>
            <GenrateSlots slots={slots} setSlots={setSlots} />
            <UpcomingSlots slotData={slots} />
        </div>
    )
}

export default CreateSlots
