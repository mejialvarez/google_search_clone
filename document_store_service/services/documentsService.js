const dynamodb = require('../config/dynamodb')

class DocumentsService {
  constructor() {
    this.tableName = 'documents'
  }

  async create({ pageUrl, digest }) {
    const id = Math.floor(Math.random() * Math.floor(1000000));
    const params = { TableName: this.tableName, Item: { id, pageUrl, pageRank: 1, digest } }
    await dynamodb.put(params).promise()
    return { id }
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

  async getById(id) {
    const params = {
      TableName: this.tableName,
      Key: { 'id': id },
    }

    const doc = await dynamodb.get(params).promise()
    return doc['Item'] || {}
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

  async updatePageRank(id, pageRank) {
    const params = {
      TableName: this.tableName,
      Key: { id: parseInt(id) },
      UpdateExpression: "set pageRank = :pageRank",
      ExpressionAttributeValues:{ ":pageRank": pageRank }
    }
    dynamodb.update(params).promise()
  }
}

module.exports = new DocumentsService()