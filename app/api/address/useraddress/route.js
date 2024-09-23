import Address from "@/model2/Address";
import { parse } from "url";

export const GET = async (request) => {
  try {
    const urlParams = parse(request.url, true);
    const { userId = null } = urlParams.query;

    if (!userId) {
      return new Response("userId is required", { status: 400 });
    }

    const getdata = await Address.find({ userId });

    return new Response(JSON.stringify(getdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
