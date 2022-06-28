import AWS from "aws-sdk";

const BucketName = process.env.REACT_APP_BUCKET_NAME;

AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export async function uploadFileToS3({
  name,
  file,
  parentId,
  parent,
  publicFile,
}) {
  console.log("file", file);
  if (!file) throw new Error("Please choose a file to upload first.");
  const [ext] = file.name.split(".").reverse();
  const fileKey = `${parent}/${parentId}/${name}.${ext}`;
  const upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: BucketName,
      Key: fileKey,
      Body: file,
      ...(publicFile ? { ACL: "public-read" } : {}),
    },
  });

  const data = await upload.promise();
  console.log("Successfully uploaded!", data);
  return data;
}

const getFileNameFromUrl = (url) => {
  if (!url) return null;
  let fileName = decodeURIComponent(url)
    .split("/")
    .filter((x) => x)
    .slice(2)
    .join("/");
  return fileName;
};

export const getFileFromS3 = (url, expiry) => {
  return new Promise((resolve, reject) => {
    const fileName = getFileNameFromUrl(url);
    if (!fileName) return resolve("");
    const params = {
      Bucket: BucketName,
      Key: `${fileName}`,
      ...(expiry && { Expires: expiry }),
    };
    s3.getSignedUrl("getObject", params, (error, url) => {
      if (error) return reject(error);
      return resolve(url);
    });
  });
};

export function deleteFileFromS3(url) {
  return new Promise((resolve, reject) => {
    const fileName = getFileNameFromUrl(url);
    s3.deleteObject(
      { Bucket: BucketName, Key: fileName },
      function (error, data) {
        console.log(error);
        if (error) return reject(error);
        return resolve(data);
      }
    );
  });
}
