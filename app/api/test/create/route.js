import PackageTest from "@/model2/PackageTest";
export const POST = async (request, { params }) => {
  try {
    const requestBody = await request.json();


    const PackageTestnew = new PackageTest({
      name: requestBody?.name,//For Test
      rate: requestBody?.rate ?? null,//For Test
      desc: requestBody?.desc ?? null,//For Test
      preTestInfo: requestBody?.preTestInfo ?? null,//For Test
      // bodyParts: [{ type: Schema.Types.ObjectId, ref: 'BodyPart' }],//For Test
      // conditions: [{ type: Schema.Types.ObjectId, ref: 'TestCondition' }],//For Test
      totalMrp: requestBody?.totalMrp,//For Package
      gender: requestBody?.gender ?? null,//For Test
      fromAge: requestBody?.fromAge ?? null,//For Test
      toAge: requestBody?.toAge ?? null,//For Test
      discountPercentage: requestBody?.discountPercentage ?? null,//For Package
      reportGenerationTime: requestBody?.reportGenerationTime ?? null,//For Test
      reportGenerationHours: requestBody?.reportGenerationHours,//For Test
      image: requestBody?.image ?? null,//For Test
      testType: requestBody?.testType ?? null,//For Test
      isBestSeller: requestBody?.isBestSeller ?? false,
      sampleType: requestBody?.sampleType ?? null,//For Test
      // parameterName: { type: String },
      // homeCollection: { type: Boolean, default: false },//For Test
      // isTrigger: { type: Boolean, default: false },
      // aliasName: { type: String },
      // slug: { type: String, unique: true },
      // seoKeyword: { type: String },
      // seoTitle: { type: String },
      // seoDescription: { type: String },
      // testCost: { type: Number },//For Test
      // nearMe: { type: Boolean, default: false },
      // whatIsTestPackage: { type: String },
      // whatIsThePurpose: { type: String },
      // whenProfileRecommended: { type: String },
      // sampleCollection: { type: String },//For Test
      // preparation: { type: String },
      // packageTestList: [{ type: String }],
      // editorContent: { type: String },
      // publishedAt: { type: Date },
      // is_delete: { type: Boolean, default: false },
      // slug: { type: String, unique: true }
    });


    await PackageTestnew.save();

    return new Response(PackageTestnew, { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Errorr", { status: 500 });
  }
};
