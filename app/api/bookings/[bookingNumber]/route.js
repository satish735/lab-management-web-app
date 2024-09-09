import Booking from "@/model2/Booking";
export const GET = async (request, { params }) => {
    try {
        const { bookingNumber = null } = params;
        const bookingDetails = await Booking
            .findOne({ bookingId: bookingNumber }).populate({ path: "slotId", select: "slotStartTime slotDate", populate: { path: "slotDate", select: "date" } }).populate({ path: "teamMemberId", select: "name email" })
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
