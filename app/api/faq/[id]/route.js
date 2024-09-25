import FAQ from "@/model2/FAQ";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const FAQsdata = await FAQ
      .findById(id);

    return new Response(JSON.stringify(FAQsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

    console.log("vvvvvvvvvv")
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingBlog = await FAQ.findById(id);

    for (const key in toUpdateBody) {
      if (key in existingBlog) {
        existingBlog[key] = toUpdateBody[key];
      }
    }
    await existingBlog.save();
    return new Response(JSON.stringify(existingBlog), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await FAQ.findByIdAndDelete(id);
    return new Response("FAQ deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
