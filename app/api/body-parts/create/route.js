import BodyPart from "@/model2/BodyPart";

export const POST = async (request, { params }) => {
 
  
  try {
    const requestBody = await request.json();
   

    const BodyPartNew = new BodyPart({
      name: requestBody?.name || "",
      image: requestBody?.image || "",
      is_deleted: false

    });
  

    await BodyPartNew.save();
    return new Response(BodyPartNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
