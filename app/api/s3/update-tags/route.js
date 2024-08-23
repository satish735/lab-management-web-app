import { addUpdateTagBucket } from "@/utils/S3Helpers";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    if (!requestBody?.file_path) {
      throw new Error("File Path cannot be null!");
    }
    var updatedTags = await addUpdateTagBucket(
      process.env.S3_BUCKET,
      requestBody?.file_path,
      requestBody?.tag_set ?? []
    );

    return new Response(JSON.stringify(updatedTags), { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};
