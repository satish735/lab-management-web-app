


import PackageTest from "@/model2/PackageTest";

import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            type = null,
            id = null
        } = urlParams.query;


        const searchFilter = {};
        searchFilter[type] = id

        // for tests
        const TestInstance = await PackageTest
            .find({ searchFilter, testType: 'Test' });

        // const PackageInstance = await PackageTest
        //     .find({ TestId: { $in: ttSchemaIds } });
                // { searchFilter, testType: 'Package' }
                const packageTests = await PackageTest.find()
                .populate({
                  path: 'itemId'
                }) 

                console.log(packageTests);
                



        var response = { PackageTestInstanceListing: TestInstance,packageTests:packageTests };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
