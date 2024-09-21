import TestCondition from "@/model2/TestCondition";
import blog from "@/models/blog";
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const TestConditions =await TestCondition
      .findById(id);
      return new Response(JSON.stringify(TestConditions), { status: 200 });
    } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingTestCondition = await TestCondition.findById(id);
    if (!existingTestCondition) {
      return new Response("No Test Condition found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingTestCondition) {
        existingTestCondition[key] = toUpdateBody[key];
      }
    }
    await existingTestCondition.save();
    return new Response(JSON.stringify(existingTestCondition), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await TestCondition.findByIdAndDelete(id);
    return new Response("Test Condition deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
