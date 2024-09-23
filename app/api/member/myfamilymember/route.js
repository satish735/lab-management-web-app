import UserDetails from "@/model2/UserDetails";
import { parse } from "url";

export const GET = async (request, { params }) => {
  try {

    const urlParams = parse(request.url, true);
    const {
      loginId = null
    } = urlParams.query;

    const userinfodata = await UserDetails.find({ loginId });

    return new Response(JSON.stringify(userinfodata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
