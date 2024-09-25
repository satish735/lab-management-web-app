


import Center from "@/model2/Center";
import PackageTest from "@/model2/PackageTest";
 
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            apiFor
        } = urlParams.query;


        const searchFilter = {};

        const PackageTestInstance = await PackageTest
            .find({testType:'Test'})
            .select('name _id');

             

        const CenterInstance = await Center
            .find(searchFilter)
            .select('city _id');





        var response = { CenterListing: CenterInstance, PackageTestInstanceListing: PackageTestInstance };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
