
import PackageCategory from "@/model2/PackageCategory";

export const POST = async (request, { params }) => {
   
    try {
        const requestBody = await request.json();
        const PackageCategoryNew = new PackageCategory({
            name: requestBody?.name || "" 

        });
        await PackageCategoryNew.save();
        return new Response(PackageCategoryNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
