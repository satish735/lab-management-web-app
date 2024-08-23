import PackageTest from "@/model2/PackageTest";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const PackageTestsdata = await PackageTest
      .findById(id);

    return new Response(JSON.stringify(PackageTestsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

    console.log("paramsparams", params)
    const toUpdateBody = await request.json();
    console.log("lllllllllll",toUpdateBody)
    const { id = null } = params;
    const existingBlog = await PackageTest.findById(id);
    if (!existingBlog) {
      return new Response("No PackageTest found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingBlog) {
        existingBlog[key] = toUpdateBody[key];
      }
    }
    await existingBlog.save();

    console.log("existingBlog", existingBlog)
    return new Response(JSON.stringify(existingBlog), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await PackageTest.findByIdAndDelete(id);
    return new Response("PackageTest deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
