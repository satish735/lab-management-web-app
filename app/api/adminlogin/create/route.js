import AdminLogin from "@/model2/AdminLogin";

export const POST = async (request, { params }) => {

    try {
        const requestBody = await request.json();

        
        const AdminLoginNew = new AdminLogin({

            email: requestBody?.email ?? '',
            username: requestBody?.username ?? '',
            role: requestBody?.role ?? '',
            name: requestBody?.name,
            gender: requestBody?.gender ?? "",
            dob: requestBody?.dob ?? null,
            image: requestBody?.image ?? "",
            iscenter: requestBody?.iscenter ?? [],
            bcryptPassword:requestBody?.bcryptPassword ?? ""

        });
        await AdminLoginNew.save();
        return new Response(AdminLoginNew, { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error", { status: 500 });
    }
};
