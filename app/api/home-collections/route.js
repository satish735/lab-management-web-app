import HomeCollection from "@/model2/HomeCollection";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HomeCollectionActivity from "@/model2/HomeCollectionActivity";
import SlotDate from "@/model2/SlotDate";
import SlotTime from "@/model2/SlotTime";
export const GET = async (request, { params }) => {
    try {
        var response = {}
        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        return new Response(error?.message, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    try {
        const session = await getServerSession(authOptions)
        var userId = session?.user?.id
        if (!userId) {
            return new Response("Unauthorized Access!", { status: 401 });
        }
        const { homeCollectionId = null, type = null } = await request.json();
        if (!homeCollectionId || !type) {
            return new Response("Home Collecation and type cannot be null!", { status: 400 });
        }

        const homeCollection = await HomeCollection.findById(homeCollectionId)
        if (!homeCollection) {
            return new Response("No Home Collection found with given id!", { status: 404 });
        }
        switch (type) {

        }
        var newActivity = new HomeCollectionActivity({
            userId,
            bookingId: bookingNumber,
            activityType: "Booking cancelled",
            description: restBody?.description ?? "Booking has been cancelled by admin user."
        })
        await newActivity.save()
        return new Response({ message: 'Home Collection updated Successfully.' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};
export const POST = async (request, { params }) => {
    try {
        const session = await getServerSession(authOptions)
        var userId = session?.user?.id
        if (!userId) {
            return new Response("Unauthorized Access!", { status: 401 });
        }

        const { booking_id = null, collectedBy = null, collectedByName = null, collectedByContact = null } = await request.json();
        if (!booking_id || !collectedByName || !collectedByContact) {
            return new Response("Booking and collection person details cannot be null!", { status: 400 });
        }
        const bookingDetails = await Booking.findById(bookingNumber).populate({
            path: "slotId",
            select: "slotStartTime slotDate",
            populate: { path: "slotDate", select: "date" },
        })
        if (!bookingDetails) {
            return new Response("No Booking found with given id!", { status: 404 });
        }

        var homeCollection = new HomeCollection({
            bookingId: booking_id,
            selectedCollectionDate: bookingDetails?.slotId?.slotDate?.date ?? null,
            selectedCollectionTime: bookingDetails?.slotId?.slotStartTime ?? "",
            collectionStatus: "pending",
            samplesToBeCollected: [],
            collectedBy: collectedBy ?? null,
            collectedByName: collectedByName ?? "",
            collectedByContact: collectedByContact ?? ""
        })
        await newActivity.save()
        var newActivity = new HomeCollectionActivity({
            userId,
            homeCollectionId: homeCollection?.id,
            activityType: "Home Collection created",
            description: restBody?.description ?? "Home Collection has been created in system."
        })
        await newActivity.save()
        return new Response({ message: 'Home Collection has been created successfully!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};


