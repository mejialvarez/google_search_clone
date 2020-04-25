const Producer = require('../services/producer')
const producer = new Producer('indexing_queue')
producer.connect()

class PagesController {
  async index(req, res, next) {
  	const { page_url } = req.body
    producer.publish(page_url)
    res.status(201).send({ status: 'created' })
  }
}

module.exports = new PagesController()