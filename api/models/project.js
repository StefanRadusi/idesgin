const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const getProjectById = async (id) => {
  const params = {
    TableName: process.env.projects_db,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": id },
  };

  const result = await dynamodb.query(params).promise();

  return result && result.Items ? result.Items[0] : null;
};

const addProject = async (
  id,
  title,
  type,
  description,
  tags,
  coverImageUrl
) => {
  const params = {
    TableName: process.env.projects_db,
    Item: {
      pk: id,
      title,
      type,
      description,
      tags,
      imgs: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };

  if (coverImageUrl) {
    params.Item.coverImageUrl = coverImageUrl;
  }

  await dynamodb.put(params).promise();

  return params.Item;
};

const updateProject = async (
  id,
  title,
  type,
  description,
  tags,
  coverImageUrl
) => {
  let UpdateExpression =
    "set title = :title, #tp = :type_proj, description = :description, tags = :tags, updatedAt = :updatedAt";

  const ExpressionAttributeValues = {
    ":title": title,
    ":type_proj": type,
    ":description": description,
    ":tags": tags,
    ":updatedAt": Date.now(),
  };

  const ExpressionAttributeNames = {
    "#tp": "type",
  };

  if (coverImageUrl) {
    UpdateExpression = `${UpdateExpression}, coverImageUrl = :coverImageUrl`;
    ExpressionAttributeValues[":coverImageUrl"] = coverImageUrl;
  }

  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
    ExpressionAttributeNames,
  };

  return await dynamodb.update(params).promise();
};

const getByType = async (type) => {
  if (type === "latest") {
    const result = await dynamodb
      .scan({
        TableName: process.env.projects_db,
      })
      .promise();

    return (
      result &&
      result.Items &&
      result.Items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(
        0,
        3
      )
    );
  }

  if (type === "all") {
    const result = await dynamodb
      .scan({
        TableName: process.env.projects_db,
      })
      .promise();

    return (
      result &&
      result.Items &&
      result.Items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    );
  }

  const params = {
    TableName: process.env.projects_db,
    FilterExpression: "#tp = :t",
    ExpressionAttributeValues: { ":t": type },
    ExpressionAttributeNames: {
      "#tp": "type",
    },
  };

  const result = await dynamodb.scan(params).promise();

  return result && result.Items;
};

const deleteById = async (id) => {
  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: id,
    },
  };

  return await dynamodb.delete(params).promise();
};

const addImgToProject = async (project, imgUrl) => {
  const imgList = [...project.imgs, imgUrl];

  const UpdateExpression = "set imgs = :imgs, updatedAt = :updatedAt";
  const ExpressionAttributeValues = {
    ":imgs": imgList,
    ":updatedAt": Date.now(),
  };

  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: project.pk,
    },
    UpdateExpression,
    ExpressionAttributeValues,
  };

  await dynamodb.update(params).promise();

  return imgList;
};

const removeImgToProject = async (project, imgUrl) => {
  const imgList = project.imgs.filter((img) => img !== imgUrl);

  const UpdateExpression = "set imgs = :imgs, updatedAt = :updatedAt";
  const ExpressionAttributeValues = {
    ":imgs": imgList,
    ":updatedAt": Date.now(),
  };

  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: project.pk,
    },
    UpdateExpression,
    ExpressionAttributeValues,
  };

  await dynamodb.update(params).promise();

  return imgList;
};

const updateCreatedDate = (id, createdAt) => {
  let UpdateExpression = "set createdAt = :createdAt";

  const ExpressionAttributeValues = {
    ":createdAt": createdAt,
  };

  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
  };

  return dynamodb.update(params).promise();
};

module.exports = {
  getProjectById,
  addProject,
  updateProject,
  getByType,
  deleteById,
  addImgToProject,
  removeImgToProject,
  updateCreatedDate,
};
