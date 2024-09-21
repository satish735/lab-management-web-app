import TestReport from "@/model2/TestReport";
import { makeS3FilesPermanent } from '@/utils/S3Helpers'
import mongoose from "mongoose";
export const DELETE = async (request, { params }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { reportId = null } = params;
        var deletedReport = await TestReport.findByIdAndDelete(reportId).session(session)
        if (deletedReport) {
            await makeS3FilesPermanent(process.env.S3_BUCKET, "single", deletedReport?.reportFile, null)
        }
        await session.commitTransaction();
        return new Response(JSON.stringify(deletedReport), { status: 200 });
    } catch (error) {
        console.log(error);
        await session.abortTransaction();
        return new Response(error?.message, { status: 500 });
    }
    finally {
        session.endSession(); // Ensure session ends in both success and error cases
    }
};