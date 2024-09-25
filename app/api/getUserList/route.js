


import UserDetails from "@/model2/UserDetails";


import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            apiFor
        } = urlParams.query;


        const searchFilter = {};

        const UserInstance = await UserDetails
            .find()
            .select('_id name');


        var response = { UserInstanceListing: UserInstance };
        return new Response(JSON.stringify(response), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
