import { getPreSignedURL, getPreSignedURLforUpload } from "@/utils/S3Helpers";
import { parse } from "url";
export const GET = async (request, { params }) => {
  try {
    const urlParams = parse(request.url, true);
    const {
      file_path = null,
      type = "view",
      content_type = null,
    } = urlParams.query;
    if (!file_path) {
      throw new Error("File Path cannot be null!");
    }
    if (type == "view") {
      var presignedURL = await getPreSignedURL(
        process.env.S3_BUCKET,
        file_path,
        0.5
      );
      return new Response(null, {
        status: 302,
        headers: {
          location: presignedURL,
        },
      });
    } else if (type == "link-view") {
      var presignedURL = await getPreSignedURL(
        process.env.S3_BUCKET,
        file_path,
        0.5
      );
      return new Response(JSON.stringify({ url: presignedURL }), {
        status: 200,
      });
    } else if (type == "upload") {
      if (!content_type) {
        throw new Error("Content Type cannot be null!");
      }
      var presignedURL = await getPreSignedURLforUpload(
        process.env.S3_BUCKET,
        file_path,
        0.5,
        content_type
      );
      return new Response(JSON.stringify({ url: presignedURL }), {
        status: 200,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
