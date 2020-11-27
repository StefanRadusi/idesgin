const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const uploadImg = async (req, res, next) => {
  const { title, description, tags, imgData, imgType } = req.body || {};

  const buffer = Buffer.from(imgData, "base64");

  const [, extension] = imgType.split("/");
  const Key = `${title}.${extension}`;

  await s3
    .putObject({
      Body: buffer,
      Key,
      ContentType: imgType,
      Bucket: "idesign-imgs",
      ACL: "public-read",
    })
    .promise();

  res.json({
    msg: "success stef",
    url: `https://idesign-imgs.s3.amazonaws.com/${Key}`,
  });
};

module.exports = {
  uploadImg,
};
