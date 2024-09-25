
import Opening from "@/model2/Opening";

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const OpeningInstance = await Opening
      .findById(id)

      ;
    return new Response(JSON.stringify(OpeningInstance), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};


