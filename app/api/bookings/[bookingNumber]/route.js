import HomeCollection from "@/model2/HomeCollection";
import Booking from "@/model2/Booking";
import BookingActivity from "@/model2/BookingActivity";
import SlotTime from "@/model2/SlotTime";
import UserDetails from "@/model2/UserDetails";
import SlotDate from "@/model2/SlotDate";
import PackageTest from "@/model2/PackageTest";
import Address from "@/model2/Address";

import HomeCollectionActivity from "@/model2/HomeCollectionActivity";
import Transaction from "@/model2/Transaction";
export const GET = async (request, { params }) => {
  try {
    const { bookingNumber = null } = params;
    const bookingDetails = await Booking.findOne({ bookingId: bookingNumber })
      .populate({
        path: "packages",
        select: "name itemId testType",
        populate: { path: "itemId", select: "testType name" },
      })
      .populate({
        path: "slotId",
        select: "slotStartTime slotDate",
        populate: { path: "slotDate", select: "date" },
      })
      .populate({
        path: "teamMemberId",
        select: "name email gender relation dob",
      }).populate({
        path: "addressId"
      }).populate({ path: "homeCollection", populate: { path: "activities" } })
      .populate({ path: "activities" }).populate({ path: "transactions" })

      ;
    return new Response(JSON.stringify(bookingDetails), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const { bookingNumber = null } = params;
    const { type, ...restBody } = await request.json();
    console.log(type)
    const bookingDetails = await Booking.findById(bookingNumber)
    if (!bookingDetails) {
      return new Response("No Booking found with given id!", { status: 404 });
    }
    var responseResult = { message: "" }
    switch (type) {
      case "confirmation":
        console.log(type)
        bookingDetails.status = "confirmed"
        await bookingDetails.save();
        var newActivity = new BookingActivity({
          bookingId: bookingNumber,
          activityType: "Booking Confirmed",
          description: "Booking has been confirmed by admin user."
        })
        await newActivity.save()
        responseResult = { message: "Booking has been confirmed successfully" }
        break
      case "cancellation":
        bookingDetails.isCancelled = true
        await bookingDetails.save();
        var newActivity = new BookingActivity({
          bookingId: bookingNumber,
          activityType: "Booking cancelled",
          description: "Booking has been cancelled by admin user."
        })
        await newActivity.save()
        responseResult = { message: "Booking has been cancelled successfully" }
        break
      case "mark-payment":
        bookingDetails.paymentStatus = "completed"
        bookingDetails.paymentType = "cash"
        await bookingDetails.save();
        var newActivity = new BookingActivity({
          bookingId: bookingNumber,
          activityType: "Booking payment marked as paid",
          description: "Booking payment marked as paid and Payment type chnaged to cash by Admin User."
        })
        await newActivity.save()
        responseResult = { message: "Booking Payment is marked as paid successfully." }
        break
      default:
        responseResult.message = "Unknow type was found in booking update!"
        break
    }
    return new Response(JSON.stringify(responseResult), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};

// export const DELETE = async (request, { params }) => {
//   try {
//     const { id = null } = params;
//     await Blog.findByIdAndDelete(id);
//     return new Response("Blog deleted successfully.", { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response(error?.message, { status: 500 });
//   }
// };
