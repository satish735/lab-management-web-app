import UserDetails from "@/model2/UserDetails";

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const UserDetailss = await UserDetails
      .findById(id);
    return new Response(JSON.stringify(UserDetailss), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
 
