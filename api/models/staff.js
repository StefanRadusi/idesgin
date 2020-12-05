const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient({
  region: process.env.AWS_REGION,
});

const getMemberById = async (id) => {
  const params = {
    TableName: process.env.staff_db,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": id },
  };

  const result = await dynamodb.query(params).promise();

  return result && result.Items ? result.Items[0] : null;
};

const addMember = async (id, name, description, author, coverImageUrl) => {
  const params = {
    TableName: process.env.staff_db,
    Item: {
      pk: id,
      name,
      description,
      author,
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

const updateMember = async (id, name, description, author, coverImageUrl) => {
  let UpdateExpression =
    "set #nm = :name_member, description = :description, author = :author, updatedAt = :updatedAt";

  const ExpressionAttributeValues = {
    ":name_member": name,
    ":description": description,
    ":author": author,
    ":updatedAt": Date.now(),
  };

  const ExpressionAttributeNames = {
    "#nm": "name",
  };

  if (coverImageUrl) {
    UpdateExpression = `${UpdateExpression}, coverImageUrl = :coverImageUrl`;
    ExpressionAttributeValues[":coverImageUrl"] = coverImageUrl;
  }

  const params = {
    TableName: process.env.staff_db,
    Key: {
      pk: id,
    },
    UpdateExpression,
    ExpressionAttributeValues,
    ExpressionAttributeNames,
  };

  return await dynamodb.update(params).promise();
};

const getAll = async () => {
  const result = await dynamodb
    .scan({
      TableName: process.env.staff_db,
    })
    .promise();

  return result && result.Items;
};

const deleteById = async (id) => {
  const params = {
    TableName: process.env.staff_db,
    Key: {
      pk: id,
    },
  };

  return await dynamodb.delete(params).promise();
};

module.exports = {
  getMemberById,
  addMember,
  updateMember,
  getAll,
  deleteById,
};
