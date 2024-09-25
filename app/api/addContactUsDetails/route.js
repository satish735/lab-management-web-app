import ContactUs from "@/model2/ContactUs";


export const POST = async (request, { params }) => {


    try {
        const requestBody = await request.json();

        const EnquireNew = new ContactUs({
            name: requestBody?.name || "",
            phone: requestBody?.phone || "",
            email: requestBody?.email || "",
            interestedIn: requestBody?.interestedIn || "",
            city: requestBody?.city || "",
            message: requestBody?.message || "",
            status: 'New'
        });


        await EnquireNew.save();
        return new Response(EnquireNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};


