import Address from "@/model2/Address";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();


    const AddressDetailsnew = new Address({
      addressType: requestBody?.addressType,
      houseNo: requestBody?.houseNo,
      addressLine1: requestBody?.addressLine1,
      phone: requestBody?.phone,
      pincode: requestBody?.pincode,
      state:requestBody?.state ?? "",
      city:requestBody?.city ?? "",
      userId:'66cf404ac1f2412ff270857f'
    });




    await AddressDetailsnew.save();



    return new Response(AddressDetailsnew, { status: 200 });
  } catch (error) {
    console.log("error", error)
    return new Response("Errorr", { status: 500 });
  }
};
