const Producer = require('../services/producer')
const producer = new Producer('indexing_queue')
producer.connect()

class PagesController {
  async index(req, res, next) {
    const { pageUrl } = req.body
    producer.publish(pageUrl)
    res.status(201).send({ status: 'created' })
  }
}

module.exports = new PagesController()