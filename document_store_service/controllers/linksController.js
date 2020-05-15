const linksService = require('../services/linksService')

class LinksController {
  async create(req, res) {
    try {
      const { doc1Id, doc2Id } = req.body
      await linksService.create({ doc1Id, doc2Id })
      res.json({ status: 'created' })
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }

  async getOutboundDocuments(req, res) {
    try {
      const docId = req.params.id
      const outboundDocuments = await linksService.getOutboundDocuments(docId)
      res.json(outboundDocuments)
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }

  async getInboundDocuments(req, res) {
    try {
      const docId = req.params.id
      const inboundDocuments = await linksService.getInboundDocuments(docId)
      res.json(inboundDocuments)
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }
}

module.exports = new LinksController()