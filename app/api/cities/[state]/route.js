import city from "@/models/city";

export const GET = async (request, { params }) => {
  try {
    const { state = null } = params;
    const sort = { name: 1 };
    const searchFilter = { state_code: { $regex: new RegExp(state, "i") } };
    const cityList = await city.find(searchFilter).sort(sort);
    const totalCount = await city.find(searchFilter).countDocuments();
    var response = { data: cityList, total: totalCount };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
