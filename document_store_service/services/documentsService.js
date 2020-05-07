const dynamodb = require('../config/dynamodb')

class DocumentsService {
  constructor() {
    this.tableName = 'documents'
  }

  async create({ pageUrl, digest}) {
    const id = Math.floor(Math.random() * Math.floor(1000000));
    const params = { TableName: this.tableName, Item: { id, pageUrl, digest} }
    dynamodb.put(params).promise()
  }

  async getByUrl(url) {
    const params = {
      TableName: this.tableName,
      IndexName: "pageUrlIndex",
      KeyConditionExpression: "pageUrl = :pageUrl",
      ExpressionAttributeValues: { ":pageUrl": url }
    }

    const docs = await dynamodb.query(params).promise()
    return docs.Items[0] || {}
  }

  async updateDigest(id, digest) {
    const params = {
      TableName: this.tableName,
      Key: { id: parseInt(id) },
      UpdateExpression: "set digest = :d",
      ExpressionAttributeValues:{ ":d": digest }
    }
    dynamodb.update(params).promise()
  }
}

module.exports = new DocumentsService()