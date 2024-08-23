import blog from "@/models/blog";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Blog =await blog
      .findById(id);
    return new Response(Blog, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PATCH = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingBlog = await blog.findById(id);
    if (!existingBlog) {
      return new Response("No Blog found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingBlog) {
        existingBlog[key] = toUpdateBody[key];
      }
    }
    await existingBlog.save();
    return new Response(existingBlog, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await blog.findByIdAndDelete(id);
    return new Response("Blog deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
