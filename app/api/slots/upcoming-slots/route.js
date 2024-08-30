import SlotDate from "@/model2/SlotDate";
import moment from "moment";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            count = 7,
            center_id = null
        } = urlParams.query;
        if (!center_id) {
            return new Response("Center Id cannot be null for upcoming slots!", { status: 400 });
        }
        const today = moment().startOf('day');
        const endDate = moment().add(Number(count ?? 0), 'days').endOf('day');
        const startDateISO = today.format('YYYY-MM-DD');
        const endDateISO = endDate.format('YYYY-MM-DD');
        const upcomingSlotData = await SlotDate
            .find({ status: "active", centerId: center_id, $gte: startDateISO, $lte: endDateISO }).populate({
                path: 'slotTimes',
                select: 'slotStartTime status timeInterval maxUse currentUse' // Include only these fields
            }).sort({ date: 1})
        var response = { data: upcomingSlotData }
        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        return new Response(error?.message, { status: 500 });
    }
};