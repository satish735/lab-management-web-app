import Enquiry from "@/model2/Enquiry";


import { parse } from "url";
export const GET = async (request, { params }) => {
  try {
    const urlParams = parse(request.url, true);
    const {
      pageSize = 20,
      pageNo = 1,
      sortColumn = "createdAt",
      sortDirection = "desc",
      searchQuery = "",
      type = null
    } = urlParams.query;
    const skip = (pageNo - 1) * pageSize;
    const sort = {};


    if (sortColumn) {
      sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
    }
    const searchFilter = {};
    if (type) {
      searchFilter.enquireType = type;
    }
    else {
      return new Response("Type cannot be null", { status: 500 });
    }



    if (searchQuery) {
      searchFilter.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }



    const Enquirys = await Enquiry
      .find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await Enquiry.find(searchFilter).countDocuments();
    var response = { data: Enquirys, total: totalCount };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
