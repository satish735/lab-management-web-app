import AwardAccreditation from "@/model2/AwardAccreditation";
export const POST = async (request, { params }) => {
  try {
    var requestBody = await request.json();

    const createentries = new AwardAccreditation({
      name: requestBody?.title,
      desc: requestBody?.desc,
      time: requestBody?.date,
    });

    await createentries.save();

    return new Response(createentries, { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Errorr", { status: 500 });
  }
};
