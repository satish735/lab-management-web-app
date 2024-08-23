import Blog from "@/model2/Blog";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
 
    const BlogNew = new Blog({
      title: requestBody?.title || "",
      author: requestBody?.author || "",
      description: requestBody?.description || "",
      is_home: requestBody?.is_home ?? false,
      trending: requestBody?.trending ?? false,
      published_at: requestBody?.published_at ?? null,
      image: requestBody?.image ?? null,
      ckdescription: requestBody?.ckdescription ?? null

    });

    console.log("requestBody", BlogNew)
    await BlogNew.save();
    return new Response(BlogNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
