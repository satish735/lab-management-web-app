import UserDetails from "@/model2/UserDetails";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();


    const UserDetailsnew = new UserDetails({
      name: requestBody?.name,
      email: requestBody?.email,
      gender: requestBody?.gender,
      dob: requestBody?.dob,
      relation: requestBody?.relation,
      loginId: requestBody?.loginId ?? "66f068edbc706deb4886b17f",
    });

    await UserDetailsnew.save();




    return new Response(JSON.stringify(UserDetailsnew), { status: 200 });

  } catch (error) {
    console.log("error", error)
    return new Response("Errorr", { status: 500 });
  }
};
