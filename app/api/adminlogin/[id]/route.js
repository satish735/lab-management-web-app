import AdminLogin from "@/model2/AdminLogin";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const getdata = await AdminLogin
      .findById(id);

    return new Response(JSON.stringify(getdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

    const toUpdateBody = await request.json();
    const { id = null } = params;
    const getfindbyid = await AdminLogin.findById(id);
    if (!existinguser) {
      return new Response("No user found with given id!", { status: 404 });
    }
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
    await AdminLogin.findByIdAndDelete(id);
    return new Response("user deleted successfully.", { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
