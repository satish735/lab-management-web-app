import HealthBulletin from "@/model2/HealthBulletin";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const healthbulletinsdata = await HealthBulletin
      .findById(id);
    return new Response(JSON.stringify(healthbulletinsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {


    const toUpdateBody = await request.json();

    const { id = null } = params;
    const existingBlog = await HealthBulletin.findById(id);
    if (!existingBlog) {
      return new Response("No health bulletin found with given id!", { status: 404 });
    }
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
    await HealthBulletin.findByIdAndDelete(id);
    return new Response("health bulletin deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
