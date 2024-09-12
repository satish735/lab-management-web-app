
import JobRoles from "@/model2/JobRoles";

export const GET = async (request, { params }) => {
    try {

        const JobRolesInstance = await JobRoles.find() ;
        return new Response(JSON.stringify(JobRolesInstance), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};