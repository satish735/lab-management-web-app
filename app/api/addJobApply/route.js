import JobApply from "@/model2/JobApply";
import { makeS3FilesPermanent } from '@/utils/S3Helpers'

export const POST = async (request, { params }) => {


  try {
    const requestBody = await request.json();
    makeS3FilesPermanent(process.env.S3_BUCKET, "multiple", null, requestBody?.additionalDetails ?? [])
    makeS3FilesPermanent(process.env.S3_BUCKET, "multiple", null, requestBody?.resume ?? [])


    const JobApplyNew = new JobApply({

      firstName: requestBody?.firstName ?? '',
      lastName: requestBody?.lastName ?? '',
      email: requestBody?.email ?? '',
      phone: requestBody?.phone ?? '',
      dateOfBirth: requestBody?.dateOfBirth ?? null,
      experienceYear: requestBody?.experienceYear ?? '',
      experienceMonth: requestBody?.experienceMonth ?? '',
      resume: requestBody?.resume ?? [],
      currentSalary: requestBody?.currentSalary ?? null,
      expectedSalary: requestBody?.expectedSalary ?? null,
      availableToJoin: requestBody?.availableToJoin ?? null,
      currentLocation: requestBody?.currentLocation ?? '',
      skill: requestBody?.skill ?? '',
      additionalDetails: requestBody?.additionalDetails ?? [],
      gender: requestBody?.gender ?? null,
      isExperienced: requestBody?.isExperienced ?? false,
      experienceData: requestBody?.experienceData ?? null,
      forOpening: requestBody?.forOpening ?? null,

    });

    await JobApplyNew.save();
    return new Response(JobApplyNew, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
};
