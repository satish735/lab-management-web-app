import Address from "@/model2/Address";
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
      userID =null
    } = urlParams.query;


    const skip = (pageNo - 1) * pageSize;
    const sort = {};
    if (sortColumn) {
      sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
    }
    
    const searchFilter = { userID }; 
    
    if (searchQuery) {
      searchFilter.$or = [{ title: { $regex: searchQuery, $options: "i" } }];
    }

    const userinfodata = await Address
      .find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Address.find(searchFilter).countDocuments();

    const response = { data: userinfodata, total: totalCount };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Error", { status: 500 });
  }
};
