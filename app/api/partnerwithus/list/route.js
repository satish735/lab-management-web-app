 

import PartnerWithUs from "@/model2/PartnerWithUs";
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
    } = urlParams.query;
    const skip = (pageNo - 1) * pageSize;
    const sort = {};
    if (sortColumn) {
      sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
    }
    const searchFilter = {};
    if (searchQuery) {
      searchFilter.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
    }
    const getlistingdata = await PartnerWithUs
      .find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);
    const totalCount = await PartnerWithUs.find(searchFilter).countDocuments();
    var response = { data: getlistingdata, total: totalCount };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};