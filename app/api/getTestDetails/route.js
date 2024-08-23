


import BodyPart from "@/model2/BodyPart";
import Membership from "@/model2/Membership";

import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            apiFor
        } = urlParams.query;


        const searchFilter = {};

        const MembershipInstance = await BodyPart
            .find(searchFilter)
            .sort(sort)
            .skip(skip)
            .limit(pageSize);
        const totalCount = await Membership.find(searchFilter).countDocuments();
        var response = { data: MembershipInstance, total: totalCount };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
