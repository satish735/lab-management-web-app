import testpackage from "@/models/testPackage";

export const POST = async (request, { params }) => {
  try {
console.log("kkkkkk");
    const requestBody = await request.json();
    console.log('tests////////////////////////////////////////////////////////////'
    );

    const tests = new testpackage({
      name: requestBody.name ?? null,
      price: requestBody.price ?? null,
      
      description: requestBody.description ?? null,

      body_parts_type: requestBody.body_parts_type ?? null,
      medical_conditions: requestBody.medical_conditions ?? null,
      observations: requestBody.observations ?? null,
      no_of_test_done: 0 ?? null,
     
      test_type: requestBody.test_type ?? null,


      nearme: null ?? null,
      gender: requestBody.gender  ?? null,
      age_group: requestBody.age_group  ?? null,
      requirements: null ?? null,
      features: requestBody.features
    });
    console.log(tests);
    await tests.save();

    return new Response(JSON.stringify(tests), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Errorr", { status: 500 });
  }
};
