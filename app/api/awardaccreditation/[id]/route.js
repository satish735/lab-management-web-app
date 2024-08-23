import AwardAccreditation from "@/model2/AwardAccreditation";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const getResEntries = await AwardAccreditation
      .findById(id);

    return new Response(JSON.stringify(getResEntries), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
   
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const findResIdEntries = await AwardAccreditation.findById(id);
    if (!findResIdEntries) {
      return new Response("No Award Accreditation found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in findResIdEntries) {
        findResIdEntries[key] = toUpdateBody[key];
      }
    }
    await findResIdEntries.save();
    return new Response(JSON.stringify(findResIdEntries), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await AwardAccreditation.findByIdAndDelete(id);
    return new Response("Award Accreditation deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
