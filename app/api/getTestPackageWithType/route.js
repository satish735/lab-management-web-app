


import PackageTest from "@/model2/PackageTest";

import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            type = null,
            id = null,
            sortColumn = "createdAt",
            sortDirection = "desc",
        } = urlParams.query;

        const sort = {};
        if (sortColumn) {
            sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
        }
        const searchFilter = {};


        // for tests and package
        const TestPackageInstance = await PackageTest
            .find()
            .populate('itemId')
            .sort(sort)

  


        var response = { PackageTestInstanceListing: TestPackageInstance };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
