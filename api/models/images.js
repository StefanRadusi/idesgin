const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const updateProjectCoverImg = async (projectId, imgData, imgType) => {
  if (projectId && imgData && imgType) {
    const buffer = Buffer.from(imgData, "base64");

    const [, extension] = imgType.split("/");
    const Key = `${projectId}.${extension}`;

    await s3
      .putObject({
        Body: buffer,
        Key,
        ContentType: imgType,
        Bucket: "idesign-imgs",
        ACL: "public-read",
      })
      .promise();

    return `https://idesign-imgs.s3.amazonaws.com/${Key}`;
  }

  return null;
};

module.exports = {
  updateProjectCoverImg,
};
