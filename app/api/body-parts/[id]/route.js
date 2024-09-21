import BodyPart from "@/model2/BodyPart";
 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const BodyParts =await BodyPart
      .findById(id);
    return new Response(JSON.stringify(BodyParts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingBodyPart = await BodyPart.findById(id);
    if (!existingBodyPart) {
      return new Response("No Body Part found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingBodyPart) {
        existingBodyPart[key] = toUpdateBody[key];
      }
    }
    await existingBodyPart.save();
    return new Response(JSON.stringify(existingBodyPart), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await BodyPart.findByIdAndDelete(id);
    return new Response("Body Part deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
