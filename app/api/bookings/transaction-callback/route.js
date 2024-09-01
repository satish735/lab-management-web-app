import Booking from "@/model2/Booking";
import Transaction from "@/model2/Transaction";
import mongoose from "mongoose";
import { parseCallbackResponse } from "@/utils/PhonePayHelper"
export const POST = async (request, { params }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const requestBody = await request.json();
        console.log(requestBody)
        var decodeReceivedResponse = parseCallbackResponse(requestBody?.response)
        if (decodeReceivedResponse?.status == "failed") {
            throw new Error(decodeReceivedResponse?.message)
        }
        var transactionResponse = decodeReceivedResponse?.decoded
        var getTransaction = await Transaction.findOne({ transactionId: transactionResponse?.data?.transactionId })
        getTransaction.status = transactionResponse?.data?.status == "COMPLETED" ? "completed" : "failed";
        var paymentMethod = transactionResponse?.data?.paymentInstrument?.type

        if (typeof paymentMethod == "string") {
            getTransaction.paymentMethod = paymentMethod.toLowerCase()
        }
        getTransaction.transactionDetails = transactionResponse
        await getTransaction.save({ session })
        var updateBookings = await Booking.updateMany({ _id: { $in: getTransaction?.bookingId } }, { paymentStatus: paymentMethod }, { session });
        await session.commitTransaction();
        session.endSession();
        return new Response({ message: 'Payment status updated successfully.' }, { status: 200 });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        session.endSession();
        return new Response(error?.message, { status: 500 });
    }
};


