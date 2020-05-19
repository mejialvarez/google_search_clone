const documentsService = require('../services/documentsService')

class DocumentsController {
  async index(req, res, next) {
    const { id, url, content } = req.body
    await documentsService.index(id, url, content)

    console.log('[DocumentsController] Document indexed:', url)
    res.status(201).send({ status: 'indexed' })
  }

  async getById(req, res) {
    const id = req.params.id
    const doc = await documentsService.getById(id)
    res.json(doc)
  }

  async updateContent(req, res) {
    const id = req.params.id
    const content = req.body.content
    await documentsService.updateContent(id, content)

    res.json({ status: 'updated' })
  }
}

module.exports = new DocumentsController()