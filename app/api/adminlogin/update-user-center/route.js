import AdminLogin from "@/model2/AdminLogin";
import Center from "@/model2/Center";
import { parse } from "url";
export const GET = async (request, { params }) => {
    try {
        const urlParams = parse(request.url, true);
        const {
            user_id = null
        } = urlParams.query;
        if (!user_id) {
            throw new Error("User not found with given Id!");
        }
        const User = await AdminLogin
            .findById(user_id).populate({ path: "currentCenter", select: "centre city state" });
        var currentCenter = User?.currentCenter
        if (!User) {
            throw new Error("User not found with given Id!");
        }
        var getCentersFilter = {}
        if (Array.isArray(User?.iscenter) && (User?.iscenter?.includes?.("*") || User.role == "admin")) {
            getCentersFilter = { publishedAt: { $ne: null } }
        }
        else if (Array.isArray(User?.iscenter) && User.iscenter.length > 0) {
            getCentersFilter = { id: { $in: User.iscenter }, publishedAt: { $ne: null } }
        }
        else {
            throw new Error("Centers are not assigned to user. Ask Admin to add centers to user!");
        }

        var centers = await Center.find(getCentersFilter).select("centre city state")
        if (centers.some(item => item?.id == User?.currentCenter?.id) && User?.currentCenter) {
            currentCenter = User?.currentCenter
        }
        else {
            currentCenter = centers[0]
            User.currentCenter = currentCenter?.id
            await User.save();
        }
        return new Response(JSON.stringify({
            centers, currentCenter, user: User
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};

export const POST = async (request, { params }) => {
    try {
        const urlParams = parse(request?.url, true);
        const {
            user_id = null, center_id = null
        } = urlParams.query;
        if (!user_id || !center_id) {
            throw new Error("User and Center not found with given Id!");
        }
        const User = await AdminLogin
            .findById(user_id).select("name");
        const FetchedCenter = await Center
            .findById(center_id).select("centre city state publishedAt");

        // || !FetchedCenter?.publishedAt
        if (!User || !FetchedCenter) {
            throw new Error("User Or Center not found with given Id!");
        }
        User.currentCenter = center_id
        await User.save();
        return new Response(JSON.stringify({
            currentCenter: FetchedCenter, user: User
        }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(error?.message, { status: 500 });
    }
};