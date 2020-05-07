const documentsService = require('../services/documentsService')

class DocumentsController {
  async create(req, res) {
    try {
      const { pageUrl, digest } = req.body
      await documentsService.create({ pageUrl, digest })
      res.json({ status: 'created' })
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }

  async getByUrl(req, res) {
    try {
      const url = req.query.url
      const doc = await documentsService.getByUrl(url)
      res.json(doc)
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }

  async updateDigest(req, res) {
    try {
      const { id } = req.params
      const { digest } = req.body
      await documentsService.updateDigest(id, digest)
      res.json({ status: 'updated' })
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }
}

module.exports = new DocumentsController()