import Center from "@/model2/Center";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const searchedCenter = await Center.findById(id);
    return new Response(JSON.stringify(searchedCenter), { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingCenter = await Center.findById(id);
    if (!existingCenter) {
      return new Response("No Center found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingCenter) {
        existingCenter[key] = toUpdateBody[key];
      }
    }
    await existingCenter.save();
    return new Response(JSON.stringify(existingCenter), { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await Center.findByIdAndDelete(id);
    return new Response("Center deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
