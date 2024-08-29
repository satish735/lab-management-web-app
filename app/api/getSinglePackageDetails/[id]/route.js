
import PackageTest from "@/model2/PackageTest";
 


export const GET = async (request, { params }) => {
    try {
      const { id = null } = params;
      const PackageTestInstance =await PackageTest
        .findById(id)
        .populate('itemId')
        ;
      return new Response(JSON.stringify(PackageTestInstance), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(error?.message, { status: 500 });
    }
  };