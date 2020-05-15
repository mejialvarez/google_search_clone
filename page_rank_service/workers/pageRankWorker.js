const Consumer = require('../services/consumer');
const documentClient = require('../services/documentClient')

class PageRankWorker {
  async run() {
    try {
      const consumer = new Consumer('page_rank_queue')
      await consumer.connect()
      consumer.subscribe(this.updatePageRank)
    } catch(e) {
      console.log('[PageRankWorker] Error:', e.message)
      throw e
    }
  }

  async updatePageRank(msg) {
    const documentId = msg.content
    const inboundDocuments = await documentClient.getInboundDocuments(documentId)
    let pageRank = 0

    for (const docId of inboundDocuments.documents) {
      let documentRecord = await documentClient.getDocument(docId)
      let outboundDocuments = await documentClient.getOutboundDocuments(docId)
      pageRank += documentRecord.pageRank/outboundDocuments.count
    }

    pageRank = 0.15 + 0.85*pageRank
    await documentClient.updatePageRank(documentId, pageRank)
    console.log(`[PageRankWorker] Updated page rank for document: ${documentId}`)
  }  
}

const worker = new PageRankWorker()
worker.run()