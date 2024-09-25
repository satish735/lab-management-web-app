import SlotDate from "@/model2/SlotDate";
import SlotTime from "@/model2/SlotTime";
import mongoose from "mongoose";
export const POST = async (request, { params }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { slots = [], status = "active" } = await request.json();
        if (!slots || !Array.isArray(slots)) {
            await session.abortTransaction();
            session.endSession();
            return new Response("Slots cannot be null!", { status: 400 });

        }
        var slotIds = slots.map(slotItem => slotItem?._id)
        const SlotDateResult = await SlotDate.updateMany({ _id: { $in: slotIds } }, { status }, { session });
        const SlotTimeResult = await SlotTime.updateMany({ slotDate: { $in: slotIds } }, { status }, { session });
        await session.commitTransaction();
        session.endSession();
        return new Response({ message: 'SlotDates and SlotTimes updated successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        return new Response(error?.message, { status: 500 });
    }
};