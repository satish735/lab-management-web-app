import HealthBulletin from "@/model2/HealthBulletin";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();

    const HealthBulitinsNew = new HealthBulletin({
      name: requestBody?.name

    });
    await HealthBulitinsNew.save();

    return new Response(HealthBulitinsNew, { status: 200 });
  } catch (error) {
    console.log(error);s
    return new Response("Errorr", { status: 500 });
  }
};
