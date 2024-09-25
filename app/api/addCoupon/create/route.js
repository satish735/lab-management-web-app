import Coupon from "@/model2/Coupon";

export const POST = async (request, { params }) => {


  try {
    const requestBody = await request.json();

    console.log(requestBody);
    
    const CouponNew = new Coupon({
      couponName: requestBody?.couponName || "",
      couponCode: requestBody?.couponCode || "",
      userType: requestBody?.userType || "",
      selectedUsers: requestBody?.selectedUsers || [],
      expirationDate: requestBody?.expirationDate || "",
      startDate: requestBody?.startDate || "",
      maxUsage: requestBody?.maxUsage || "",
      maxUsagePerUser: requestBody?.maxUsagePerUser || "",
      discountType: requestBody?.discountType || "",
      discountValue: requestBody?.discountValue || "",
      selectedCriteria: requestBody?.selectedCriteria || {},
      descriptionShort: requestBody?.descriptionShort || "",
      termsCondition: requestBody?.termsCondition || [],
      descriptionLong: "",
      selectedCenters: requestBody?.selectedCenters || [],
      status: requestBody?.status || '',
      criteriaFields:requestBody?.criteriaFields || [],
      is_deleted: false
    });
    console.log(CouponNew);


    await CouponNew.save();
    return new Response(CouponNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
