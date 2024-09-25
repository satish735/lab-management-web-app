import Login from "@/model2/Login";

export const PUT = async (request, { params }) => {
    try {
      const toUpdateBody = await request.json();
      const { id = null } = params;
      const existingLogin = await Login.findById(id);
      if (!existingLogin) {
        return new Response("No user found with given id!", { status: 404 });
      }
      for (const key in toUpdateBody) {
        if (key in existingLogin) {
          existingLogin[key] = toUpdateBody[key];
        }
      }
      await existingLogin.save();
      return new Response(JSON.stringify(existingLogin), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(error?.message, { status: 500 });
    }
  };

  export const GET = async (request, { params }) => {
    try {
      const { id = null } = params;
      const Logins =await Login
        .findById(id);
      return new Response(JSON.stringify(Logins), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(error?.message, { status: 500 });
    }
  };