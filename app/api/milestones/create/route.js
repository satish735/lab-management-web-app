import Milestone from "@/model2/Milestone";

export const POST = async (request, { params }) => {

    try {
        const requestBody = await request.json();
        const MilestoneNew = new Milestone({
            year: requestBody?.year || "",
            title: requestBody?.title || "",
            desc: requestBody?.description || ""

        });
        await MilestoneNew.save();
        return new Response(MilestoneNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
