

import Center from "@/model2/Center";


import { parse } from "url";
export const GET = async (request, { params }) => {
    try {

        // Step 1: Get distinct city names
        const distinctCities = await Center.distinct("city");
        const getCenters = await Center.find();

        let data = (getCenters ?? []).map((item) => {
            return { label: item?.centre + ', '+item?.city, value: item?._id }
        })



        var response = { cityArray: distinctCities, centerListing: data };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
