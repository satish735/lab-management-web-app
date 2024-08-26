import MenuItems from "@/components/multilevel-dropdown/MenuItems";
import MultiLevelDropDown from "@/components/multilevel-dropdown/MultiLevelDropDown";
import UpcomingSlots from "@/components/slots/UpcomingSlots";
// sdfdsf
export default function Test() {
  const slotData = [
    {
      _id: "64e0c3e4c9d3e7000a0b8d1b",
      date: "2024-08-25T00:00:00.000Z",
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
        // More slotTimes can be added here
      ],
      createdAt: "2024-08-25T08:00:00.000Z",
      updatedAt: "2024-08-25T08:00:00.000Z",
    },
    {
      _id: "64e0c3e4c9d3e7000a0b8d1c",
      date: "2024-08-26T00:00:00.000Z",
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
    // More SlotDates can be added here
  ];

  return (
    <div>
      <UpcomingSlots slotData={slotData} />
    </div>
  );
}
