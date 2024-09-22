import ContactUs from "@/model2/ContactUs";
 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const ContactUss =await ContactUs
      .findById(id);
    return new Response(JSON.stringify(ContactUss), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingContactUs = await ContactUs.findById(id);
    if (!existingContactUs) {
      return new Response("No Body Part found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingContactUs) {
        existingContactUs[key] = toUpdateBody[key];
      }
    }
    await existingContactUs.save();
    return new Response(JSON.stringify(existingContactUs), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await ContactUs.findByIdAndDelete(id);
    return new Response("Body Part deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
