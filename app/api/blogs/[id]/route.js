import Blog from "@/model2/Blog";
import { makeS3FilesPermanent } from '@/utils/S3Helpers'

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Blogsdata = await Blog
      .findById(id);

    return new Response(JSON.stringify(Blogsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

    console.log("paramsparams", params)
    const toUpdateBody = await request.json();
    console.log("lllllllllll", toUpdateBody)
    makeS3FilesPermanent(process.env.S3_BUCKET, "single", toUpdateBody?.oldImage, toUpdateBody?.image)

    const { id = null } = params;
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      return new Response("No Blog found with given id!", { status: 404 });
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
    await Blog.findByIdAndDelete(id);
    return new Response("Blog deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
