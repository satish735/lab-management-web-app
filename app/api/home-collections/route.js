import HomeCollection from "@/model2/HomeCollection";
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import HomeCollectionActivity from "@/model2/HomeCollectionActivity";
import SlotDate from "@/model2/SlotDate";
import SlotTime from "@/model2/SlotTime";
import Booking from "@/model2/Booking";
import { parse } from "url";
export const GET = async (request) => {
    try {
        const urlParams = parse(request.url, true);
        const { pageSize = 20, pageNo = 1, sortColumn = "createdAt", sortDirection = "desc", searchQuery = "", centerId = null } = urlParams.query;

        // Pagination and sorting setup
        const skip = (pageNo - 1) * pageSize;
        const sort = sortColumn ? { [sortColumn]: sortDirection === "desc" ? -1 : 1 } : {};

        // Filter setup
        const searchFilter = searchQuery
            ? { $or: [{ bookingId: { bookingId: { $regex: searchQuery, $options: "i" } } }, { collectedByName: { $regex: searchQuery, $options: "i" } }, { collectionStatus: { $regex: searchQuery, $options: "i" } }] }
            : {};
        if (centerId) searchFilter.bookingId = { centerId: centerId };

        // Fetch bookings
        const homeCollectionList = await HomeCollection.find(searchFilter)
            .populate({ path: "bookingId", select: "bookingId " })
            .sort(sort)
            .skip(skip)
            .limit(pageSize);

        // Get total count
        const totalCount = await HomeCollection.countDocuments(searchFilter);

        // Return response
        return new Response(JSON.stringify({ data: homeCollectionList, total: totalCount }), { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
};


export const PUT = async (request, { params }) => {
    try {
        const session = await getServerSession(authOptions)
        var userId = session?.user?.id
        if (!userId) {
            return new Response("Unauthorized Access!", { status: 401 });
        }
        const { homeCollectionId = null, type = null, ...restBody } = await request.json();
        if (!homeCollectionId || !type) {
            return new Response("Home Collecation and type cannot be null!", { status: 400 });
        }

        const homeCollection = await HomeCollection.findById(homeCollectionId)
        if (!homeCollection) {
            return new Response("No Home Collection found with given id!", { status: 404 });
        }
        switch (type) {
            case "confirmed":
                homeCollection.collectionStatus = "confirmed"
                await homeCollection.save()
                var newActivity = new HomeCollectionActivity({
                    userId,
                    homeCollectionId: homeCollectionId,
                    activityType: "HomeCollection confirmed",
                    description: restBody?.description ?? "<span>HomeCollection status has been changed to <span class='booking-badge confirmed'>Confirmed</span>.<span>"
                })
                await newActivity.save()
                break;
            case "picked":
                homeCollection.collectionStatus = "picked"
                homeCollection.originalCollectionDate = restBody?.picked_date ?? null
                homeCollection.originalCollectionTime = restBody?.picked_time ?? null
                homeCollection.samplesCollected = Array.isArray(restBody?.samples_collected) ? restBody?.samples_collected : []
                await homeCollection.save()
                var newActivity = new HomeCollectionActivity({
                    userId,
                    homeCollectionId: homeCollectionId,
                    activityType: "HomeCollection picked",
                    description: restBody?.description ?? "<span>HomeCollection status has been changed to <span class='booking-badge picked'>Picked</span>.<span>"
                })
                await newActivity.save()
                break;
            case "cancelled":
                homeCollection.collectionStatus = "cancelled"
                await homeCollection.save()
                var newActivity = new HomeCollectionActivity({
                    userId,
                    homeCollectionId: homeCollectionId,
                    activityType: "HomeCollection cancelled",
                    description: restBody?.description ?? "<span>HomeCollection status has been changed to <span class='booking-badge cancelled'>Cancelled</span>.<span>"
                })
                await newActivity.save()
                break;
            default:
                break
        }
        return new Response({ message: 'Home Collection updated Successfully.', type }, { status: 200 });
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

        const { booking_id = null, collectedBy = null, collectedByName = null, collectedByContact = null, samples_for_pick = [] } = await request.json();
        if (!booking_id || !collectedByName || !collectedByContact) {
            return new Response("Booking and collection person details cannot be null!", { status: 400 });
        }
        const bookingDetails = await Booking.findById(booking_id).populate({
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
            samplesToBeCollected: Array.isArray(samples_for_pick) ? samples_for_pick : [],
            collectedBy: (!collectedBy || collectedBy.trim() == "") ? null : collectedBy,
            collectedByName: collectedByName ?? "",
            collectedByContact: collectedByContact ?? ""
        })
        await homeCollection.save()
        var newActivity = new HomeCollectionActivity({
            userId,
            homeCollectionId: homeCollection?.id,
            activityType: "Home Collection created",
            description: "Home Collection has been created."
        })
        await newActivity.save()
        return new Response({ message: 'Home Collection has been created successfully!' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};


