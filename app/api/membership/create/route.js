import Membership from "@/model2/Membership";



export const POST = async (request, { params }) => {

    try {
        const requestBody = await request.json();
        console.log(requestBody);
       

        const MembershipNew = new Membership({
            name: requestBody?.name || "",
            banner: requestBody?.banner || "",
            validity: requestBody?.validity || null,
            price: requestBody?.price || null,
             
            discountOnPackagePercentage: requestBody?.discountOnPackagePercentage || null,
            // termsAndConditions: requestBody?.termsAndConditions || "",
            description: requestBody?.description || "",
            // benefits: requestBody?.benefits || "",
            type: requestBody?.type || "",
            // conditions: requestBody?.conditions || "",
            is_delete: requestBody?.is_delete ?? false,


        });

        console.log(MembershipNew);
        

        await MembershipNew.save();
        return new Response(MembershipNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
