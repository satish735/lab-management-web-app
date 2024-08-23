import Membership from "@/model2/Membership";

 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Membershipsdata = await Membership
      .findById(id);

    return new Response(JSON.stringify(Membershipsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

   
    const toUpdateBody = await request.json();
    
    const { id = null } = params;
    const existingMembership = await Membership.findById(id);
    if (!existingMembership) {
      return new Response("No Membership found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingMembership) {
        existingMembership[key] = toUpdateBody[key];
      }
    }
    await existingMembership.save();

     return new Response(JSON.stringify(existingMembership), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await Membership.findByIdAndDelete(id);
    return new Response("Membership deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
