import Notification from "@/model2/Notification";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();

    const Notificationnew = new Notification({
      notificationHeader: requestBody?.notificationHeader,
      notificationDescription: requestBody?.notificationDescription,
      dateTime: ""
    });

    await Notificationnew.save();
    return new Response(Notificationnew, { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Errorr", { status: 500 });
  }
};
