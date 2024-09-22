import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

import Booking from "@/model2/Booking";
import Report from "@/model2/Report";
import TestReport from "@/model2/TestReport";
import { makeS3FilesPermanent } from '@/utils/S3Helpers'
export const POST = async (request, { params }) => {
    try {
        const session = await getServerSession(authOptions)
        var userId = session?.user?.id
        if (!userId) {
            return new Response("Unauthorized Access!", { status: 401 });
        }
        const { booking_id = null, new_report_list = [] } = await request.json();
        var filteredReportList = new_report_list?.filter?.(item => item?.reportFile && item?.testId)
        if (!booking_id || !Array.isArray(filteredReportList) || !(filteredReportList.length > 0)) {
            return new Response("Booking Id and report list cannot be null!", { status: 400 });
        }
        const bookingDetails = await Booking.findById(booking_id)
        if (!bookingDetails) {
            return new Response("No Booking found with given id!", { status: 404 });
        }
        const lastReport = await TestReport.findOne().sort({ sequence: -1 });
        var lastReportId = 0
        if (lastReport) {
            // lastReportId = parseInt(lastReport.reportId.replace('RPRT-', ''), 10);
            lastReportId = lastReport?.sequence
        }
        console.log(lastReportId)
        var bookingId = booking_id
        var teamMemberId = bookingDetails?.teamMemberId
        var generatedByName = session?.user?.name
        var generatedBy = userId
        var generatedByContact = session?.user?.phone
        var isUpdateFilesTag = makeS3FilesPermanent(process.env.S3_BUCKET, "multiple", null, filteredReportList.map(item => item?.reportFile))
        var newReports = await TestReport.insertMany(filteredReportList.map(({ testId, reportFile, ...rest }, index) => {
            return {
                testId, bookingId, reportFile, teamMemberId, generatedByName, generatedBy, generatedByContact,
                reportId: `RPRT-${index + lastReportId + 1}`,
                sequence: lastReportId + index + 1
            }
        }))
        return new Response(JSON.stringify(newReports), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};


