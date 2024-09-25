import Opening from "@/model2/Opening";

export const POST = async (request, { params }) => {


  try {
    const requestBody = await request.json();

    const OpeningNew = new Opening({

      center: requestBody?.center ?? [],
      department: requestBody?.department ?? '',
      jobType: requestBody?.jobType ?? '',
      experience: requestBody?.experience ?? '',
      name: requestBody?.name ?? '',
      createdBy: requestBody?.createdBy ?? '',
      closedAt: requestBody?.closedAt ?? null,
      description: requestBody?.description ?? '',
      publishedAt: requestBody?.publishedAt ?? null,
    });



    await OpeningNew.save();
    return new Response(OpeningNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
