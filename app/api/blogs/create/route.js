import blog from "@/models/blog";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    const BlogNew = new blog({
      title: requestBody?.title || "",
      author: requestBody?.author || "",
      description: requestBody?.description || "",
      category_id: requestBody?.category_id,
      image: requestBody?.image || "",
      is_home: requestBody?.is_home ?? false,
      metaTitle: requestBody?.metaTitle || "",
      metaDescription: requestBody?.metaDescription || "",
      keywords: requestBody?.keywords ?? [],
      trending: requestBody?.trending ?? false,
      is_popular: requestBody?.is_popular ?? false,
      published_at: requestBody?.published_at ?? null,
    });
    await BlogNew.save();
    return new Response(BlogNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
