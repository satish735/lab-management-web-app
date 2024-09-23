import Booking from "@/model2/Booking";
import SlotTime from "@/model2/SlotTime";
import SlotDate from "@/model2/SlotDate";
import { parse } from "url";
import mongoose from "mongoose";
import UserDetails from "@/model2/UserDetails";
import PackageTest from "@/model2/PackageTest";
export const GET = async (request) => {
  try {
    const urlParams = parse(request.url, true);
    const { pageSize = 20, pageNo = 1, sortColumn = "createdAt", sortDirection = "desc", searchQuery = "", centerId = null } = urlParams.query;

    // Pagination and sorting setup
    const skip = (pageNo - 1) * pageSize;
    const sort = sortColumn ? { [sortColumn]: sortDirection === "desc" ? -1 : 1 } : {};

    // Filter setup
    const searchFilter = searchQuery
      ? { $or: [{ bookingId: { $regex: searchQuery, $options: "i" } }, { status: { $regex: searchQuery, $options: "i" } }, { paymentStatus: { $regex: searchQuery, $options: "i" } }] }
      : {};
    if (centerId) searchFilter.centerId = centerId;

    // Fetch bookings
    const bookingList = await Booking.find(searchFilter)
      .populate({ path: "slotId", select: "slotStartTime slotDate", populate: { path: "slotDate", select: "date" } })
      .populate({ path: "teamMemberId", select: "name email" }).populate({
        path: "packages",
        select: "name preparation",
      })
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    // Get total count
    const totalCount = await Booking.countDocuments(searchFilter);

    // Return response
    return new Response(JSON.stringify({ data: bookingList, total: totalCount }), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
