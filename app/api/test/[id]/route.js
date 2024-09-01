import PackageTest from "@/model2/PackageTest";
import {makeS3FilesPermanent} from '@/utils/S3Helpers'
import { Types } from "mongoose";

export const GET = async (request, { params }) => {
  try {
    const { id = null } = params;
    const PackageTestsdata = await PackageTest
      .findById(id);

    return new Response(JSON.stringify(PackageTestsdata), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {

    // console.log("paramsparams", params)
    const toUpdateBody = await request.json();
    // console.log("lllllllllll",toUpdateBody)
    makeS3FilesPermanent(process.env.S3_BUCKET, "single", toUpdateBody?.oldImage, toUpdateBody?.image)
    const bodyParts = (toUpdateBody?.bodyParts ?? []).map(part => new Types.ObjectId(part.value));
    const conditions = (toUpdateBody?.conditions ?? []).map(condition => new Types.ObjectId(condition.value));
    const itemId = (toUpdateBody?.itemId ?? []).map(condition => new Types.ObjectId(condition.value));
    const centerId = (toUpdateBody?.availableInCenters ?? []).map(condition => new Types.ObjectId(condition.value));
    const observation = (toUpdateBody?.observation ?? []).map(obs => obs.observations);

    const { id = null } = params;
    const existingBlog = await PackageTest.findById(id);
    if (!existingBlog) {
      return new Response("No PackageTest found with given id!", { status: 404 });
    }
    for (const key in toUpdateBody) {
      if (key in existingBlog) {
        switch (key) {
          case 'bodyParts': {
            console.log('bodyParts');

            existingBlog[key] = bodyParts;
            break

          }
          case 'conditions': {
            console.log('conditions');

            existingBlog[key] = conditions;
            break

          }
          case 'itemId': {
            console.log('itemId');

            existingBlog[key] = itemId;
            break

          }
          case 'availableInCenters': {
            console.log('availableInCenters');

            existingBlog[key] = centerId;
            break

          }
          case 'observation': {
            console.log('observation');

            existingBlog[key] = observation;
            break

          }
          default: {
            existingBlog[key] = toUpdateBody[key];

          }

        }
      }
    }
    await existingBlog.save();

    console.log("existingBlog", existingBlog)
    return new Response(JSON.stringify(existingBlog), { status: 200 });

  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    const { id = null } = params;
    await PackageTest.findByIdAndDelete(id);
    return new Response("PackageTest deleted successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error?.message, { status: 500 });
  }
};
