const AWS = require("aws-sdk");
const s3 = new AWS.S3();

const uploadImg = async (req, res, next) => {
  console.log(req.body.name);

  const buffer = Buffer.from(req.body.data, "base64");

  await s3
    .putObject({
      Body: buffer,
      Key: req.body.name,
      ContentType: req.body.type,
      Bucket: "idesign-imgs",
      ACL: "public-read",
    })
    .promise();

  res.json({
    msg: "success stef",
    url: `https://idesign-imgs.s3.amazonaws.com/${req.body.name}`,
  });
};

module.exports = {
  uploadImg,
};
