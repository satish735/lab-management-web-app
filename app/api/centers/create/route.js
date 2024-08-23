import Center from "@/model2/Center";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    const newCenter = new Center({
      centre: requestBody?.centre || "",
      centreNameInApp: requestBody?.centreNameInApp || "",
      address: requestBody?.address || "",
      address2: requestBody?.address2 || "",
      contact: requestBody?.contact || "",
      pinCode: requestBody?.pinCode || "",
      email: requestBody?.email || "",
      labOpeningTime: requestBody?.labOpeningTime || "",
      labClosingTime: requestBody?.labClosingTime || "",
      latitude: requestBody?.latitude || "",
      longitude: requestBody?.longitude || "",
      labFacilities: requestBody?.labFacilities || [],
    });
    await newCenter.save();
    return new Response(newCenter, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
