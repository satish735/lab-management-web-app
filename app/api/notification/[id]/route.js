import Notification from "@/model2/Notification";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Notificationsdata = await Notification
      .findById(id);

    return new Response(JSON.stringify(Notificationsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

 
    const toUpdateBody = await request.json();

    const { id = null } = params;
    const existingBlog = await Notification.findById(id);
    if (!existingBlog) {
      return new Response("No Notification found with given id!", { status: 404 });
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
    await Notification.findByIdAndDelete(id);
    return new Response("Notification deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
