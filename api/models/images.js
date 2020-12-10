const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const updateCoverImg = async (id, imgData, imgType) => {
  if (id && imgData && imgType) {
    const buffer = Buffer.from(imgData, "base64");

    const [, extension] = imgType.split("/");
    const Key = `${id}.${extension}`;

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

const deleteImgs = async (imgList) => {
  if (imgList && imgList.length) {
    const params = {
      Bucket: "idesign-imgs",
      Delete: {
        Objects: imgList.map((Key) => ({ Key })),
      },
    };

    await s3.deleteObjects(params).promise();
  }
};

module.exports = {
  updateCoverImg,
  deleteImgs,
};
