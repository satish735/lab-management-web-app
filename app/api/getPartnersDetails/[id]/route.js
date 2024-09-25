import Enquiry from "@/model2/Enquiry";

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Enquirys = await Enquiry
      .findById(id);
    return new Response(JSON.stringify(Enquirys), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};

export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingEnquiry = await Enquiry.findById(id);
    if (!existingEnquiry) {
      return new Response("No detail found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingEnquiry) {
        existingEnquiry[key] = toUpdateBody[key];
      }
    }
    await existingEnquiry.save();
    return new Response(JSON.stringify(existingEnquiry), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};