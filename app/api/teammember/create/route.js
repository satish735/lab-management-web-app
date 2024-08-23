import StaffMember from "@/model2/StaffMember";
export const POST = async (request, { params }) => {
    try {
        const requestBody = await request.json();

        const addteammember = new StaffMember({
            name: requestBody?.name,
            gender: requestBody?.gender,
            phone: requestBody?.phone,
            email: requestBody?.email,
            post: requestBody?.post,
            qualification: requestBody?.qualification,
            qualificationDescription: requestBody?.qualificationDescription,
            type: requestBody?.type,
            experience: requestBody?.experience,
            image: requestBody?.image ?? ""
        });


        await addteammember.save();

        return new Response(JSON.stringify({ teammember: addteammember }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Errorr", { status: 500 });
    }
};
