import Opening from "@/model2/Opening";
 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Openings =await Opening
      .findById(id);
    return new Response(JSON.stringify(Openings), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    
    const { id = null } = params;
    const existingOpening = await Opening.findById(id);
    if (!existingOpening) {
      return new Response("No Job Post found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingOpening) {
        existingOpening[key] = toUpdateBody[key];
      }
    }
    await existingOpening.save();
    return new Response(JSON.stringify(existingOpening), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await Opening.findByIdAndDelete(id);
    return new Response("Job Post deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
