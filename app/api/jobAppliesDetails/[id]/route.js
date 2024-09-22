import JobApply from "@/model2/JobApply";
 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const JobApplys =await JobApply
      .findById(id);
    return new Response(JSON.stringify(JobApplys), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingJobApply = await JobApply.findById(id);
    if (!existingJobApply) {
      return new Response("No Body Part found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingJobApply) {
        existingJobApply[key] = toUpdateBody[key];
      }
    }
    await existingJobApply.save();
    return new Response(JSON.stringify(existingJobApply), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
 
