"use client";

import {  useState } from "react";
import { useRouter } from "next/navigation";
import BreadcrumbDiv from "@/components/BreadcrumbDiv";
import GenrateSlots from "@/components/slots/GenrateSlots";
import ViewSlots from "@/components/slots/ViewSlots";

export default function Home() {
  const router = useRouter();






  const [genratedSlots, setGenratedSlots] = useState([{
    _id: "64e0c3e4c9d3e7000a0b8d1b",
    date: "2024-08-28T00:00:00.000Z",
    centerId: "64e0c3e4c9d3e7000a0b8d1a",
    status: "active",
  },
  {
    _id: "64e0c3e4c9d3e7000a0b8d1b",
    date: "2024-08-27T00:00:00.000Z",
    centerId: "64e0c3e4c9d3e7000a0b8d1a",
    status: "disabled",
  }, {
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
        maxUse: 50,
        currentUse: 19
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "10:00 AM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 19
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "12:00 PM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 50
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "02:00 PM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 50
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "04:00 PM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 19
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "10:00 PM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 19
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d29",
        slotStartTime: "12:00 AM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-25T08:00:00.000Z",
        updatedAt: "2024-08-25T08:00:00.000Z",
        maxUse: 50,
        currentUse: 0
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
        slotStartTime: "12:00 AM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-26T08:00:00.000Z",
        updatedAt: "2024-08-26T08:00:00.000Z",
        maxUse: 50,
        currentUse: 19
      },
      {
        _id: "64e0c3e4c9d3e7000a0b8d2b",
        slotStartTime: "10:00 AM",
        status: "active",
        timeInterval: 60,
        createdAt: "2024-08-26T08:00:00.000Z",
        updatedAt: "2024-08-26T08:00:00.000Z",
        maxUse: 50,
        currentUse: 8
      },
      // More slotTimes can be added here
    ],
    createdAt: "2024-08-26T08:00:00.000Z",
    updatedAt: "2024-08-26T08:00:00.000Z",
  },])



  return (
    <div>
      <BreadcrumbDiv
        options={[
          { label: "Home", link: "/admin" },
          { label: "Slots", link: "/admin/slots" },
          { label: "Create", active: true },
        ]}
      />
      <div className="admin-content-box">
        <h1 className="main-heading">Create Slots</h1>
        <p className="sub-heading">
          Easily Add and Configure a Slots to Application Database
        </p>
        <GenrateSlots slots={genratedSlots} setSlots={setGenratedSlots} centerId="testCenterId" />
        <br />
        <ViewSlots slots={genratedSlots} type={"create"} setSlots={setGenratedSlots} />
        <div className="w-100 text-end py-2">
          <button className="btn btn-theme secondary-outline me-2">Cancel</button>
          <button className="btn btn-theme primary ">Save Generated Slots</button>
        </div>
      </div>
    </div>
  );
} 
