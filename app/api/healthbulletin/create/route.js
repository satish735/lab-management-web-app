import HealthBulletin from "@/model2/HealthBulletin";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    console.log("requestBody", requestBody)
    const HealthBulitinsNew = new HealthBulletin({
      name: requestBody?.name,
      backgroundLink: requestBody?.backgroundLink,
      broucher_link: requestBody?.broucherLink 
    });
    await HealthBulitinsNew.save();

    return new Response(HealthBulitinsNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Errorr", { status: 500 });
  }
};
