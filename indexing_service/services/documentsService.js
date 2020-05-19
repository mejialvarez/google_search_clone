const elasticsearch = require('../config/elasticsearch')

class DocumentsService {
  async index(id, url, content) {
    await elasticsearch.index({
      index: 'documents',
      id,
      body: { url, content }
    })
  }

  async getById(id) {
    try {
      const docResponse = await elasticsearch.get({
        index: 'documents',
        id
      })
      const doc = docResponse.body._source
      return doc
    } catch(e) {
      return {}
    }
  }

  async updateContent(id, content) {
    await elasticsearch.update({
      index: "documents",
      id,
      body: {
        doc: { content }
      }
    })
  }
}

module.exports = new DocumentsService()