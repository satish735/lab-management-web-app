import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HomeCollection from "@/model2/HomeCollection";
import UserDetails from "@/model2/UserDetails";
import Address from "@/model2/Address";
import Booking from "@/model2/Booking";
import HomeCollectionActivity from "@/model2/HomeCollectionActivity";
export const GET = async (request, { params }) => {
    try {
        const { collectionId = null } = params;
        const homeCollectionDetails = await HomeCollection.findOne({ _id: collectionId })
            .populate({ path: "activities", populate: { path: "userId", select: "name" } })
            .populate({
                path: "bookingId",
                select: "teamMemberId addressId bookingId centerId status paymentStatus",
                populate: { path: "teamMemberId", select: "name email gender relation dob" },
                populate: { path: "addressId" },
            })
            ;
        return new Response(JSON.stringify(homeCollectionDetails), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};