const dynamodb = require('../config/dynamodb')
const crypto = require('crypto')

class DocumentsService {
  constructor() {
    this.tableName = 'documents'
  }

  async create({ pageUrl, digest }) {
    const id =  crypto.createHash("sha256").update(pageUrl).digest("hex")
    const params = { TableName: this.tableName, Item: { id, pageUrl, pageRank: 1, digest } }
    await dynamodb.put(params).promise()
    return { id }
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
      Key: { id },
      UpdateExpression: "set digest = :d",
      ExpressionAttributeValues:{ ":d": digest }
    }
    dynamodb.update(params).promise()
  }

  async updatePageRank(id, pageRank) {
    const params = {
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: "set pageRank = :pageRank",
      ExpressionAttributeValues:{ ":pageRank": pageRank }
    }
    dynamodb.update(params).promise()
  }
}

module.exports = new DocumentsService()