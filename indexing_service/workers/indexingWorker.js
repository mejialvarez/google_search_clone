const Consumer = require('../services/consumer');
const webScraper = require('../services/webScraper')
const { Client } = require('@elastic/elasticsearch')
const config = require('../config/index')

class IndexingWorker {
  async run() {
    try {
      const consumer = new Consumer('indexing_queue')
      await consumer.connect()
      consumer.subscribe(this.indexPage)
    } catch(e) {
      console.log('[IndexingWorker] Error:', e.message)
      throw e
    }
  }

  async indexPage(msg) {
    try {
      const pageUrl = msg.content.toString()
      const pageContent = await webScraper.getContent(pageUrl)
      const client = new Client({ node: config.elasticsearch.url })

      await client.index({
        index: 'pages',
        body: {
          url: pageUrl,
          content: pageContent
        }
      })
      console.log('[IndexingWorker] Page indexed:', pageUrl)
    } catch(e) {
      console.log('[IndexingWorker] Error to index a page:', e.message)
      throw e
    }
  }
}

const worker = new IndexingWorker()
worker.run()