import Center from "@/model2/Center";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();
    const newCenter = new Center({
      centreId:3,
      centre: 'Malviye Nagar Center' || "",
      // centreNameInApp: requestBody?.centreNameInApp || "",
      address: 'Malviye nagar, jaipur' || "",
      address2: '' || "",
      contact: '987778485' || "",
      pinCode: '303021' || "",
      email: 'endo123@gmail.com' || "",
      labOpeningTime: '8 AM' || "",
      labClosingTime: '8 PM' || "",
      latitude: '26.861969' || "",
      longitude: '75.806389' || "",
      labFacilities: [] || [],
      city: 'Jaipur',
      state: 'Rajasthan'
    });

    console.log(newCenter);

    await newCenter.save();
    return new Response(newCenter, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};

// centre: requestBody?.centre || "",
// centreNameInApp: requestBody?.centreNameInApp || "",
// address: requestBody?.address || "",
// address2: requestBody?.address2 || "",
// contact: requestBody?.contact || "",
// pinCode: requestBody?.pinCode || "",
// email: requestBody?.email || "",
// labOpeningTime: requestBody?.labOpeningTime || "",
// labClosingTime: requestBody?.labClosingTime || "",
// latitude: requestBody?.latitude || "",
// longitude: requestBody?.longitude || "",
// labFacilities: requestBody?.labFacilities || [],