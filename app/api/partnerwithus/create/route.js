import PartnerWithUs from "@/model2/PartnerWithUs";
export const POST = async (request, { params }) => {

    try {
        const requestBody = await request.json();


        const PartnerWithUsNew = new PartnerWithUs({
            text: requestBody?.text ?? '',
            type: requestBody?.type ?? '',

        });
        await PartnerWithUsNew.save();
        return new Response(JSON.stringify({ issubmit: true, res: PartnerWithUsNew }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response((error), { status: 500 })
    }
};
