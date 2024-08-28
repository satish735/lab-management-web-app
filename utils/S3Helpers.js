let configS3 = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
};
import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
  DeleteObjectCommand,
  CreateBucketCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectTaggingCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const s3ClientInstance = new S3Client(configS3);

async function getBucketList(otherParams = {}) {
  const command = new ListBucketsCommand({ ...otherParams });
  const { Buckets } = await s3ClientInstance.send(command);
  return Buckets;
}
async function createBucket(bucketName, otherParams = {}) {
  const command = new CreateBucketCommand({
    // The name of the bucket. Bucket names are unique and have several other constraints.
    // See https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html
    Bucket: bucketName,
    ...otherParams,
  });
  try {
    const { Location } = await s3ClientInstance.send(command);
    return Location;
  } catch (err) {
    return err;
  }
}
async function putObjectInBucket(bucketName, key, object, otherParams = {}) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: object,
    ...otherParams,
  });

  try {
    const response = await s3ClientInstance.send(command);
    return response;
  } catch (err) {
    return err;
  }
}
async function deleteObjectInBucket(bucketName, objectKey, otherParams = {}) {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    ...otherParams,
  });

  try {
    const response = await s3ClientInstance.send(command);
    return response;
  } catch (err) {
    return err;
  }
}
async function deleteObjectsInBucket(
  bucketName,
  objectKeys = [],
  otherParams = {}
) {
  const command = new DeleteObjectsCommand({
    Bucket: bucketName,
    Delete: {
      Objects: objectKeys,
    },
    ...otherParams,
  });
  //   [{ Key: "object1.txt" }, { Key: "object2.txt" }]

  try {
    const { Deleted } = await s3ClientInstance.send(command);
    return Deleted;
  } catch (err) {
    return err;
  }
}
async function getObjectFromBucket(bucketName, objectKey, otherParams = {}) {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
    ...otherParams,
  });

  try {
    const response = await s3ClientInstance.send(command);
    const str = await response?.Body.transformToString();
    // const data = response.Body.transformToWebStream();
    return str;
  } catch (err) {
    return err;
  }
}
async function getObjectListFromBucket(bucketName, otherParams = {}) {
  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    MaxKeys: 10,
    ...otherParams,
  });
  try {
    let isTruncated = true;
    let contentList = [];
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3ClientInstance.send(command);
      contentList = [...contentList, ...Contents];
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    return contentList;
  } catch (err) {
    return err;
  }
}

async function getPreSignedURL(bucketName, fileName, expires = 12) {
  var newExpires = 3600 * expires;
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: fileName,
  });
  try {
    const url = await getSignedUrl(s3ClientInstance, command, {
      expiresIn: newExpires,
    });
    return url;
  } catch (err) {
    return err;
  }
}

async function getPreSignedURLforUpload(
  bucketName,
  fileName,
  expires = 1,
  contentType
) {
  var newExpires = 3600 * expires;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: contentType,
  });

  try {
    const presignedUrl = await getSignedUrl(s3ClientInstance, command, {
      expiresIn: newExpires,
    });
    return presignedUrl;
  } catch (err) {
    return err;
  }
}
async function addUpdateTagBucket(
  bucketName,
  objectKey,
  tagSet = [],
  otherParams = {}
) {
  const command = new PutObjectTaggingCommand({
    Bucket: bucketName,
    Key: objectKey,
    Tagging: {
      TagSet: tagSet,
    },
    ...otherParams,
  });
  try {
    const response = await s3ClientInstance.send(command);
    console.log(response);
    return response;
  } catch (err) {
    return err;
  }
}
async function makeS3FilesPermanent(bucketName, type = "single", oldFile, newFile) {
  const tempTagSet = [{ Key: "Type", Value: "Temporary" }];
  const permTagSet = [{ Key: "Type", Value: "Permanent" }];

  try {
    if (type === "multiple") {
      const newFileSet = new Set(newFile || []);
      const oldFileSet = new Set(oldFile || []);

      const diffNew = [...newFileSet].filter(item => !oldFileSet.has(item));
      const diffOld = [...oldFileSet].filter(item => !newFileSet.has(item));

      await Promise.all(diffNew.map(async newItem => {
        await addUpdateTagBucket(bucketName, newItem, permTagSet);
      }));

      await Promise.all(diffOld.map(async oldItem => {
        await addUpdateTagBucket(bucketName, oldItem, tempTagSet);
      }));
    }

    if (type === "single") {
      if (oldFile !== newFile) {
        if (oldFile) {
          await addUpdateTagBucket(bucketName, oldFile, tempTagSet);
        }
        if (newFile) {
          await addUpdateTagBucket(bucketName, newFile, permTagSet);
        }
      }
    }

    return true;
  } catch (err) {
    console.error("Error updating S3 file tags:", err);
    return false;
  }
}

module.exports = {
  getBucketList,
  putObjectInBucket,
  createBucket,
  deleteObjectInBucket,
  deleteObjectsInBucket,
  getObjectFromBucket,
  getObjectListFromBucket,
  getPreSignedURL,
  getPreSignedURLforUpload,
  addUpdateTagBucket,
  makeS3FilesPermanent
};
