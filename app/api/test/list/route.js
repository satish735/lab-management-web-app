import PackageTest from "@/model2/PackageTest";
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
      location = null,
      bodyPartsIds = null,
      conditionIds = null
    } = urlParams.query;

    let bodyPartsIdsArray=JSON.parse(bodyPartsIds ?? [])
    let conditionIdsArray=JSON.parse(conditionIds ?? [])

    const skip = (pageNo - 1) * pageSize;
    const sort = {};
    if (sortColumn) {
      sort[sortColumn] = sortDirection === "desc" ? -1 : 1;
    }
    const searchFilter = {};
    if (searchQuery) {
      searchFilter.$or = [{ name: { $regex: searchQuery, $options: "i" } }];
    }

    console.log(searchFilter, bodyPartsIdsArray, conditionIdsArray);


    if (bodyPartsIdsArray && bodyPartsIdsArray.length > 0) {
      searchFilter.bodyParts = { $in: bodyPartsIdsArray };
    }

    // If you have specific `conditions` IDs to filter by
    if (conditionIdsArray && conditionIdsArray.length > 0) {
      searchFilter.conditions = { $in: conditionIdsArray };
    }




    if (!location || location === null) {
      const PackageTestdata = await PackageTest
        .find(searchFilter)
        .sort(sort)
        .skip(skip)
        .limit(pageSize);


      const totalCount = await PackageTest.find(searchFilter).countDocuments();

      var response = { data: PackageTestdata, total: totalCount }

      return new Response(JSON.stringify(response), { status: 200 });
    }

    else {


      const PackageTestdata = await PackageTest
        .find(searchFilter).populate('availableInCenters')
        .sort(sort)
        .skip(skip)
        .limit(pageSize);



      let data = (PackageTestdata ?? []).filter((item) => {

        if ((item?.availableInCenters ?? []).some((value) => { return value.city === location })) {
          return item
        }
      })


      const getTotalCount = await PackageTest.find(searchFilter).populate('availableInCenters');

      let total_data = (getTotalCount ?? []).filter((item) => {
        if ((item?.availableInCenters ?? []).some((value) => { return value.city === location })) {
          return item
        }
      })

      var response = { data: data, total: (total_data ?? [])?.length }

      return new Response(JSON.stringify(response), { status: 200 });
    }


  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};




// const result = await Model.find()
//   .populate({
//     path: 'field1',
//     populate: { path: 'nestedField1' } // Nested populate
//   })
//   .populate('field2')
//   .exec();