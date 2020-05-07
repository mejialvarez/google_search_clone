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

  async getOutboundLinks(req, res) {
    try {
      const docId = parseInt(req.params.id)
      const outboundLinks = await linksService.getOutboundLinks(docId)
      res.json({ links: outboundLinks })
    } catch(e) {
      console.error(e)
     res.json( { status: 'error', message: e.message })
    }
  }
}

module.exports = new LinksController()