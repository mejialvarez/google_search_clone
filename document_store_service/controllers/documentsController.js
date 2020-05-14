const documentsService = require('../services/documentsService')

class DocumentsController {
  async create(req, res) {
    try {
      const { pageUrl, digest } = req.body
      const id = Math.floor(Math.random() * Math.floor(1000000));
      const doc = await documentsService.create({ id, pageUrl, digest })
      res.json(doc)
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }

  async getById(req, res) {
    try {
      const id = parseInt(req.params.id)
      const doc = await documentsService.getById(id)
      res.json(doc)
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

  async updatePageRank(req, res) {
    try {
      const { id } = req.params
      const { pageRank } = req.body
      await documentsService.updatePageRank(id, pageRank)
      res.json({ status: 'updated' })
    } catch(e) {
      console.error(e)
      res.json( { status: 'error', message: e.message })
    }
  }
}

module.exports = new DocumentsController()