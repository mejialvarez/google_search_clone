const AWS = require("aws-sdk");
const config = require('./index')

AWS.config.update({
  region: config.aws.region,
  endpoint: config.aws.endpoint,
  accessKeyId: config.aws.accesKey,
  secretAccessKey: config.aws.secretKey
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

module.exports = dynamodb