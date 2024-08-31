import Booking from "@/model2/Booking";
import Transaction from "@/model2/Transaction";
import mongoose from "mongoose";
const { v4: uuidv4 } = require('uuid');
import { initiatePayment } from "@/utils/PhonePayHelper"
export const POST = async (request, { params }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { booking_ids = null } = await request.json();
        if (!booking_ids || !Array.isArray(booking_ids) || booking_ids.length < 1) {
            await session.abortTransaction();
            session.endSession();
            return new Response("Booking Id cannot be null!", { status: 400 });
        }
        var getBookings = await Booking.find({ _id: { $in: booking_ids } }).select("_id bookingId total");
        if (!getBookings.length != booking_ids.length) {
            await session.abortTransaction();
            session.endSession();
            return new Response("Bookings not found for given Booking Id's!", { status: 400 });
        }
        const merchantUserId = 'MUID-' + uuidv4().toString(36).slice(-6);
        const createTransaction = new Transaction({
            amount: getBookings.reduce((sum, item) => sum + (item.total != null ? item.total : 0), 0),
            description: "Payment for booking.",
            bookingId: booking_ids,
            referenceTransactionId: merchantUserId
        })
        await createTransaction.save({ session });
        var paymentinitiate = await initiatePayment({
            transactionid: createTransaction?.transactionId,
            merchantUserId,
            amount: createTransaction?.amount,
            redirectUrl: "test", callbackUrl: "api/bookings/transaction-callback"
        })
        if (paymentinitiate?.status == "failed") {
            throw new Error(paymentinitiate?.message)
        }
        await session.commitTransaction();
        session.endSession();

        return new Response(JSON.stringify(paymentinitiate), { status: 200 });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        return new Response(error?.message, { status: 500 });
    }
};


