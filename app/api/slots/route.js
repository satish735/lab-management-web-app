import SlotDate from "@/model2/SlotDate";
import SlotTime from "@/model2/SlotTime";
import mongoose from "mongoose";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            pageSize = 20,
            pageNo = 1,
            sortColumn = "createdAt",
            sortDirection = "desc",
            searchQuery = "",
            centerId = null
        } = urlParams.query;

        const skip = (pageNo - 1) * pageSize;
        const sort = {};
        if (sortColumn) {
            sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
        }
        const searchFilter = {};
        if (searchQuery) {
            searchFilter.$or = [{ date: { $regex: searchQuery, $options: "i" } }, { status: { $regex: searchQuery, $options: "i" } }, { day: { $regex: searchQuery, $options: "i" } }];
        }
        if (centerId) {
            searchFilter.centerId = centerId

        }
        const userinfodata = await SlotDate
            .find(searchFilter).populate({
                path: 'slotTimes',
                select: 'slotStartTime status timeInterval maxUse currentUse' // Include only these fields
            })
            .sort(sort)
            .skip(skip)
            .limit(pageSize);
        const totalCount = await SlotDate.find(searchFilter).countDocuments();
        var response = { data: userinfodata, total: totalCount }
        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        return new Response(error?.message, { status: 500 });
    }
};

export const POST = async (request, { params }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { slots = [], center_id = null } = await request.json();
        if (!slots || !Array.isArray(slots) || !center_id) {
            await session.abortTransaction();
            session.endSession();
            return new Response("Slots and center Id cannot be null!", { status: 400 });

        }
        var slotDates = slots.map(slotItem => slotItem?.date)
        var alreadySlotDates = await SlotDate.find({ date: { $in: slotDates } }).select("date").session(session);
        if (alreadySlotDates.length > 0) {
            await session.abortTransaction();
            session.endSession();
            return new Response("System already has slots for dates " + alreadySlotDates.map((dateItem) => dateItem?.date).join(', ') + "!", { status: 400 });
        }
        const slotDatePromises = [];
        const slotTimePromises = [];

        for (const slotDateData of slots) {
            // Create SlotDate
            const slotDate = new SlotDate({
                date: slotDateData?.date,
                day: slotDateData?.day,
                centerId: center_id,
                status: "active",
            });

            slotDatePromises.push(slotDate.save({ session }));

            // Prepare SlotTimes for this SlotDate
            const slotTimes = slotDateData?.slotTimes.map(slotTimeData => {
                return {
                    slotStartTime: slotTimeData?.slotStartTime,
                    slotDate: slotDate._id,
                    status: "active",
                    timeInterval: slotTimeData?.timeInterval,
                    maxUse: slotTimeData?.maxUse
                }

                // Link SlotTimes to this SlotDate
            });

            // Create SlotTimes
            slotTimePromises.push(SlotTime.insertMany(slotTimes, { session }));
        }

        await Promise.all(slotDatePromises);
        await Promise.all(slotTimePromises);
        await session.commitTransaction();
        session.endSession();
        return new Response({ message: 'SlotDates and SlotTimes created successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        return new Response(error?.message, { status: 500 });
    }
};


