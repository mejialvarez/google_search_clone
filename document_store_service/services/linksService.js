const dynamodb = require('../config/dynamodb')

class LinksService {
  constructor() {
    this.tableName = 'links'
  }

  async create({ doc1Id, doc2Id }) {
    const params = { TableName: this.tableName, Item: { doc1Id, doc2Id } }
    dynamodb.put(params).promise()
  }

  async getOutboundLinks(docId) {
    const params = {
      TableName : this.tableName,
      KeyConditionExpression: "doc1Id = :id",
      ExpressionAttributeValues: {
        ":id": docId
      }
    }
    let res = await dynamodb.query(params).promise()
    let links = res['Items'].map(item => { return item.doc2Id })
    return links
  }
}

module.exports = new LinksService()