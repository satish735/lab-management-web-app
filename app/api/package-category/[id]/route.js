import PackageCategory from "@/model2/PackageCategory";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const getdata = await PackageCategory
      .findById(id);

    return new Response(JSON.stringify(getdata), { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const getfindbyid = await PackageCategory.findById(id);

    for (const key in toUpdateBody) {
      if (key in getfindbyid) {
        getfindbyid[key] = toUpdateBody[key];
      }
    }
    await getfindbyid.save();
    return new Response(JSON.stringify(getfindbyid), { status: 200 });

  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await PackageCategory.findByIdAndDelete(id);
    return new Response("PackageCategory deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
