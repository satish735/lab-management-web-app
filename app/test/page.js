"use client"
import UpcomingSlots from "@/components/slots/UpcomingSlots";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";
// sdfdsf
export default function Test() {
  const [selectedSlotId, setSelectedSlotId] = useState(null)

  return (
    <AdminLayout>
      <div style={{ height: "100vh",background:"white",width:"100%" }}>  <UpcomingSlots selectedSlot={selectedSlotId} onChange={setSelectedSlotId} /></div>
      dev-branch
    </AdminLayout>
  );
}
