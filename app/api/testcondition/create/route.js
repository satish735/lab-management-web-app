 
import TestCondition from "@/model2/TestCondition";
 
export const POST = async (request, { params }) => {
 
  
  try {
    const requestBody = await request.json();
 

    const TestConditionNew = new TestCondition({
      name: requestBody?.name || "",
      image: requestBody?.image || "",
      is_deleted: false

    });
  

    await TestConditionNew.save();
    return new Response(TestConditionNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
