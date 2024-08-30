import SlotDate from "@/model2/SlotDate";
import moment from "moment";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            center_id = null
        } = urlParams.query;
        if (!center_id) {
            return new Response("Center Id cannot be null for validating dates!", { status: 400 });
        }
        const today = moment().startOf('day');
        const startDateISO = today.format('YYYY-MM-DD');
        const slotDateArray = await SlotDate
            .find({ centerId: center_id, $gte: startDateISO, }).select("date").sort({ date: 1})
        var response = { data: slotDateArray.map(dateItem => dateItem?.date) }
        return new Response(JSON.stringify(response), { status: 200 });

    } catch (error) {
        return new Response(error?.message, { status: 500 });
    }
};