 
import PackageTest from "@/model2/PackageTest";

 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const PackageTestdata = await PackageTest
      .findById(id);

    return new Response(JSON.stringify(PackageTestdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

   
    const toUpdateBody = await request.json();
    
    const { id = null } = params;
    const existingPackageTest = await PackageTest.findById(id);
    if (!existingPackageTest) {
      return new Response("No Test found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingPackageTest) {
        existingPackageTest[key] = toUpdateBody[key];
      }
    }
    await existingPackageTest.save();

     return new Response(JSON.stringify(existingPackageTest), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await PackageTest.findByIdAndDelete(id);
    return new Response("Test deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
