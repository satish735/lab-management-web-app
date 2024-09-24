import Booking from "@/model2/Booking";
import SlotTime from "@/model2/SlotTime";
import SlotDate from "@/model2/SlotDate"; // Ensure this model is correctly registered
import UserDetails from "@/model2/UserDetails";
import { parse } from "url";

export const GET = async (request) => {
  try {
    // Parse URL parameters
    const urlParams = parse(request.url, true);
    const { pageSize = 20, pageNo = 1, sortColumn = "createdAt", sortDirection = "desc", teamMemberId = null } = urlParams.query;

    // Pagination and sorting configuration
    const skip = (pageNo - 1) * pageSize;
    const sort = {};
    if (sortColumn) {
      sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
    }

    // Fetch bookings with populated references
    const bookingList = await Booking.find({ teamMemberId: teamMemberId })
      .populate({
        path: "slotId",
        select: "slotStartTime slotDate",
        populate: {
          path: "slotDate",
          model: "SlotDate", // Ensure the model is registered
          select: "date",
        },
      })
      .populate({ path: "teamMemberId", select: "name email dob gender" })
      .populate({ path: "packages" })
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    // Get total count for pagination
    const totalCount = await Booking.countDocuments();

    // Response
    return new Response(JSON.stringify({ data: bookingList, total: totalCount }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
