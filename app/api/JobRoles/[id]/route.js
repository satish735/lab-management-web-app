import JobRoles from "@/model2/JobRoles";
 
export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const JobRoless =await JobRoles
      .findById(id);
    return new Response(JSON.stringify(JobRoless), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    
    const { id = null } = params;
    const existingJobRoles = await JobRoles.findById(id);
    if (!existingJobRoles) {
      return new Response("No Job Post found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingJobRoles) {
        existingJobRoles[key] = toUpdateBody[key];
      }
    }
    await existingJobRoles.save();
    return new Response(JSON.stringify(existingJobRoles), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null} = params;
    await JobRoles.findByIdAndDelete(id);
    return new Response("Job Post deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
