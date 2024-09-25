import Coupon from "@/model2/Coupon";

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const Coupons = await Coupon
      .findById(id);
    return new Response(JSON.stringify(Coupons), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    const toUpdateBody = await request.json();
    const { id = null } = params;
    const existingCoupon = await Coupon.findById(id);
    if (!existingCoupon) {
      return new Response("No Coupon found with given id!", { status: 404 });
    }
 
    const existingCouponObj = existingCoupon.toObject();
    for (const key in toUpdateBody) {
 
       if (key in existingCouponObj) {
 
        existingCoupon[key] = toUpdateBody[key];
      }
    }
    await existingCoupon.save();
    return new Response(JSON.stringify(existingCoupon), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await Coupon.findByIdAndDelete(id);
    return new Response("Coupon deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
