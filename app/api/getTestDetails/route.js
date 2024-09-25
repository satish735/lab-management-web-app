


import BodyPart from "@/model2/BodyPart";
import PackageTest from "@/model2/PackageTest";
import TestCondition from "@/model2/TestCondition";

import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            apiFor
        } = urlParams.query;


        const searchFilter = {};

        const PackageTestInstance = await PackageTest
            .find({testType:'Test'});

            const PackageInstance = await PackageTest
            .find({testType:'Package'});

        const BodyPartInstance = await BodyPart
            .find(searchFilter);



        const TestConditionInstance = await TestCondition
            .find(searchFilter);




        var response = { BodyPartListing: BodyPartInstance, TestConditionListing: TestConditionInstance, PackageTestInstanceListing: PackageTestInstance ,PackagesListing:PackageInstance};
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
