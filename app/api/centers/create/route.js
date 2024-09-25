import Center from "@/model2/Center";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();

      // Generate centreId here if you choose not to use the pre-save hook for this
      const lastCentre = await Center.findOne().sort({ centreId: -1 });
      const lastId = lastCentre ? parseInt(lastCentre.centreId.replace("center", "")) : 0;
      let newCentreId;
      if (lastId >= 99999) {
        newCentreId = `center${lastId + 1}`;
      } else {
        newCentreId = `center${String(lastId + 1).padStart(5, "0")}`;
      }

     
      

    const newCenter = new Center({
      centreId: newCentreId,  // Set the generated centreId
      centre: requestBody?.centre || null,
      address: requestBody?.address || null,
      address2: requestBody?.address2 || null,
      contact: requestBody?.contact || null,
      pinCode: requestBody?.pinCode || null,
      email: requestBody?.email || null,
      labOpeningTime: requestBody?.labOpeningTime || null,
      labClosingTime: requestBody?.labClosingTime || null,
      latitude: requestBody?.latitude || null,
      longitude: requestBody?.longitude || null,
      labFacilities: requestBody?.labFacilities || [],
      city: requestBody?.city || null,
      state: requestBody?.state || null
    });



 
    await newCenter.save();
    return new Response(newCenter, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};

