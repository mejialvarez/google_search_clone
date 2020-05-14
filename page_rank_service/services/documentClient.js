const config = require('../config/index');
const axios = require('axios');

class DocumentClient {
  constructor() {
    this.uri = config.documentStore.url
  }

  async getInboundDocuments(documentId) {
    const endpoint = `${this.uri}/documents/${documentId}/inboundDocuments`
    const documents = await axios.get(endpoint)
    return documents.data
  }

  async getOutboundDocuments(documentId) {
    const endpoint = `${this.uri}/documents/${documentId}/outboundDocuments`
    const documents = await axios.get(endpoint)
    return documents.data
  }

  async getDocument(documentId) {
  	const endpoint = `${this.uri}/documents/${documentId}`
    const document = await axios.get(endpoint)
    return document.data
  }

  async updatePageRank(documentId, pageRank) {
    const endpoint = `${this.uri}/documents/${documentId}/pageRank`
    const payload = { pageRank }
    await axios.put(endpoint, payload)
  }
}

module.exports = new DocumentClient()