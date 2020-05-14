const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/index')
const Producer = require('./services/producer')
const producer = new Producer('page_rank_queue')
producer.connect()

const app = express()
app.use(bodyParser.json())
app.use(cors())

router.get('/pageRank', function(req, res) {
  const documentId = req.query.docId
  producer.publish(documentId)

  res.json({status: 'in-process'})
})
app.use('/v1', router)

app.listen(config.port, config.host)
console.log(`Running on http://${config.host}:${config.port}`)