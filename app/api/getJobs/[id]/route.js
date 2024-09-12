
import JobRoles from "@/model2/JobRoles"; 

export const GET = async (request, { params }) => {
    try {
      const { id = null } = params;
      const JobRolesInstance =await JobRoles
        .findById(id)
         
        ;
      return new Response(JSON.stringify(JobRolesInstance), { status: 200 });
    } catch (error) {
      console.log(error);
      return new Response(error?.message, { status: 500 });
    }
  };