import BookingActivity from "@/model2/BookingActivity";
import HomeCollection from "@/model2/HomeCollection";
import HomeCollectionActivity from "@/model2/HomeCollectionActivity";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Booking from "@/model2/Booking";
export const POST = async (request, { params }) => {
    try {
        const { type = null, id = null, name = null, description = null } = await request.json();
        const session = await getServerSession(authOptions)
        var userId = session?.user?.id
        if (!userId) {
            return new Response("Unauthorized Access!", { status: 401 });
        }
        if (!type || !id || !name) {
            return new Response("Type, Id and name cannot be null", { status: 400 });

        }
        var responseResult = {}
        switch (type) {
            case "booking":
                const bookingDetails = await Booking.findById(id)
                if (!bookingDetails) {
                    return new Response("No Booking found with given id!", { status: 404 });
                }
                var newActivity = new BookingActivity({
                    userId,
                    bookingId: id,
                    activityType: name,
                    description: description ?? ""
                })
                await newActivity.save()
                responseResult.message = "Booking Activity created successfully"
                break
            case "home-collection":
                const homeCollection = await HomeCollection.findById(id)
                if (!homeCollection) {
                    return new Response("No Booking found with given id!", { status: 404 });
                }
                var newActivity = new HomeCollectionActivity({
                    userId,
                    homeCollectionId: id,
                    activityType: name,
                    description: description ?? ""
                })
                await newActivity.save()
                responseResult.message = "HomeCollection Activity created successfully"

                break
            default:
                responseResult.message = "Unknown type was found in request."
                break
        }

        return new Response(JSON.stringify(responseResult), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};