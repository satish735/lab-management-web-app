import PackageTest from "@/model2/PackageTest";
import { Types } from "mongoose";
export const POST = async (request, { params }) => {
  try {
    console.log("kkkkkk");
    const requestBody = await request.json();
    console.log('tests////////////////////////////////////////////////////////////'
    );

    const bodyParts = (requestBody?.bodyParts ?? []).map(part => new Types.ObjectId(part.value));
    const conditions = (requestBody?.conditions ?? []).map(condition => new Types.ObjectId(condition.value));
    const itemId = (requestBody?.itemId ?? []).map(condition => new Types.ObjectId(condition.value));
    const observation = (requestBody?.observation ?? []).map(obs => obs.observations);

    const tests = new PackageTest({

      name: requestBody?.name ?? null,
      desc: requestBody?.desc ?? null,
      bodyParts: bodyParts ?? [],
      observation: observation ?? [],
      image: requestBody?.image ?? null,
      conditions: conditions ?? [],
      rate: requestBody?.rate ?? null,
      gender: requestBody?.gender ?? null,
      fromAge: requestBody?.fromAge ?? null,
      itemId: itemId ?? [],
      toAge: requestBody?.toAge ?? null,
      discountPercentage: requestBody?.discountPercentage ?? null,

      sampleCollection: requestBody?.sampleCollection ?? null,
      preparation: requestBody?.preparation ?? null,

      homeCollection: requestBody?.homeCollection ?? null,
      reportGenerationHours: requestBody?.reportGenerationHours ?? null,
      totalMrp:requestBody?.totalMrp ?? null,
      testType: requestBody?.testType ?? null,



 
     
    });
    console.log(tests);
    await tests.save();

    return new Response(JSON.stringify(tests), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Errorr", { status: 500 });
  }
};