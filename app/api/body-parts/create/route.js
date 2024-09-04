import BodyPart from "@/model2/BodyPart";
import { makeS3FilesPermanent } from '@/utils/S3Helpers'

export const POST = async (request, { params }) => {
 
  
  try {
    const requestBody = await request.json();
    makeS3FilesPermanent(process.env.S3_BUCKET, "single", null, requestBody?.image)

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
