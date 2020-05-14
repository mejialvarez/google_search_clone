const dynamodb = require('../config/dynamodb')

class LinksService {
  constructor() {
    this.tableName = 'links'
  }

  async create({ doc1Id, doc2Id }) {
    const params = { TableName: this.tableName, Item: { doc1Id, doc2Id } }
    await dynamodb.put(params).promise()
  }

  async getOutboundDocuments(docId) {
    const params = {
      TableName : this.tableName,
      KeyConditionExpression: "doc1Id = :id",
      ExpressionAttributeValues: {
        ":id": docId
      }
    }
    let res = await dynamodb.query(params).promise()
    let documents = res['Items'].map(item => { return item.doc2Id })
    return {
      documents,
      count: res['Count']
    }
  }

  async getInboundDocuments(docId) {
    const params = {
      TableName : this.tableName,
      IndexName: "doc2IdIndex",
      KeyConditionExpression: "doc2Id = :id",
      ExpressionAttributeValues: {
        ":id": docId
      }
    }
    let res = await dynamodb.query(params).promise()
    let documents = res['Items'].map(item => { return item.doc1Id })
    return {
      documents,
      count: res['Count']
    }
  }
}

module.exports = new LinksService()