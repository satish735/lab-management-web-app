import AdminLogin from "@/model2/AdminLogin";

import { makeS3FilesPermanent } from '@/utils/S3Helpers'

export const POST = async (request, { params }) => {

    try {
        const requestBody = await request.json();

        const existingUser = await AdminLogin.findOne({
            $or: [
                { username: requestBody?.username },
                { email: requestBody?.email },
            ]
        });

        if (existingUser) {
            // Determine the field that already exists for a better response
            let message = 'An account with this ';
            if (existingUser.username === requestBody.username) message += 'User Name ';
            else if (existingUser.email === requestBody.email) message += 'Email ';
            message += 'already exists.';

            return new Response(JSON.stringify({ res: message, issubmit: false }), { status: 200 });
        }


        makeS3FilesPermanent(process.env.S3_BUCKET, "single", null, requestBody?.image)
        const AdminLoginNew = new AdminLogin({
            email: requestBody?.email ?? '',
            username: requestBody?.username ?? '',
            role: requestBody?.role ?? '',
            name: requestBody?.name,
            phone: requestBody?.phone ?? '',
            gender: requestBody?.gender ?? "",
            dob: requestBody?.dob ?? null,
            image: requestBody?.image ?? "",
            iscenter: requestBody?.iscenter ?? [],
            bcryptPassword: requestBody?.bcryptPassword ?? ""
        });
        await AdminLoginNew.save();
        return new Response(JSON.stringify({ issubmit: true, res: AdminLoginNew }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response((error), { status: 500 })
    }
};
