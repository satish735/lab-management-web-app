import Booking from "@/model2/Booking";
import BookingActivity from "@/model2/BookingActivity";
import SlotTime from "@/model2/SlotTime";
import UserDetails from "@/model2/UserDetails";
import SlotDate from "@/model2/SlotDate";
import PackageTest from "@/model2/PackageTest";
import Address from "@/model2/Address";
import HomeCollection from "@/model2/HomeCollection";
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
// export const PUT = async (request, { params }) => {
//   try {

//     console.log("paramsparams", params)
//     const toUpdateBody = await request.json();
//     console.log("lllllllllll", toUpdateBody)
//     const { id = null } = params;
//     const existingBlog = await Blog.findById(id);
//     if (!existingBlog) {
//       return new Response("No Blog found with given id!", { status: 404 });
//     }
//     for (const key in toUpdateBody) {
//       if (key in existingBlog) {
//         existingBlog[key] = toUpdateBody[key];
//       }
//     }
//     await existingBlog.save();

//     console.log("existingBlog", existingBlog)
//     return new Response(JSON.stringify(existingBlog), { status: 200 });

//   } catch (error) {
//     console.log(error);
//     return new Response(error?.message, { status: 500 });
//   }
// };

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
