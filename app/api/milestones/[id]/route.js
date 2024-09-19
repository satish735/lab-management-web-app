import Milestone from "@/model2/Milestone";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const getdata = await Milestone
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
    const getfindbyid = await Milestone.findById(id);

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
    await Milestone.findByIdAndDelete(id);
    return new Response("Milestone deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
