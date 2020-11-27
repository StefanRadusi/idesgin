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

const updateProject = async (id, title, type, description, tags) => {
  const params = {
    TableName: process.env.projects_db,
    Key: {
      pk: id,
    },
    UpdateExpression:
      "set title = :title, #tp = :type_proj, description = :description, tags = :tags, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":title": title,
      ":type_proj": type,
      ":description": description,
      ":tags": tags,
      ":updatedAt": Date.now(),
    },
    ExpressionAttributeNames: {
      "#tp": "type",
    },
  };

  return await dynamodb.update(params).promise();
};

module.exports = {
  getProjectById,
  addProject,
  updateProject,
};
