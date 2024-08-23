import state from "@/models/state";
export const GET = async (request, { params }) => {
  try {
    const { country = null } = params;
    const sort = { name: 1 };
    const searchFilter = { country_code: { $regex: new RegExp(country, "i") } };

    const stateList = await state.find(searchFilter).sort(sort);
    const totalCount = await state.find(searchFilter).countDocuments();
    var response = { data: stateList, total: totalCount };
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
