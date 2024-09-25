import AdminLogin from "@/model2/AdminLogin";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            center_id = null,
        } = urlParams.query;

        const searchFilter = {};
        if (center_id) {
            searchFilter.$or = [
                { iscenter: "*" },
                { iscenter: { $in: [center_id] } }
            ];
        }
        const getlistingdata = await AdminLogin
            .find(searchFilter).select("name email phone")
        var response = { data: getlistingdata };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
