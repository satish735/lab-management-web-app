import TempFile from "@/model2/TempFile";
import { parse } from "url";

export const GET = async (request, { params }) => {
  try {
    const urlParams = parse(request.url, true);
    const { file_path = null } = urlParams.query;
    if (!file_path) {
      throw new Error("File Path cannot be null!");
    }
    const tempFile = await TempFile.findOne({ file_path: file_path });
    return new Response(JSON.stringify(tempFile), { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    if (!requestBody?.file_path) {
      throw new Error("File Path cannot be null!");
    }
    const tempFileNew = new TempFile({
      file_path: requestBody?.file_path || "",
    });
    await tempFileNew.save();
    return new Response(tempFileNew, { status: 200 });
  } catch (error) {
    return new Response(error?.message, { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const urlParams = parse(request.url, true);
    const { id = null } = urlParams.query;
    if (!id) {
      throw new Error("Id cannot be null!");
    }
    await blog.findByIdAndDelete(id);
    return new Response("Temp File deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
