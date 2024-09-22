import Enquiry from "@/model2/Enquiry";


export const POST = async (request, { params }) => {


    try {
        const requestBody = await request.json();

        const EnquireNew = new Enquiry({
            name: requestBody?.name || "",
            age: requestBody?.age || null,
            labName: requestBody?.labName || "",
            organizationName: requestBody?.organizationName || "",
            number: requestBody?.number || "",
            alternateNumber: requestBody?.alternateNumber || "",
            emailAddress: requestBody?.emailAddress || "",
            city: requestBody?.city || "",
            state: requestBody?.state || "",
            isExperienced: requestBody?.isExperienced || false,
            otherDetails: requestBody?.otherDetails || "",
            enquireType: requestBody?.enquireType || "",
            status:'New'
        });


        await EnquireNew.save();
        return new Response(EnquireNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
