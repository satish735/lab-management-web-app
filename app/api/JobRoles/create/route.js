import JobRoles from "@/model2/JobRoles";

export const POST = async (request, { params }) => {


  try {
    const requestBody = await request.json();
    const observation = (requestBody?.position ?? []).map(obs => obs.job_position);

    const JobRolesNew = new JobRoles({
      jobRole: requestBody?.jobRole || "",
      position: observation || [],
      is_deleted: false

    });


    await JobRolesNew.save();
    return new Response(JobRolesNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
