import { parse } from 'url';
import Coupon from "@/model2/Coupon";

export const GET = async (request) => {
  try {
    const urlParams = parse(request.url, true);
    const { pageSize = 20, pageNo = 1, sortColumn = "createdat", sortDirection = "desc", 
      searchQuery = "", userId = null, testConditionId = null, packageId = null } = urlParams.query;

    const skip = (pageNo - 1) * pageSize;
    const sort = sortColumn ? { [sortColumn]: sortDirection === "desc" ? -1 : 1 } : {};

    const currentDate = new Date();

    const searchFilter = {
      $and: [
        { startdate: { $lte: currentDate } },
        { expirationdate: { $gte: currentDate } },
        { status: "active" }
      ]
    };

    if (searchQuery) {
      searchFilter.$or = [
        { couponcode: { $regex: searchQuery, $options: "i" } },
        { couponname: { $regex: searchQuery, $options: "i" } },
        { status: { $regex: searchQuery, $options: "i" } }
      ];
    }

    if (userId) {
      searchFilter.selectedusers = { $ne: null, $eq: userId };
    }
  




    const couponList = await Coupon.find(searchFilter)
      .sort(sort)
      .skip(skip)
      .limit(pageSize);

    const totalCount = await Coupon.countDocuments(searchFilter);

    return new Response(JSON.stringify({ data: couponList, total: totalCount }), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
