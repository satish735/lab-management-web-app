

import Center from "@/model2/Center";


import { parse } from "url";
export const GET = async (request, { params }) => {
    try {

        // Step 1: Get distinct city names
        const distinctCities = await Center.distinct("city");


        var response = { cityArray: distinctCities };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
